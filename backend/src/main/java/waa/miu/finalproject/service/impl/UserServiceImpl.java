package waa.miu.finalproject.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.aspect.ExecutionTime;
import waa.miu.finalproject.entity.Post;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.entity.dto.PostDto;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.output.PostNoAuthorDto;
import waa.miu.finalproject.enums.OwnerStatusEnum;
import waa.miu.finalproject.repository.UserRepo;
import waa.miu.finalproject.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @ExecutionTime
    public UserDto findById(long id) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));

        return modelMapper.map(u, UserDto.class);
    }

    @Override
    public User getById(long id) {
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));
    }

    @Override
    public List<UserDto> findAll() {
        List<User> users = userRepo.findAll();

        return users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public void save(UserDto userDto) {
        entityManager.persist(modelMapper.map(userDto, User.class));
    }

    @Override
    public List<PostNoAuthorDto> getPosts(long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));

        return null;
    }

    @Override
    public List<UserDto> getUsersHaveMoreThanOnePost() {

        return null;
    }

    @Override
    public List<UserDto> getUsersHaveMoreThanNPost(int n) {

        return null;
    }

    @Override
    public void delete(long id) {
        entityManager.remove(userRepo.findById(id));
    }

    @Override
    public List<UserDto> getUsersHaveStatus(String status) {
        try {
            OwnerStatusEnum statusEnum = OwnerStatusEnum.valueOf(status.toUpperCase()); // Convert String to Enum
            return userRepo.findByStatus(statusEnum)
                    .stream()
                    .map(user -> modelMapper.map(user, UserDto.class))
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }

    @Override
    public void setStatus(long id, String status) {
        userRepo.findById(id).ifPresent(user -> user.setStatus(OwnerStatusEnum.valueOf(status.toUpperCase())));
    }

}
