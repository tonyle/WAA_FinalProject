package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import waa.miu.finalproject.enums.OwnerStatusEnum;
import waa.miu.finalproject.enums.RoleEnum;

@Data
public class InputUpdateUserDto {
    OwnerStatusEnum status;
}
