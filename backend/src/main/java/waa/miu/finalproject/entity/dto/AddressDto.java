package waa.miu.finalproject.entity.dto;

import jakarta.persistence.*;
import lombok.Data;

@Data
public class AddressDto {

    String city;
    String state;
    String street;
    String postalCode;

}