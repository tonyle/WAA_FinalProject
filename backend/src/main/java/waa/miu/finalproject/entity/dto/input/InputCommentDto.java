package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class InputCommentDto {
    String text;
    long post_id;
}
