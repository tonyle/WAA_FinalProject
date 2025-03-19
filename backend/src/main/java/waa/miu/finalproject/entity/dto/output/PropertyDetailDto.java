package waa.miu.finalproject.entity.dto.output;

import lombok.Data;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.Photo;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.enums.PropertyStatusEnum;
import waa.miu.finalproject.enums.PropertyTypeEnum;

import java.util.List;

@Data
public class PropertyDetailDto {
    private long id;
    private String name;
    private String description;
    private PropertyTypeEnum type;
    private long addressId;
    private double price;
    private int bed;
    private int bath;
    private double sqft;
    private PropertyStatusEnum status;
    private double view;
    private double save;
    private int yearBuilt;
    private String material;
    private String style;
    private List<Photo> photos;
    private User user;
    private List<Offer> offers;
}