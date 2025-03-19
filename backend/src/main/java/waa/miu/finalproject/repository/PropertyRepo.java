package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.enums.PropertyTypeEnum;

import java.util.List;

public interface PropertyRepo extends JpaRepository<Property, Long> {

    List<Property> findAll();
    Property findByName(String luxuryApartment);

    @Query("SELECT p FROM Property p WHERE " +
            "(:ownerId IS NULL OR p.user.id = :ownerId) " +
            "AND (:price IS NULL OR p.price = :price) " +
            "AND (:propertyType IS NULL OR p.type = :propertyType) " +
            "AND (:bed IS NULL OR p.bed = :bed) " +
            "AND (:bath IS NULL OR p.bath = :bath) " +
            "AND (:location IS NULL OR p.address.city = :location)")
    List<Property> findPropertiesByOwnerIdWithFilters(
            @Param("ownerId") Long ownerId,
            @Param("price") Double price,
            @Param("propertyType") PropertyTypeEnum propertyType,
            @Param("bed") Integer bed,
            @Param("bath") Integer bath,
            @Param("location") String location);

    @Query("SELECT p FROM Property p WHERE " +
            "(:price IS NULL OR p.price = :price) " +
            "AND (:propertyType IS NULL OR p.type = :propertyType) " +
            "AND (:bed IS NULL OR p.bed = :bed) " +
            "AND (:bath IS NULL OR p.bath = :bath) " +
            "AND (:location IS NULL OR p.address.city = :location)")
    List<Property> findPropertiesByFilters(
            @Param("price") Double price,
            @Param("propertyType") PropertyTypeEnum propertyType,
            @Param("bed") Integer bed,
            @Param("bath") Integer bath,
            @Param("location") String location);
    List<Offer> findOffersById(long id);
}
