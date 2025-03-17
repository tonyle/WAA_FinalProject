package waa.miu.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Data
public class PhotoDto {
    private long id;

    String path;
    long propertyId;
}