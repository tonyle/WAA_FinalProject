package waa.miu.finalproject.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "favouritelist")
@Data
public class FavouriteList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String name;

    @ManyToMany
    @JoinTable
    private List<Property> properties;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
