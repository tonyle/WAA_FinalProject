package waa.miu.finalproject.service.impl;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.entity.dto.output.OfferDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.OfferStatusEnum;
import waa.miu.finalproject.enums.OfferTypeEnum;
import waa.miu.finalproject.enums.PropertyStatusEnum;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.repository.OfferRepo;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.service.OfferService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OfferServiceImpl implements OfferService {
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OfferRepo offerRepo;

    @Autowired
    private PropertyRepo propertyRepo;

    @Override
    public List<OfferDto> findAll(long userId) {
        List<Offer> offers =  offerRepo.findAllOfferByUserId(userId);
        return offers.stream().map(p -> modelMapper.map(p, OfferDto.class)).collect(Collectors.toList());
    }

    @Override
    public Offer findById(long id) {
        return offerRepo.findById(id).orElseThrow(() -> new RuntimeException("Offer not found"));
    }

    @Override
    public void save(InputOfferDto inputOffer) {
        Property property = propertyRepo.findById(inputOffer.getPropertyId()).orElseThrow(() -> new RuntimeException("Property not found"));
        Offer offer = new Offer();
        offer.setOfferPrice(inputOffer.getOfferPrice());
        OfferTypeEnum offerType = property.getType() == PropertyTypeEnum.SELL ? OfferTypeEnum.BUY : OfferTypeEnum.RENT;
        offer.setType(offerType);
        offer.setStatus(OfferStatusEnum.NEW);
        offer.setProperty(property);
        offerRepo.save(offer);
    }

    @Override
    public List<Offer> findByOwnerId(long ownerId) {
        return  offerRepo.getOffersByOwnerId(ownerId);
    }

    @Override
    public void setOfferStatus(long offerId, OfferStatusEnum status) {
        Offer offer = offerRepo.findById(offerId).orElseThrow(() -> new RuntimeException("Offer not found"));
        offer.setStatus(status);
        if (status == OfferStatusEnum.ACCEPTED) {
            offer.getProperty().setStatus(PropertyStatusEnum.PENDING);
        }
        offerRepo.save(offer);
    }

    @Override
    public List<Offer> findByPropertyId(long id) {
        return offerRepo.findByPropertyId(id);
    }

    @Override
    public List<Offer> findByLocation(String location) {
        return offerRepo.findByLocation(location);
    }

    @Override
    public List<Offer> findAllByOwnerIdWithFilter(Long ownerId,Long propertyId, String location, String submissionDate) {
        List<Offer> offers = new ArrayList<>();
        if (ownerId == null) {
            offers = offerRepo.findOffersByFilters(propertyId, location, submissionDate);
            System.out.println(propertyId);
        } else {
            offers = offerRepo.findOffersByOwnerIdWithFilters(ownerId, propertyId, location, submissionDate);
        }
        return offers;
    }
}