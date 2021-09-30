package com.hldvp.spring_boot.repository;

import com.hldvp.spring_boot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("from User u join fetch u.roles where u.username =:username")
    User getUserByUsername (String username);

    @Query("select distinct u from User u join fetch u.roles")
    List<User> findAll ();

}
