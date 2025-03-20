package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import waa.miu.finalproject.entity.Offer;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.entity.dto.UserDto;
import waa.miu.finalproject.enums.OwnerStatusEnum;

import java.util.Collection;
import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findAll();

//    User findById(long id);

    User findByEmail(String email);

    void deleteById(long id);

    Collection<User> findByStatus(OwnerStatusEnum statusEnum);

    @Query("select u from User u join u.roles r where" +
            " (:status IS NULL OR u.status=:status)" +
            " AND (:role IS NULL OR r.role = :role)")
    List<User> findAllFilterByStatusAndRoles(@Param("status") String status, @Param("role") String role);

}
