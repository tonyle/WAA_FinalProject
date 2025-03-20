package waa.miu.finalproject.entity.dto.output;

import lombok.Data;

@Data
public class AddressDto {
    private long id;

    String city;
    String state;
    String street;
    String postalCode;

}