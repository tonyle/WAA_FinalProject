package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import waa.miu.finalproject.entity.FavouriteList;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.Property;

import java.util.List;

public interface FavouriteListRepo extends JpaRepository<FavouriteList, Long> {
    @Query("SELECT f FROM FavouriteList f WHERE f.user.id = :id")
    List<FavouriteList> findAllByUserId(long id);

}
