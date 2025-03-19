package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.entity.dto.PostDto;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.entity.dto.output.PostNoAuthorDto;

import java.util.List;

public interface UserService {
    public User getById(long id);
    public UserDto findById(long id);
    public List<UserDto> findAll();
    public void save(UserDto userDto);
    public List<PostNoAuthorDto> getPosts(long id);
    public List<UserDto> getUsersHaveMoreThanOnePost();
    public List<UserDto> getUsersHaveMoreThanNPost(int n);
    public void delete(long id);
}
