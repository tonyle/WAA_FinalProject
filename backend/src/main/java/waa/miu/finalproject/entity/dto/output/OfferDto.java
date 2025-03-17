package waa.miu.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class OfferDto {

    private long id;

    long propertyId;
    long customerId;
    double offerPrice;
    int status;


}