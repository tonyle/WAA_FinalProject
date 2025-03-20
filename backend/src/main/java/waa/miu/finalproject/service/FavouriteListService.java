package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.FavouriteList;

import java.util.List;

public interface FavouriteListService {
    public List<FavouriteList> findAll(long userId);
    public void addPropertyIntoFavouriteList(long favouriteId, long propertyId, long userId);
    public void removePropertyfromFavouriteList(long favouriteId, long propertyId, long userId);
    public void save(String name, long userId);
}
