package waa.miu.finalproject.entity.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import waa.miu.finalproject.entity.Role;
import waa.miu.finalproject.enums.OwnerStatusEnum;

import java.util.List;

@Data
@Getter
@Setter
public class UserDto {
    long id;
    String name;
    String email;
    String phone;
    OwnerStatusEnum status;
    private List<Role> roles;
}
