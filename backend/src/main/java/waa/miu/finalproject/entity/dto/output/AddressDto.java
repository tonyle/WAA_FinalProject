package waa.miu.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Data
public class AddressDto {
    private long id;

    String city;
    String state;
    String street;
    String postalCode;

}