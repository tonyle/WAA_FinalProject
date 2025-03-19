package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.Offer;

import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.dto.input.InputPropertyDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyStatusEnum;
import waa.miu.finalproject.enums.PropertyTypeEnum;

import java.util.List;

public interface PropertyService {
    public List<PropertyDto> findAll();
    public PropertyDetailDto findById(long id);
    public Property findPropertyById(long id);
    public List<PropertyDto> findPropertiesByOwnerIdWithFilters(
            Long ownerId,
            Double priceFrom,
            Double priceTo,
            PropertyTypeEnum propertyType,
            Integer bed,
            Integer bath,
            String location);

    void createProperty(InputPropertyDto propertyDto);

    Property updateProperty(Long id, InputPropertyDto propertyDto);

    void delete(long id);


    void updateStatus(long id, PropertyStatusEnum status);
}
