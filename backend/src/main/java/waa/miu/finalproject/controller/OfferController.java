package waa.miu.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.entity.dto.input.InputUpdateOfferStatusDto;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.service.OfferService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
            @RequestParam(value = "submissionDate", required = false) String submissionDate,
            @RequestParam(value = "statuses", required = false) List<String> statuses) {
        Long ownerId = null;
        List<Offer> offers = new ArrayList<>();

        String token = jwtUtil.extractTokenRequest(request);

        if (token != null) {

            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);

            System.out.println(tokenDto);
            if (tokenDto.getRoles().contains(RoleEnum.ADMIN.toString())) {
                offers = offerService.findAllByOwnerIdWithFilter(ownerId, propertyId, location, submissionDate, statuses);
            } else if (tokenDto.getRoles().contains(RoleEnum.OWNER.toString())) {
                ownerId = tokenDto.getUserId();
                offers = offerService.findAllByOwnerIdWithFilter(ownerId, propertyId, location, submissionDate, statuses);
            } else {
                ownerId = tokenDto.getUserId();
                offers = offerService.findAllByCustomerIdWithFilter(ownerId, propertyId, location, submissionDate, statuses);
            }

        }

        return ResponseEntity.ok(offers);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable("id") long offerId) {
        return ResponseEntity.ok(offerService.findById(offerId));
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createOffer(HttpServletRequest request, @RequestBody InputOfferDto inputOffer) {
        String token = jwtUtil.extractTokenRequest(request);

        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long customerId = tokenDto.getUserId();

            offerService.save(inputOffer, customerId);
        } else {
            Map<String, String> errorResponse = Map.of("error", "You don't have permission to access this resource");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<Offer>> getOfferByOwnerId(@PathVariable("id") long ownerId) {
        return ResponseEntity.ok(offerService.findByOwnerId(ownerId));
    }

    @PutMapping("/{id}")
    public void setOfferStatus(@RequestBody InputUpdateOfferStatusDto status, @PathVariable("id") long offerId) {
        offerService.setOfferStatus(offerId, status.getStatus());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        offerService.delete(id);
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<Offer>> findOffersById(@PathVariable("id") long id) {
        List<Offer> offers = offerService.findByPropertyId(id);
        return ResponseEntity.ok(offers);
    }

}
