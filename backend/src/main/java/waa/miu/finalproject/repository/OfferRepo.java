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

    @Query("select o from Offer o join o.property p where p.id=:id")
    List<Offer> findByPropertyId(@Param("id") long id);

    @Query("select o from Offer o where o.user.id =:userId")
    List<Offer> findAllOfferByUserId(long userId);

    @Query("select o from Offer o join o.property p join p.address a where" +
            " (:propertyId IS NULL OR p.id=:propertyId)" +
            " AND (:location IS NULL OR a.city = :location)" +
            " AND (:submissionDate IS NULL OR o.submissionDate = :submissionDate) ")
    List<Offer> findOffersByFilters(@Param("propertyId") Long propertyId,@Param("location") String location, @Param("submissionDate") String submissionDate);
    @Query("select o from Offer o join o.property p join p.address a where" +
            " (:propertyId IS NULL OR p.id=:propertyId)" +
            " AND (:location IS NULL OR a.city = :location)" +
            " AND (:submissionDate IS NULL OR o.submissionDate = :submissionDate)" +
            " AND (:ownerId IS NULL OR p.user.id=:ownerId)")
    List<Offer> findOffersByOwnerIdWithFilters(@Param("ownerId") Long ownerId,@Param("propertyId") Long propertyId,@Param("location") String location, @Param("submissionDate") String submissionDate);

    @Query("select o from Offer o join o.property p join p.address a where" +
            " (:propertyId IS NULL OR p.id=:propertyId)" +
            " AND (:location IS NULL OR a.city = :location)" +
            " AND (:submissionDate IS NULL OR o.submissionDate = :submissionDate)" +
            " AND (:ownerId IS NULL OR o.user.id=:ownerId)")
    List<Offer> findAllByCustomerIdWithFilter(@Param("ownerId") Long ownerId,@Param("propertyId") Long propertyId,@Param("location") String location, @Param("submissionDate") String submissionDate);
}
