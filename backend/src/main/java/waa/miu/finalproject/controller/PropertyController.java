package waa.miu.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.service.PropertyService;

import java.util.List;

@RestController
@RequestMapping("api/v1/properties")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;


    @GetMapping
    public ResponseEntity<List<PropertyDto>> findAll() {
        List<PropertyDto>property = propertyService.findAll();
        return ResponseEntity.ok(property);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDetailDto> findById(@PathVariable("id") long id) {
        PropertyDetailDto property = propertyService.findById(id);
        return ResponseEntity.ok(property);
    }
//
//    @PostMapping
//    public void save(@RequestBody UserDto userDto) {
//        userService.save(userDto);
//    }
//
//    @GetMapping("/{id}/posts")
//    public ResponseEntity<List<PostNoAuthorDto>> getPosts(@PathVariable("id") long id) {
//        List<PostNoAuthorDto> posts = userService.getPosts(id);
//        return ResponseEntity.ok(posts);
//    }
//
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable("id") long id) {
//        userService.delete(id);
//    }
}
