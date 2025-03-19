package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import waa.miu.finalproject.entity.Address;
import waa.miu.finalproject.entity.Offer;

public interface OfferRepo extends JpaRepository<Offer, Long> {


}
