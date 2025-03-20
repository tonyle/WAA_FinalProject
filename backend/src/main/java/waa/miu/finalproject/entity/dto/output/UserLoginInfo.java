package waa.miu.finalproject.entity.dto.output;

import lombok.Data;

import waa.miu.finalproject.enums.OwnerStatusEnum;
import waa.miu.finalproject.enums.RoleEnum;

@Data
public class UserLoginInfo {
    long id;
    String name;
    String email;
    String phone;
    OwnerStatusEnum status;
    private RoleEnum role;
}
