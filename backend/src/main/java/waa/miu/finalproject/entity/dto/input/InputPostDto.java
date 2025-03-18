package waa.miu.finalproject.entity.dto.input;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class InputPostDto {
    long id;
    String title;
    String content;
    long author_id;
}
