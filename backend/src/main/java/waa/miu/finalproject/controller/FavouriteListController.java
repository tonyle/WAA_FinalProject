package waa.miu.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.FavouriteList;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.input.InputFavouriteDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.service.FavouriteListService;
import waa.miu.finalproject.service.OfferService;

import java.util.List;

@RestController
@RequestMapping("api/v1/favourites")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FavouriteListController {
    @Autowired
    private FavouriteListService favouriteListService;

    @GetMapping()
    public ResponseEntity<List<FavouriteList>> getAllFavouriteList() {
        return ResponseEntity.ok(favouriteListService.findAll());
    }

    @PostMapping
    public void createFavouriteList(@RequestBody InputFavouriteDto inputFavouriteDto) {
        favouriteListService.save(inputFavouriteDto.getName());
    }

    @PutMapping("/{favouriteId}/properties/{propertyId}")
    public void addPropertyIntoFavouriteList(@PathVariable("favouriteId") long favouriteId, @PathVariable("propertyId") long propertyId) {
        favouriteListService.addPropertyIntoFavouriteList(favouriteId, propertyId);
    }

    @DeleteMapping("/{favouriteId}/properties/{propertyId}")
    public void removePropertyfromFavouriteList(@PathVariable("favouriteId") long favouriteId, @PathVariable("propertyId") long propertyId) {
        favouriteListService.removePropertyfromFavouriteList(favouriteId, propertyId);
    }
}
