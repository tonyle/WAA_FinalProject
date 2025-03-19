package waa.miu.finalproject.entity.dto.output;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import waa.miu.finalproject.entity.Role;
import waa.miu.finalproject.enums.OwnerStatusEnum;

import java.util.List;


@Data
public class UserDto {
    long id;
    String name;
    String email;
    String phone;
    OwnerStatusEnum status;
    private List<Role> roles;
}
