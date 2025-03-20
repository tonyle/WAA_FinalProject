package waa.miu.finalproject.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.FavouriteList;
import waa.miu.finalproject.entity.Property;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.repository.FavouriteListRepo;
import waa.miu.finalproject.repository.PropertyRepo;
import waa.miu.finalproject.repository.UserRepo;
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
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<FavouriteList> findAll(long userId) {
        return favouriteListRepo.findAllByUserId(userId);
    }

    @Override
    public void addPropertyIntoFavouriteList(long favouriteId, long propertyId, long userId) {
        FavouriteList favouriteList = favouriteListRepo.findById(favouriteId)
                .orElseThrow(() -> new RuntimeException("Favourite List not found"));
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        // if property already exists in the favourite list, do nothing
        if (favouriteList.getProperties().contains(property)) {
            return;
        }

        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (favouriteList.getUser().getId() != user.getId() ) {
            throw new RuntimeException("You are not authorized to modify this favourite list");
        }

        favouriteList.getProperties().add(property);
        favouriteListRepo.save(favouriteList);
    }

    @Override
    public void removePropertyfromFavouriteList(long favouriteId, long propertyId, long userId) {
        FavouriteList favouriteList = favouriteListRepo.findById(favouriteId)
                .orElseThrow(() -> new RuntimeException("Favourite List not found"));
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (favouriteList.getUser().getId() != user.getId() ) {
            throw new RuntimeException("You are not authorized to modify this favourite list");
        }
        favouriteList.getProperties().remove(property);
        favouriteListRepo.save(favouriteList);
    }

    @Override
    public void save(String name, long userId) {
        FavouriteList favouriteList = new FavouriteList();
        favouriteList.setName(name);
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        favouriteList.setUser(user);
        favouriteListRepo.save(favouriteList);
    }
}