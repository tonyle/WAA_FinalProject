package waa.miu.finalproject.entity.dto.output;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PostNoAuthorDto {
    private long id;
    private String title;
    private String content;
}
