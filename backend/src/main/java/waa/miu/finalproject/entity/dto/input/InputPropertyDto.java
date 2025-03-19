package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import waa.miu.finalproject.enums.PropertyTypeEnum;

@Data
public class InputPropertyDto {
    private String name;
    private String description;
    private PropertyTypeEnum type;
    private double price;
    private int bed;
    private int bath;
    private double sqft;
    private int yearBuilt;
    private long ownerId;
    private String houseType;
    private String style;

    private String state;
    private String city;
    private String street;
    private String postalCode;
}