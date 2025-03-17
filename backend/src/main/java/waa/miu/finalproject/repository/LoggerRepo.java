package waa.miu.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import waa.miu.finalproject.entity.Logger;

public interface LoggerRepo extends JpaRepository<Logger, Long> {
}
