package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyTypeEnum;

import java.util.List;

public interface PropertyService {
    public List<PropertyDto> findAll();
    public PropertyDetailDto findById(long id);
    public List<PropertyDto> findPropertiesByOwnerIdWithFilters(
            Long ownerId,
            Double price,
            PropertyTypeEnum propertyType,
            Integer bed,
            Integer bath,
            Long location);
}
