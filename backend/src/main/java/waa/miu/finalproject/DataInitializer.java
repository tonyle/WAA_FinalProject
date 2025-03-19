package waa.miu.finalproject;

import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import waa.miu.finalproject.entity.*;
import waa.miu.finalproject.repository.*;
import waa.miu.finalproject.enums.*;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepo userRepository;
    private final RoleRepo roleRepository;
    private final PropertyRepo propertyRepository;
    private final AddressRepo addressRepository;
    private final OfferRepo offerRepository;
    private final FavouriteListRepo favouriteListRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepo userRepository, RoleRepo roleRepository,
                           PropertyRepo propertyRepository, AddressRepo addressRepository,
                           OfferRepo offerRepository, FavouriteListRepo favouriteListRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.propertyRepository = propertyRepository;
        this.addressRepository = addressRepository;
        this.offerRepository = offerRepository;
        this.favouriteListRepository = favouriteListRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedRoles();
        seedUsers();
        seedProperties();
        seedOffers();
        seedFavouriteLists();
    }

    private void seedRoles() {
        if (roleRepository.count() == 0) {
            Role admin = new Role();
            admin.setRole(RoleEnum.ADMIN);

            Role customer = new Role();
            customer.setRole(RoleEnum.CUSTOMER);

            Role owner = new Role();
            owner.setRole(RoleEnum.OWNER);

            roleRepository.saveAll(List.of(admin, customer, owner));
        }
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            Role adminRole = roleRepository.findByRole(RoleEnum.ADMIN);
            Role customerRole = roleRepository.findByRole(RoleEnum.CUSTOMER);
            Role ownerRole = roleRepository.findByRole(RoleEnum.OWNER);

            User adminUser = new User();
            adminUser.setName("Admin User");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("password123"));
            adminUser.setPhone("123-456-7890");
            adminUser.setStatus(OwnerStatusEnum.ACTIVE);
            adminUser.setRoles(List.of(adminRole));

            User customerUser = new User();
            customerUser.setName("John Doe");
            customerUser.setEmail("john@example.com");
            customerUser.setPassword(passwordEncoder.encode("password123"));
            customerUser.setPhone("987-654-3210");
            customerUser.setStatus(OwnerStatusEnum.ACTIVE);
            customerUser.setRoles(List.of(customerRole));

            User ownerUser = new User();
            ownerUser.setName("Jane Smith");
            ownerUser.setEmail("jane@example.com");
            ownerUser.setPassword(passwordEncoder.encode("password123"));
            ownerUser.setPhone("555-555-5555");
            ownerUser.setStatus(OwnerStatusEnum.ACTIVE);
            ownerUser.setRoles(List.of(ownerRole));

            userRepository.saveAll(List.of(adminUser, customerUser, ownerUser));
        }
    }

    private void seedProperties() {
        if (propertyRepository.count() == 0) {
            User owner = userRepository.findByEmail("jane@example.com");

            Property property1 = new Property();
            property1.setName("Luxury Apartment");
            property1.setDescription("A beautiful apartment in downtown.");
            property1.setType(PropertyTypeEnum.RENT);
            property1.setPrice(2500);
            property1.setBed(3);
            property1.setBath(2);
            property1.setSqft(1200);
            property1.setStatus(PropertyStatusEnum.AVAILABLE);
            property1.setMaterial("Brick");
            property1.setStyle("Modern");
            property1.setUser(owner);

            Property property2 = new Property();
            property2.setName("Suburban House");
            property2.setDescription("A spacious home with a large backyard.");
            property2.setType(PropertyTypeEnum.SELL);
            property2.setPrice(450000);
            property2.setBed(4);
            property2.setBath(3);
            property2.setSqft(2500);
            property2.setStatus(PropertyStatusEnum.ACTIVE);
            property2.setMaterial("Wood");
            property2.setStyle("Rustic");
            property2.setUser(owner);

            propertyRepository.saveAll(List.of(property1, property2));
        }
    }

    private void seedOffers() {
        if (offerRepository.count() == 0) {
            User customer = userRepository.findByEmail("john@example.com");
            Property property = propertyRepository.findByName("Luxury Apartment");

            Offer offer = new Offer();
            offer.setType(OfferTypeEnum.RENT);
            offer.setOfferPrice(2400);
            offer.setStatus(OfferStatusEnum.NEW);
            offer.setProperty(property);
            offer.setUser(customer);

            offerRepository.save(offer);
        }
    }

    private void seedFavouriteLists() {
        if (favouriteListRepository.count() == 0) {
            User customer = userRepository.findByEmail("john@example.com");
            Property property1 = propertyRepository.findByName("Luxury Apartment");
            Property property2 = propertyRepository.findByName("Suburban House");

            FavouriteList favouriteList = new FavouriteList();
            favouriteList.setName("My Saved Properties");
            favouriteList.setProperties(List.of(property1, property2));

            favouriteListRepository.save(favouriteList);
        }
    }
}
