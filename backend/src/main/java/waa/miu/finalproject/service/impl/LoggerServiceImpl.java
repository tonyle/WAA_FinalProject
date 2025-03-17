package waa.miu.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.Logger;
import waa.miu.finalproject.repository.LoggerRepo;
import waa.miu.finalproject.service.LoggerService;

@Service
public class LoggerServiceImpl implements LoggerService {
    @Autowired
    private LoggerRepo loggerRepository;

    public void logOperation(String operation) {
        Logger log = new Logger("StaticUser", operation);
        loggerRepository.save(log);
    }
}
