package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.enums.OfferStatusEnum;

import java.util.List;

public interface OfferService {
    public List<Offer> findAll();
    public Offer findById(long id);
    public void save(InputOfferDto inputOffer);

    List<Offer> findByOwnerId(long ownerId);

    void setOfferStatus(long offerId, OfferStatusEnum status);

    List<Offer> findByPropertyId(long l);

    List<Offer> findByLocation(String searchValue);

    List<Offer> findAllByOwnerIdWithFilter(Long ownerId,Long propertyId, String location, String submissionDate);
}
