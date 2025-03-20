package waa.miu.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import waa.miu.finalproject.entity.dto.TokenDto;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.dto.input.InputPropertyDto;
import waa.miu.finalproject.entity.dto.input.InputUpdatePropertyStatusDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.enums.PropertyTypeEnum;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.helper.JwtUtil;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.service.PropertyService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/properties")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PropertyRepo propertyRepo;

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
            if (tokenDto == null || tokenDto.getRoles().contains(RoleEnum.ADMIN.toString()) || tokenDto.getRoles().contains(RoleEnum.CUSTOMER.toString())) {
                properties = propertyService.findPropertiesByOwnerIdWithFilters(ownerId, priceFrom, priceTo, propertyType, bed, bath, location);
            } else if (tokenDto.getRoles().contains(RoleEnum.OWNER.toString())) {
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

    @PostMapping
    public ResponseEntity<PropertyDetailDto> save(HttpServletRequest request,@RequestBody InputPropertyDto inputPropertyDto) {

        String token = jwtUtil.extractTokenRequest(request);
        if (token != null){
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            PropertyDetailDto propertyDetailDto = propertyService.createProperty(tokenDto.getUserId(),inputPropertyDto);
            return ResponseEntity.ok(propertyDetailDto);
        }

        return ResponseEntity.ok(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProperty(HttpServletRequest request,@PathVariable("id") Long id, @RequestBody InputPropertyDto propertyDto) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null){
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            String s = propertyService.updateProperty(id, propertyDto,tokenDto.getUserId());
            return ResponseEntity.ok(s);
        }
        return ResponseEntity.ok("You don't have permission to access this resource");

    }
    @PutMapping("/{id}/status")
    public void updateStatus(@PathVariable("id") long id, @RequestBody InputUpdatePropertyStatusDto inputUpdatePropertyStatusDto) {
        propertyService.updateStatus(id,inputUpdatePropertyStatusDto.getStatus());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(HttpServletRequest request,@PathVariable("id") long id) {
        String token = jwtUtil.extractTokenRequest(request);
        if (token != null){
            TokenDto tokenDto = jwtUtil.getUserDtoFromClaims(token);
            String s = propertyService.delete(id,tokenDto.getUserId());
            return ResponseEntity.ok(s);
        }
        return ResponseEntity.ok("You don't have permission to access this resource");
    }

    @PostMapping("/{propertyId}/upload-photos")
    public ResponseEntity<Map<String, Object>> uploadPhotos(
            @PathVariable Long propertyId,
            @RequestParam("files") List<MultipartFile> files) {

        List<String> filePaths = propertyService.uploadPhotos(propertyId, files);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Photos uploaded successfully");
        response.put("filePaths", filePaths);

        return ResponseEntity.ok(response);
    }

}
