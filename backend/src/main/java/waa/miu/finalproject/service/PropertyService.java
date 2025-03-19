package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;

import java.util.List;

public interface PropertyService {
    public List<PropertyDto> findAll();
    public PropertyDetailDto findById(long id);
}
