package waa.miu.finalproject.entity.dto.output;

import lombok.Data;
import waa.miu.finalproject.entity.Role;

import java.util.List;


@Data
public class UserDetailDto {

    long id;
    String name;
    String email;
//    String password;

    private List<Role> roles;
}
