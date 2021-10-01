package com.hldvp.spring_boot.service;

import com.hldvp.spring_boot.model.Role;
import com.hldvp.spring_boot.model.User;
import com.hldvp.spring_boot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(long id) {
        User user = null;
        Optional<User> opUser =  userRepository.findById(id);
        if(opUser.isPresent()){
            user = opUser.get();
        }
        return user;
    }

    @Override
    public void saveUser(User user, String[] roles) {
        Set<Role> updateRole = new HashSet<>();
        for(String role : roles) {
            if(role.equals("ROLE_ADMIN")) {
                updateRole.add(new Role(1L, role));
            }
            else {
                updateRole.add(new Role(2L, role));
            }
        }
        user.setRoles(updateRole);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }
}
