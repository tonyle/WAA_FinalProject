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
import waa.miu.finalproject.enums.OfferStatusEnum;
import waa.miu.finalproject.enums.OfferTypeEnum;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.repository.OfferRepo;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.service.OfferService;
import java.util.List;

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
    public List<Offer> findAll() {
        return offerRepo.findAll();
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
}