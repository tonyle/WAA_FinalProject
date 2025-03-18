package waa.miu.finalproject.entity;

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
    long addressId;
    double price;
    int bed;
    int bath;
    double sqft;
    int status;
    double view;
    double save;
    int yearBuilt;
    String material;
    String style;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn
    private List<Photo> photos;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn
    private List<Offer> offers;

}