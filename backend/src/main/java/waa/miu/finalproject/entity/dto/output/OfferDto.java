package waa.miu.finalproject.entity.dto.output;

import lombok.Data;
import waa.miu.finalproject.enums.OfferStatusEnum;
import waa.miu.finalproject.enums.OfferTypeEnum;

@Data
public class OfferDto {
    private long id;
    private OfferTypeEnum type;
    private double offerPrice;
    private OfferStatusEnum status;
    private PropertyDto property;
    private UserDto user;
}