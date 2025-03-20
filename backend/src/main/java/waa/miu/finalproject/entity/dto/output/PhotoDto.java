package waa.miu.finalproject.entity.dto.output;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class PhotoDto {
    private long id;

    String path;
    long propertyId;
}