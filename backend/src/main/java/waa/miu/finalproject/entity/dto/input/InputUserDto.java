package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import waa.miu.finalproject.enums.RoleEnum;

@Data
public class InputUserDto {

    String name;
    String email;
    String password;
    String phone;
    RoleEnum role;
}
