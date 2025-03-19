package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.User;

import java.util.List;

public interface PropertyRepo extends JpaRepository<Property, Long> {

    List<Property> findAll();
    Property findByName(String luxuryApartment);
    List<Offer> findOffersById(long id);
}
