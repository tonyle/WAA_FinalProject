package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import waa.miu.finalproject.enums.OfferStatusEnum;
import waa.miu.finalproject.enums.OwnerStatusEnum;

@Data
public class InputUpdateOfferStatusDto {
    OfferStatusEnum status;
}
