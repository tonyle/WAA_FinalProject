package waa.miu.finalproject.entity.dto.output;

import lombok.Data;
import waa.miu.finalproject.entity.Address;
import waa.miu.finalproject.enums.PropertyStatusEnum;
import waa.miu.finalproject.enums.PropertyTypeEnum;

@Data
public class PropertyDto {
    private long id;
    private String name;
    private String description;
    private PropertyTypeEnum type;
    private double price;
    private int bed;
    private int bath;
    private double sqft;
    private PropertyStatusEnum status;
    private double view;
    private double save;
    private int yearBuilt;
    private String houseType;
    private Address address;
    private UserDto user;
}