package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import waa.miu.finalproject.entity.Address;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.Post;

import java.util.List;

public interface OfferRepo extends JpaRepository<Offer, Long> {
    @Query("select o from Offer o Join o.property p join p.user u where u.id = :ownerId")
    public List<Offer> getOffersByOwnerId(@Param("ownerId") long ownerId);


    @Query("select o from Offer o Join o.property p join p.user u where u.name = :location")
    List<Offer> findByLocation(String location);

    @Query("select 0 from Offer o join o.property p where p.id=:id")
    List<Offer> findByPropertyId(long id);
}
