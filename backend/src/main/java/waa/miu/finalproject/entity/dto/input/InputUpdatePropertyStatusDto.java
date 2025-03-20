package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import waa.miu.finalproject.enums.OfferStatusEnum;
import waa.miu.finalproject.enums.PropertyStatusEnum;

@Data
public class InputUpdatePropertyStatusDto {
    PropertyStatusEnum status;
}
