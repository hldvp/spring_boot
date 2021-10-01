package com.hldvp.spring_boot.service;

//import web.model.User;

import com.hldvp.spring_boot.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User getUserById(long id);
    public void saveUser(User user, String[] roles);
    public void deleteUser(long id);
    public User getUserByUsername(String username);
}
