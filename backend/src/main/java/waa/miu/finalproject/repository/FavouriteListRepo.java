package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import waa.miu.finalproject.entity.FavouriteList;
import waa.miu.finalproject.entity.Offer;

public interface FavouriteListRepo extends JpaRepository<FavouriteList, Long> {


}
