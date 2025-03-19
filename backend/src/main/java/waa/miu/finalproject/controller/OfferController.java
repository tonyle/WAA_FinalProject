package waa.miu.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.entity.dto.output.OfferDto;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.entity.dto.input.InputUpdateOfferStatusDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.filter.JwtFilter;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.service.OfferService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/offers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OfferController {
    @Autowired
    private OfferService offerService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping()
    public ResponseEntity<List<Offer>> getAllOffers(
            HttpServletRequest request,
            @RequestParam(value = "propertyId", required = false) Long propertyId,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "submissionDate", required = false) String submissionDate
    ) {
        Long ownerId = null;
        List<Offer> offers = new ArrayList<>();
        String token = jwtUtil.extractTokenRequest(request);

        if (token != null) {

            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            System.out.println(tokenDto);
            if (tokenDto.getRoles().contains(RoleEnum.ADMIN.toString())) {
                offers = offerService.findAllByOwnerIdWithFilter(ownerId,propertyId, location, submissionDate);
            } else if (tokenDto.getRoles().contains(RoleEnum.OWNER.toString())) {
                ownerId = tokenDto.getUserId();
                System.out.println(ownerId);
                offers = offerService.findAllByOwnerIdWithFilter(ownerId,propertyId, location, submissionDate);
            }
        }

        return ResponseEntity.ok(offers);

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
    public void setOfferStatus(@RequestBody InputUpdateOfferStatusDto status, @PathVariable("id") long offerId) {
        offerService.setOfferStatus(offerId,status.getStatus());


    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<Offer>> findOffersById(@PathVariable("id") long id) {
        List<Offer> offers = offerService.findByPropertyId(id);
        return ResponseEntity.ok(offers);
    }
}
