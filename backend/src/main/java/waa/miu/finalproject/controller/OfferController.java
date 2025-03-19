package waa.miu.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.entity.dto.output.OfferDto;
import waa.miu.finalproject.service.OfferService;

import java.util.List;

@RestController
@RequestMapping("api/v1/offers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OfferController {
    @Autowired
    private OfferService offerService;

    @GetMapping()
    public ResponseEntity<List<OfferDto>> getAllOffers() {
        return ResponseEntity.ok(offerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable("id") long offerId) {
        return ResponseEntity.ok(offerService.findById(offerId));
    }

    @PostMapping
    public void createOffer(@RequestBody InputOfferDto inputOffer) {
        offerService.save(inputOffer);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<Offer>> getOfferByOwnerId(@PathVariable("id") long ownerId) {
        return ResponseEntity.ok(offerService.findByOwnerId(ownerId));
    }

    @PutMapping("/{id}")
    public void setOfferStatus(@RequestBody String status, @PathVariable("id") long offerId) {
        offerService.setOfferStatus(offerId,status);

    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<Offer>> findOffersById(@PathVariable("id") long id) {
        List<Offer> offers = offerService.findByPropertyId(id);
        return ResponseEntity.ok(offers);
    }
}
