package waa.miu.finalproject.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import waa.miu.finalproject.enums.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    String name;
    String description;
    String houseType;
    // (rent or sell or both)
    @Enumerated(EnumType.STRING)
    PropertyTypeEnum type;
    double price;
    int bed;
    int bath;
    double sqft;
    @Enumerated(EnumType.STRING)
    PropertyStatusEnum status;
    double view;
    double save;
    int yearBuilt;
    String material;
    String style;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn
    private List<Photo> photos;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Address address;

    @ManyToOne(fetch=FetchType.EAGER)
//    @JsonBackReference
    @JoinColumn
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn
    private List<Offer> offers;

}