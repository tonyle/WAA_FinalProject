package waa.miu.finalproject.entity;
import waa.miu.finalproject.enums.*;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate submissionDate;

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

    @PrePersist // Automatically set the submission date when saving
    protected void onCreate() {
        submissionDate = LocalDate.now();
    }
}