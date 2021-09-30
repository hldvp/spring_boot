package com.hldvp.spring_boot.repository;

import com.hldvp.spring_boot.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
