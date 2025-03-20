package waa.miu.finalproject.service.impl;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import waa.miu.finalproject.entity.*;

import waa.miu.finalproject.entity.dto.input.InputPropertyDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.enums.PropertyStatusEnum;
import waa.miu.finalproject.repository.AddressRepo;
import waa.miu.finalproject.repository.PhotoRepo;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.repository.UserRepo;
import waa.miu.finalproject.service.PropertyService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PropertyRepo propertyRepo;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AddressRepo addressRepo;
    
    @Autowired
    private PhotoRepo photoRepo;
    @Autowired
    private BlobContainerClient blobContainerClient;

    @Override
    public List<PropertyDto> findAll() {
        List<Property> properties = propertyRepo.findAll();
        return properties.stream().map(p -> modelMapper.map(p, PropertyDto.class)).collect(Collectors.toList());
    }

    public List<PropertyDto> findPropertiesByOwnerIdWithFilters(
            Long ownerId,
            Double priceFrom,
            Double priceTo,
            PropertyTypeEnum propertyType,
            Integer bed,
            Integer bath,
            String location) {
        List<Property> properties = new ArrayList<>();
        if (ownerId == null) {
            properties = propertyRepo.findPropertiesByFilters(priceFrom, priceTo, propertyType, bed, bath, location);
        } else {
            properties = propertyRepo.findPropertiesByOwnerIdWithFilters(ownerId, priceFrom, priceTo, propertyType, bed, bath, location);
        }
        return properties.stream().map(p -> modelMapper.map(p, PropertyDto.class)).collect(Collectors.toList());
    }

    @Override
    public PropertyDetailDto findById(long id) {
        Property p = propertyRepo.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        p.setView(p.getView() + 1);
        propertyRepo.save(p);
        return modelMapper.map(p, PropertyDetailDto.class);
    }

    @Override
    public Property findPropertyById(long id) {
        return propertyRepo.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    @Override
    public PropertyDetailDto createProperty(Long id,InputPropertyDto propertyDto) {
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Owner not found");
        }
        Address address = new Address();
        address.setCity(propertyDto.getCity());
        address.setStreet(propertyDto.getStreet());
        address.setState(propertyDto.getState());
        address.setPostalCode(propertyDto.getPostalCode());
        addressRepo.save(address);


        Property property = new Property();
        property.setName(propertyDto.getName());
        property.setDescription(propertyDto.getDescription());
        property.setType(propertyDto.getType());
        property.setPrice(propertyDto.getPrice());
        property.setBed(propertyDto.getBed());
        property.setBath(propertyDto.getBath());
        property.setSqft(propertyDto.getSqft());
        property.setYearBuilt(propertyDto.getYearBuilt());
        property.setHouseType(propertyDto.getHouseType());
        property.setStyle(propertyDto.getStyle());

        property.setStatus(PropertyStatusEnum.NEW);

        property.setUser(userOptional.get());
        property.setAddress(address);

        // Save property
        property = propertyRepo.save(property);
        return modelMapper.map(property, PropertyDetailDto.class);
    }

    @Override
    public String updateProperty(Long id, InputPropertyDto propertyDto,Long userId) {

        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        if (property.getUser().getId()==userId) {
            property.setName(propertyDto.getName());
            property.setDescription(propertyDto.getDescription());
            property.setType(propertyDto.getType());
            property.setPrice(propertyDto.getPrice());
            property.setBed(propertyDto.getBed());
            property.setBath(propertyDto.getBath());
            property.setSqft(propertyDto.getSqft());
            property.setStatus(PropertyStatusEnum.NEW);
            property.setYearBuilt(propertyDto.getYearBuilt());
            property.setHouseType(propertyDto.getHouseType());
            property.setStyle(propertyDto.getStyle());
            propertyRepo.save(property);
            return "Done";
        }
        return "You are not owner of this property";
    }

    @Override
    public String delete(long id,long userId) {
        Property p = propertyRepo.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        if (p.getUser().getId()==userId) {
            if (p.getStatus().equals(PropertyStatusEnum.PENDING) || p.getStatus().equals(PropertyStatusEnum.CONTINGENCY)) {
                return "You can't delete this property";
            }else{
                propertyRepo.deleteById(id);
                return "Done";
            }
        }else{
            return "You are not owner of this property";
        }

    }
    @Override
    public void updateStatus(long id, PropertyStatusEnum status) {
        Property property = propertyRepo.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        property.setStatus(status);
        propertyRepo.save(property);
    }

    @Override
    public List<String> uploadPhotos(Long propertyId, List<MultipartFile> files) {
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String fileName = "properties-" + propertyId + "/" + file.getOriginalFilename();
                BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
                blobClient.upload(file.getInputStream(), file.getSize(), true);

                // Save to DB
                Photo photo = new Photo();
                photo.setPath(blobClient.getBlobUrl());
                photoRepo.save(photo);
                property.getPhotos().add(photo);

                fileUrls.add(blobClient.getBlobUrl());
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload file: " + file.getOriginalFilename(), e);
            }
        }

        propertyRepo.save(property);
        return fileUrls;
    }

}
