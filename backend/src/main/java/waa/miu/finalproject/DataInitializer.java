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
import waa.miu.finalproject.service.UserService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Component
//public class DataInitializer implements CommandLineRunner {
//
//    private final UserRepo userRepository;
//    private final RoleRepo roleRepository;
//    private final PropertyRepo propertyRepository;
//    private final AddressRepo addressRepository;
//    private final OfferRepo offerRepository;
//    private final FavouriteListRepo favouriteListRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final PhotoRepo photoRepository;
//
//    public DataInitializer(UserRepo userRepository, RoleRepo roleRepository,
//                           PropertyRepo propertyRepository, AddressRepo addressRepository,
//                           OfferRepo offerRepository, FavouriteListRepo favouriteListRepository, PhotoRepo photoRepository) {
//        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
//        this.propertyRepository = propertyRepository;
//        this.addressRepository = addressRepository;
//        this.offerRepository = offerRepository;
//        this.favouriteListRepository = favouriteListRepository;
//        this.photoRepository = photoRepository;
//        this.passwordEncoder = new BCryptPasswordEncoder();
//    }
//
//
//    @Override
//    @Transactional
//    public void run(String... args) throws Exception {
//        seedRoles();
//        seedUsers();
//        seedPhoto();
//        seedAddress();
//        seedProperties();
//        seedOffers();
//        seedFavouriteLists();
//
//    }
//
//    private void seedRoles() {
//        if (roleRepository.count() == 0) {
//            Role admin = new Role();
//            admin.setRole(RoleEnum.ADMIN);
//
//            Role customer = new Role();
//            customer.setRole(RoleEnum.CUSTOMER);
//
//            Role owner = new Role();
//            owner.setRole(RoleEnum.OWNER);
//
//            roleRepository.saveAll(List.of(admin, customer, owner));
//        }
//    }
//
//    private void seedUsers() {
//        if (userRepository.count() == 0) {
//            Role adminRole = roleRepository.findByRole(RoleEnum.ADMIN);
//            Role customerRole = roleRepository.findByRole(RoleEnum.CUSTOMER);
//            Role ownerRole = roleRepository.findByRole(RoleEnum.OWNER);
//
//            User adminUser = new User();
//            adminUser.setName("Admin User");
//            adminUser.setEmail("admin@example.com");
//            adminUser.setPassword(passwordEncoder.encode("password123"));
//            adminUser.setPhone("123-456-7890");
//            adminUser.setStatus(OwnerStatusEnum.ACTIVE);
//            adminUser.setRoles(List.of(adminRole));
//
//            User customerUser = new User();
//            customerUser.setName("John Doe");
//            customerUser.setEmail("john@example.com");
//            customerUser.setPassword(passwordEncoder.encode("password123"));
//            customerUser.setPhone("987-654-3210");
//            customerUser.setStatus(OwnerStatusEnum.ACTIVE);
//            customerUser.setRoles(List.of(customerRole));
//
//            User ownerUser = new User();
//            ownerUser.setName("Jane Smith");
//            ownerUser.setEmail("jane@example.com");
//            ownerUser.setPassword(passwordEncoder.encode("password123"));
//            ownerUser.setPhone("555-555-5555");
//            ownerUser.setStatus(OwnerStatusEnum.ACTIVE);
//            ownerUser.setRoles(List.of(ownerRole));
//
//            User ownerUser1 = new User();
//            ownerUser1.setName("NhienLQ");
//            ownerUser1.setEmail("nhien@example.com");
//            ownerUser1.setPassword(passwordEncoder.encode("password123"));
//            ownerUser1.setPhone("555-555-5555");
//            ownerUser1.setStatus(OwnerStatusEnum.ACTIVE);
//            ownerUser1.setRoles(List.of(ownerRole));
//
//            userRepository.saveAll(List.of(adminUser, customerUser, ownerUser,ownerUser1));
//        }
//    }
//    private void seedAddress() {
//        if (addressRepository.count() == 0) {
//
//
//            Address address1 = new Address();
//            address1.setCity("FairField");
//            address1.setStreet("Street 1");
//            address1.setState("Iowa");
//            address1.setPostalCode("12345");
//
//
//            Address address2 = new Address();
//            address2.setCity("Keosauqua");
//            address2.setStreet("Street 2");
//            address2.setState("Iowa");
//            address2.setPostalCode("33333");
//
//            Address address3 = new Address();
//            address3.setCity("Iowa");
//            address3.setStreet("Street 3");
//            address1.setState("Iowa");
//            address3.setPostalCode("22222");
//
//            addressRepository.saveAll(List.of(address1, address2, address3));
//        }
//    }
//    private void seedPhoto() {
//        if (photoRepository.count() == 0) {
//
//            Photo photo1 = new Photo();
//            photo1.setPath("photo/download.jpeg");
//
//            Photo photo2 = new Photo();
//            photo2.setPath("photo/download1.jpeg");
//
//
//
//
//            photoRepository.saveAll(List.of(photo1, photo2));
//        }
//    }
//
//    private void seedProperties() {
//        if (propertyRepository.count() == 0) {
//            Optional<User> owner = userRepository.findById(Long.valueOf(3));
//            Optional<User> owner1 = userRepository.findById(Long.valueOf(4));
//
//            Address address1 = addressRepository.findByCity("Keosauqua");
//            Address address2 = addressRepository.findByCity("FairField");
//            Address address3 = addressRepository.findByCity("Iowa");
//
//            Photo photo1 = photoRepository.findById(1L).get();
//            Photo photo2 = photoRepository.findById(2L).get();
//
//            Property property1 = new Property();
//            property1.setName("Luxury Apartment");
//            property1.setDescription("A beautiful apartment in downtown.");
//            property1.setType(PropertyTypeEnum.RENT);
//            property1.setPrice(2500);
//            property1.setBed(3);
//            property1.setBath(2);
//            property1.setSqft(1200);
//            property1.setStatus(PropertyStatusEnum.AVAILABLE);
//            property1.setMaterial("Brick");
//            property1.setStyle("Modern");
//            property1.setUser(owner.get());
//            property1.setAddress(address1);
//            property1.setHouseType("Apartment");
//            property1.setPhotos(List.of(photo1, photo2));
//
//
//            Property property2 = new Property();
//            property2.setName("Suburban House");
//            property2.setDescription("A spacious home with a large backyard.");
//            property2.setType(PropertyTypeEnum.SELL);
//            property2.setPrice(450000);
//            property2.setBed(4);
//            property2.setBath(3);
//            property2.setSqft(2500);
//            property2.setStatus(PropertyStatusEnum.AVAILABLE);
//            property2.setMaterial("Wood");
//            property2.setStyle("Rustic");
//            property2.setUser(owner.get());
//            property2.setAddress(address2);
//            property2.setHouseType("House");
//
//            Property property3 = new Property();
//            property3.setName("abc");
//            property3.setDescription("askdjoasjlkdlkfjngfg.");
//            property3.setType(PropertyTypeEnum.SELL);
//            property3.setPrice(200000);
//            property3.setBed(3);
//            property3.setBath(2);
//            property3.setSqft(2900);
//            property3.setStatus(PropertyStatusEnum.NEW);
//            property3.setMaterial("Wood");
//            property3.setStyle("Rustic");
//            property3.setUser(owner1.get());
//            property3.setAddress(address3);
//            property3.setHouseType("House");
//
//            propertyRepository.saveAll(List.of(property1, property2, property3));
//        }
//    }
//
//    private void seedOffers() {
//        if (offerRepository.count() == 0) {
//            User customer = userRepository.findByEmail("john@example.com");
//            Property property = propertyRepository.findByName("Luxury Apartment");
//
//            Offer offer = new Offer();
//            offer.setType(OfferTypeEnum.RENT);
//            offer.setOfferPrice(2400);
//            offer.setStatus(OfferStatusEnum.NEW);
//            offer.setProperty(property);
//            offer.setUser(customer);
//            offerRepository.save(offer);
//
//            Property property1 = propertyRepository.findByName("Suburban House");
//            Offer offer1 = new Offer();
//            offer1.setType(OfferTypeEnum.RENT);
//            offer1.setOfferPrice(1100);
//            offer1.setStatus(OfferStatusEnum.ACCEPTED);
//            offer1.setProperty(property1);
//            offer1.setUser(customer);
//            offerRepository.save(offer1);
//
//            Property property2 = propertyRepository.findByName("abc");
//            Offer offer2 = new Offer();
//            offer2.setType(OfferTypeEnum.RENT);
//            offer2.setOfferPrice(1100);
//            offer2.setStatus(OfferStatusEnum.REJECTED);
//            offer2.setProperty(property2);
//            offer2.setUser(customer);
//            offerRepository.save(offer2);
//        }
//    }
//
//    private void seedFavouriteLists() {
//        if (favouriteListRepository.count() == 0) {
//            User customer = userRepository.findByEmail("john@example.com");
//            Property property1 = propertyRepository.findByName("Luxury Apartment");
//            Property property2 = propertyRepository.findByName("Suburban House");
//
//            FavouriteList favouriteList = new FavouriteList();
//            favouriteList.setName("My Saved Properties");
//            favouriteList.setUser(customer);
//            favouriteList.setProperties(List.of(property1, property2));
//
//            favouriteListRepository.save(favouriteList);
//        }
//    }
//}
public class DataInitializer {

    @Bean
    @Transactional
    CommandLineRunner initData(UserRepo userRepo, RoleRepo roleRepo,
                               PropertyRepo propertyRepo, AddressRepo addressRepo,
                               OfferRepo offerRepo, FavouriteListRepo favouriteListRepo,
                               PhotoRepo photoRepo) {
        return args -> {

            // Create roles
//            Role adminRole = new Role();
//            adminRole.setRole(RoleEnum.ADMIN);
//
//            Role customerRole = new Role();
//            customerRole.setRole(RoleEnum.CUSTOMER);
//
//            Role ownerRole = new Role();
//            ownerRole.setRole(RoleEnum.OWNER);
//
//            roleRepo.saveAll(List.of(adminRole, customerRole, ownerRole));
//
//            // Create users
//            List<User> users = IntStream.range(1, 11).mapToObj(i -> {
//                User user = new User();
//                user.setName("User " + i);
//                user.setEmail("user" + i + "@example.com");
//                user.setPassword("password" + i);
//                user.setPhone("123-456-789" + i);
//                user.setStatus(i % 2 == 0 ? OwnerStatusEnum.ACTIVE : OwnerStatusEnum.DEACTIVATED);
//                user.setRoles(i % 2 == 0 ? List.of(ownerRole) : List.of(customerRole));
//                return user;
//            }).toList();
//            userRepo.saveAll(users);
//
//            // Create addresses
//            List<Address> addresses = IntStream.range(1, 11).mapToObj(i -> {
//                Address address = new Address();
//                address.setCity("City " + i);
//                address.setState("State " + i);
//                address.setStreet("Street " + i);
//                address.setPostalCode("1000" + i);
//                return address;
//            }).toList();
//            addressRepo.saveAll(addresses);
//
//            // Create properties
//            List<Property> properties = IntStream.range(1, 11).mapToObj(i -> {
//                Property property = new Property();
//                property.setName("Property " + i);
//                property.setDescription("Description for property " + i);
//                property.setType(i % 2 == 0 ? PropertyTypeEnum.RENT : PropertyTypeEnum.SELL);
//                property.setPrice(100000 + (i * 10000));
//                property.setBed(2 + (i % 3));
//                property.setBath(1 + (i % 2));
//                property.setSqft(1200 + (i * 100));
//                property.setStatus(PropertyStatusEnum.values()[i % PropertyStatusEnum.values().length]);
//                property.setView(i * 10);
//                property.setSave(i * 2);
//                property.setYearBuilt(2000 + i);
//                property.setMaterial("Brick"+(i % 3));
//                property.setStyle("Modern"+(i % 3));
//                property.setHouseType("Apartment"+(i % 3));
//                property.setAddress(addresses.get(i - 1));
//                property.setUser(users.get(i - 1));
//
//                return property;
//            }).toList();
//            propertyRepo.saveAll(properties);
//
//            // Create photos for each property
//            List<Photo> photos = IntStream.range(1, 21).mapToObj(i -> {
//                Photo photo = new Photo();
//                photo.setPath("photo" + i + ".jpg");
//                return photo;
//            }).toList();
//            photoRepo.saveAll(photos);
//
//            // Assign photos to properties
//            for (int i = 0; i < properties.size(); i++) {
//                properties.get(i).setPhotos(photos.subList(i % photos.size(), (i % photos.size()) + 2));
//            }
//            propertyRepo.saveAll(properties);
//
//            // Create offers
//            List<Offer> offers = IntStream.range(1, 11).mapToObj(i -> {
//                Offer offer = new Offer();
//                offer.setSubmissionDate(LocalDate.now());
//                offer.setType(i % 2 == 0 ? OfferTypeEnum.RENT : OfferTypeEnum.BUY);
//                offer.setOfferPrice(90000 + (i * 5000));
//                offer.setStatus(OfferStatusEnum.values()[i % OfferStatusEnum.values().length]);
//                offer.setProperty(properties.get(i - 1));
//                offer.setUser(users.get(i - 1));
//                return offer;
//            }).toList();
//            offerRepo.saveAll(offers);
//
//            // Create favorite lists
//            List<FavouriteList> favouriteLists = IntStream.range(1, 11).mapToObj(i -> {
//                FavouriteList favouriteList = new FavouriteList();
//                favouriteList.setName("FavList " + i);
//                favouriteList.setUser(users.get(i - 1));
//                favouriteList.setProperties(properties.subList(0, 5));
//                return favouriteList;
//            }).toList();
//            favouriteListRepo.saveAll(favouriteLists);

            System.out.println("Data initialized successfully!");
        };
    }
}