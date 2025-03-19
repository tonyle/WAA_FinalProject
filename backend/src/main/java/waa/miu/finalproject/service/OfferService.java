package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.entity.dto.output.OfferDto;

import java.util.List;

public interface OfferService {
    public List<OfferDto> findAll();
    public Offer findById(long id);
    public void save(InputOfferDto inputOffer);
}
