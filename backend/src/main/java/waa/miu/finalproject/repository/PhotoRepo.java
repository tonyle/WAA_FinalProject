package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import waa.miu.finalproject.entity.Address;
import waa.miu.finalproject.entity.Photo;

public interface PhotoRepo extends JpaRepository<Photo, Long> {

}
