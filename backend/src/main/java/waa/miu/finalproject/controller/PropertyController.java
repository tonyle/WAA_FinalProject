package waa.miu.finalproject.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.service.PropertyService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/properties")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<PropertyDto>> findAll(HttpServletRequest request, @RequestParam(value = "priceFrom", required = false) Double priceFrom,
                                                     @RequestParam(value = "priceTo", required = false) Double priceTo,
                                                     @RequestParam(value = "propertyType", required = false) PropertyTypeEnum propertyType,
                                                     @RequestParam(value = "bed", required = false) Integer bed,
                                                     @RequestParam(value = "bath", required = false) Integer bath,
                                                     @RequestParam(value = "location", required = false) String location) {
        Long ownerId = null;
        List<PropertyDto> properties = new ArrayList<>();
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null) {
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            if (tokenDto == null || tokenDto.getRoles().contains(RoleEnum.ADMIN) || tokenDto.getRoles().contains(RoleEnum.CUSTOMER)) {
                properties = propertyService.findPropertiesByOwnerIdWithFilters(ownerId, priceFrom, priceTo, propertyType, bed, bath, location);
            } else if (tokenDto.getRoles().contains(RoleEnum.OWNER)) {
                ownerId = tokenDto.getUserId();
                properties = propertyService.findPropertiesByOwnerIdWithFilters(ownerId, priceFrom, priceTo, propertyType, bed, bath, location);
            }
        } else {
            properties = propertyService.findPropertiesByOwnerIdWithFilters(null, priceFrom, priceTo, propertyType, bed, bath, location);
        }

        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDetailDto> findById(@PathVariable("id") long id) {
        PropertyDetailDto property = propertyService.findById(id);
        return ResponseEntity.ok(property);
    }
}
