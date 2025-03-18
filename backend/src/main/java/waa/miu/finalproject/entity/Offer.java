package waa.miu.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    long propertyId;
    long customerId;
    double offerPrice;
    int status;

    @ManyToOne
    @JoinColumn
    private Property property;

    @ManyToOne
    @JoinColumn
    private User user;


}