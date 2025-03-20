package waa.miu.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.entity.dto.output.OfferDto;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.service.OfferService;

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
    public ResponseEntity<?> getAllOffers(HttpServletRequest request) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            return ResponseEntity.ok(offerService.findAll(userId));
        } else {
            Map<String, String> errorResponse = Map.of("error", "You don't have permission to access this resource");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
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
        offerService.setOfferStatus(offerId, status);

    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<Offer>> findOffersById(@PathVariable("id") long id) {
        List<Offer> offers = offerService.findByPropertyId(id);
        return ResponseEntity.ok(offers);
    }
}
