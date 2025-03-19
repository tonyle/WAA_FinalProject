package waa.miu.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.dto.PostDto;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.output.PostNoAuthorDto;
import waa.miu.finalproject.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> findAll(@RequestParam(required = false) String status) {
        List<UserDto> users;
        if (status != null) {
            users = userService.getUsersHaveStatus(status);
        } else {
            users = userService.findAll();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable("id") long id) {
        UserDto userDto = userService.findById(id);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping
    public void save(@RequestBody UserDto userDto) {
        userService.save(userDto);
    }

    @PutMapping("/{id}")
    public void setStatus(@RequestBody String status, @PathVariable("id") long id) {

        userService.setStatus(id,status);
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostNoAuthorDto>> getPosts(@PathVariable("id") long id) {
        List<PostNoAuthorDto> posts = userService.getPosts(id);
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        userService.delete(id);
    }
}
