package waa.miu.finalproject.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.entity.dto.PostDto;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.input.InputUpdateUserDto;
import waa.miu.finalproject.entity.dto.output.PostNoAuthorDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.entity.dto.output.UserDetailDto;
import waa.miu.finalproject.enums.OwnerStatusEnum;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.repository.UserRepo;
import waa.miu.finalproject.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<UserDto>> findAll(@RequestParam(value = "status",required = false) OwnerStatusEnum status,
                                                 @RequestParam(value = "role",required = false) RoleEnum role) {
        List<UserDto> users = userService.findAllFilterByStatusAndRoles(status,role);

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable("id") long id) {
        UserDto userDto = userService.findById(id);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDetailDto> updateById(@PathVariable("id") long id, @RequestBody InputUpdateUserDto inputUpdateUserDto) {
        User user = userService.getById(id);
        user.setStatus(inputUpdateUserDto.getStatus());
        userRepo.save(user);
        return ResponseEntity.ok(modelMapper.map(user, UserDetailDto.class));
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        userService.delete(id);
    }
}
