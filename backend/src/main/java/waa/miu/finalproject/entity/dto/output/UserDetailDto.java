package waa.miu.finalproject.entity.dto.output;

import lombok.Data;
import waa.miu.finalproject.entity.Role;
import waa.miu.finalproject.enums.OwnerStatusEnum;

import java.util.List;


@Data
public class UserDetailDto {
    long id;
    String name;
    String email;
    String phone;
    OwnerStatusEnum status;
    private List<Role> roles;
}
