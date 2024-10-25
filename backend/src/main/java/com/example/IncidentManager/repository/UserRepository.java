package com.example.IncidentManager.repository;
import com.example.IncidentManager.Entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends JpaRepository<User, Integer>{
	Optional<User> findByUsername(String username);
	Boolean existsByUsername(String username);
	Optional<User> findByEmail(String email); 
	Boolean existsByEmail(String email);
	
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.id = :roleId")
    List<User> findUsersByRoleId(@Param("roleId") Integer roleId);
    
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END FROM User u JOIN u.roles r WHERE u.id = :userId AND r.id = :roleId")
    boolean existsByUserIdAndRoleId(@Param("userId") Integer userId, @Param("roleId") Integer roleId);

   
}