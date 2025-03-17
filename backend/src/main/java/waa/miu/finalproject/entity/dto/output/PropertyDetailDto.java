package waa.miu.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Data

public class PropertyDetailDto {

    private long id;
    String name;
    String description;
    long ownerId;
    long addressId;
    double price;
    int status;

}