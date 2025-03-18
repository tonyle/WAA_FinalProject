package waa.miu.finalproject.entity;
import waa.miu.finalproject.enums.*;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private OfferTypeEnum type;
    private double offerPrice;

    @Enumerated(EnumType.STRING)
    private OfferStatusEnum status;

    @ManyToOne
    @JoinColumn
    private Property property;

    @ManyToOne
    @JoinColumn
    private User user;


}