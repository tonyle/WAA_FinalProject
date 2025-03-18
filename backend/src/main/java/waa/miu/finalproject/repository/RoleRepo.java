package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import waa.miu.finalproject.entity.Role;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.enums.RoleEnum;

import java.util.List;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByRole(RoleEnum roleEnum);
//    void saveAll(List<Role> roles);
}
