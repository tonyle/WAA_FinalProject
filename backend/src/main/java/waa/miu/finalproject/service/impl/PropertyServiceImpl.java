package waa.miu.finalproject.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.*;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.service.PropertyService;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public List<PropertyDto> findAll() {
        List<Property> properties = propertyRepo.findAll();
        return properties.stream().map(p -> modelMapper.map(p, PropertyDto.class)).collect(Collectors.toList());
    }

    public List<PropertyDto> findPropertiesByOwnerIdWithFilters(
            Long ownerId,
            Double price,
            PropertyTypeEnum propertyType,
            Integer bed,
            Integer bath,
            Long location) {
        List<Property> properties = new ArrayList<>();
        if (ownerId == null) {
            properties = propertyRepo.findPropertiesByFilters(price, propertyType, bed, bath, location);
        } else {
            properties = propertyRepo.findPropertiesByOwnerIdWithFilters(ownerId, price, propertyType, bed, bath, location);
        }
        return properties.stream().map(p -> modelMapper.map(p, PropertyDto.class)).collect(Collectors.toList());
    }

    @Override
    public PropertyDetailDto findById(long id) {
        Property p = propertyRepo.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        return modelMapper.map(p, PropertyDetailDto.class);
    }
}
