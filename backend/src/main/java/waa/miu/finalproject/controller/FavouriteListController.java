package waa.miu.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.FavouriteList;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.dto.input.InputFavouriteDto;
import waa.miu.finalproject.entity.dto.input.InputOfferDto;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.service.FavouriteListService;
import waa.miu.finalproject.service.OfferService;

import java.util.List;

@RestController
@RequestMapping("api/v1/favourites")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FavouriteListController {
    @Autowired
    private FavouriteListService favouriteListService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping()
    public ResponseEntity<List<FavouriteList>> getAllFavouriteList(HttpServletRequest request) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            System.out.println("Token = " + token);
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            System.out.println("userId = " + userId);
            return ResponseEntity.ok(favouriteListService.findAll(userId));
        } else {
            throw new RuntimeException("Cannot get favourite list");
        }
    }

    @PostMapping
    public void createFavouriteList(HttpServletRequest request, @RequestBody InputFavouriteDto inputFavouriteDto) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            favouriteListService.save(inputFavouriteDto.getName(), userId);
        } else {
            throw new RuntimeException("Cannot create favourite list");
        }
    }

    @PutMapping("/{favouriteId}/properties/{propertyId}")
    public void addPropertyIntoFavouriteList(HttpServletRequest request, @PathVariable("favouriteId") long favouriteId, @PathVariable("propertyId") long propertyId) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            favouriteListService.addPropertyIntoFavouriteList(favouriteId, propertyId, userId);
        } else {
            throw new RuntimeException("Cannot add property to favourite list");
        }
    }

    @DeleteMapping("/{favouriteId}/properties/{propertyId}")
    public void removePropertyfromFavouriteList(HttpServletRequest request, @PathVariable("favouriteId") long favouriteId, @PathVariable("propertyId") long propertyId) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            favouriteListService.removePropertyfromFavouriteList(favouriteId, propertyId, userId);
        } else {
            throw new RuntimeException("Cannot remove property from favourite list");
        }
    }
}
