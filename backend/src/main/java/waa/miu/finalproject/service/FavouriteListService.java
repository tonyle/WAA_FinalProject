package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.FavouriteList;

import java.util.List;

public interface FavouriteListService {
    public List<FavouriteList> findAll();
    public void addPropertyIntoFavouriteList(long favouriteId, long propertyId);
    public void removePropertyfromFavouriteList(long favouriteId, long propertyId);
    public void save(String name);
}
