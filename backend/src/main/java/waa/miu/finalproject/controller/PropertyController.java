package waa.miu.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.output.PostNoAuthorDto;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.repository.UserRepo;
import waa.miu.finalproject.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth/properties")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PropertyController {
    @Autowired
    private PropertyRepo propertyRepo;

    @GetMapping
    public ResponseEntity<List<Property>> findAll() {

        List<Property >property = propertyRepo.findAll();

        return ResponseEntity.ok(property);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<UserDto> findById(@PathVariable("id") long id) {
//        UserDto userDto = userService.findById(id);
//        return ResponseEntity.ok(userDto);
//    }
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
