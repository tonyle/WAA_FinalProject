package waa.miu.finalproject.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import waa.miu.finalproject.enums.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String name;
    String email;
    String password;
    String phone;

    @Enumerated(EnumType.STRING)
    OwnerStatusEnum status;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable
    private List<Role> roles;

    @OneToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Property> ownedProperties;

    @OneToMany(fetch = FetchType.LAZY)
    private List<FavouriteList> favouriteLists;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Property> viewedProperties;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn
    private List<Offer> offers;
}
