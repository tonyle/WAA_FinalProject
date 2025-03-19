package waa.miu.finalproject.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class TokenDto {
    private long userId;
    private String username;
    private List<String> roles;
}
