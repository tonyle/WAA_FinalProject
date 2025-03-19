package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;

import java.util.List;

public interface OfferService {
    public List<Offer> findAll();
    public Offer findById(long id);
    public void save(InputOfferDto inputOffer);
}
