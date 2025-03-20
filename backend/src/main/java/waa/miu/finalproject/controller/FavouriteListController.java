package waa.miu.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.dto.input.InputFavouriteDto;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.service.FavouriteListService;

import java.util.Map;

@RestController
@RequestMapping("api/v1/favourites")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FavouriteListController {
    @Autowired
    private FavouriteListService favouriteListService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping()
    public ResponseEntity<?> getAllFavouriteList(HttpServletRequest request) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            System.out.println("Token = " + token);
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            System.out.println("userId = " + userId);
            return ResponseEntity.ok(favouriteListService.findAll(userId));
        } else {
            Map<String, String> errorResponse = Map.of("error", "You don't have permission to access this resource");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createFavouriteList(HttpServletRequest request,
            @RequestBody InputFavouriteDto inputFavouriteDto) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            favouriteListService.save(inputFavouriteDto.getName(), userId);
        } else {
            Map<String, String> errorResponse = Map.of("error", "You don't have permission to access this resource");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @PutMapping("/{favouriteId}/properties/{propertyId}")
    public ResponseEntity<Map<String, String>> addPropertyIntoFavouriteList(HttpServletRequest request,
            @PathVariable("favouriteId") long favouriteId, @PathVariable("propertyId") long propertyId) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            favouriteListService.addPropertyIntoFavouriteList(favouriteId, propertyId, userId);
        } else {
            Map<String, String> errorResponse = Map.of("error", "You don't have permission to access this resource");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @DeleteMapping("/{favouriteId}/properties/{propertyId}")
    public ResponseEntity<Map<String, String>> removePropertyfromFavouriteList(HttpServletRequest request,
            @PathVariable("favouriteId") long favouriteId, @PathVariable("propertyId") long propertyId) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            long userId = tokenDto.getUserId();
            favouriteListService.removePropertyfromFavouriteList(favouriteId, propertyId, userId);
        } else {
            Map<String, String> errorResponse = Map.of("error", "You don't have permission to access this resource");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
}
