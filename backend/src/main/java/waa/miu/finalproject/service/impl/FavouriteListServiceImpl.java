package waa.miu.finalproject.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.FavouriteList;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.repository.FavouriteListRepo;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.service.FavouriteListService;

import java.util.List;

@Service
@Transactional
public class FavouriteListServiceImpl implements FavouriteListService {
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FavouriteListRepo favouriteListRepo;

    @Autowired
    private PropertyRepo propertyRepo;

    @Override
    public List<FavouriteList> findAll() {
        return favouriteListRepo.findAll();
    }

    @Override
    public void addPropertyIntoFavouriteList(long favouriteId, long propertyId) {
        FavouriteList favouriteList = favouriteListRepo.findById(favouriteId)
                .orElseThrow(() -> new RuntimeException("Favourite List not found"));
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        // if property already exists in the favourite list, do nothing
        if (favouriteList.getProperties().contains(property)) {
            return;
        }
        favouriteList.getProperties().add(property);
        favouriteListRepo.save(favouriteList);
    }

    @Override
    public void removePropertyfromFavouriteList(long favouriteId, long propertyId) {
        FavouriteList favouriteList = favouriteListRepo.findById(favouriteId)
                .orElseThrow(() -> new RuntimeException("Favourite List not found"));
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        favouriteList.getProperties().remove(property);
        favouriteListRepo.save(favouriteList);
    }

    @Override
    public void save(String name) {
        FavouriteList favouriteList = new FavouriteList();
        favouriteList.setName(name);
        favouriteListRepo.save(favouriteList);
    }
}