package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.Offer;

import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.dto.input.InputPropertyDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;

import java.util.List;

public interface PropertyService {
    public List<PropertyDto> findAll();
    public PropertyDetailDto findById(long id);

    void createProperty(InputPropertyDto propertyDto);

    Property updateProperty(Long id, InputPropertyDto propertyDto);

    void delete(long id);


}
