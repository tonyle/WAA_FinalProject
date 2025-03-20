package waa.miu.finalproject.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.*;

import waa.miu.finalproject.entity.dto.input.InputPropertyDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.enums.PropertyStatusEnum;
import waa.miu.finalproject.repository.AddressRepo;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.repository.UserRepo;
import waa.miu.finalproject.service.PropertyService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    public void createProperty(InputPropertyDto propertyDto) {
        Optional<User> userOptional = userRepo.findById(propertyDto.getOwnerId());
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
        propertyRepo.save(property);
    }

    @Override
    public Property updateProperty(Long id, InputPropertyDto propertyDto) {

        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        System.out.println(property.getId());
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

        return propertyRepo.save(property);
    }

    @Override
    public void delete(long id) {
        propertyRepo.deleteById(id);
    }

    @Override
    public void updateStatus(long id, PropertyStatusEnum status) {
        Property property = propertyRepo.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        property.setStatus(status);
        propertyRepo.save(property);
    }
}
