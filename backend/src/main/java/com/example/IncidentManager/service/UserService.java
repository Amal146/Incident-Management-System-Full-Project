package com.example.IncidentManager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.IncidentManager.Entity.User;
import com.example.IncidentManager.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	// POST User 
	public User saveUser(User user) {
		Optional<User> dbUser = userRepository.findByEmail(user.getEmail());
		if(dbUser.isEmpty()) {
			return userRepository.save(user);
		}
		throw new RuntimeException("Email already used ");
	}
	
	//GET Users By Role id
	public List<User> getUsersByRole(int roleId) {
		return userRepository.findUsersByRoleId(roleId);
	}
	
	
	// GET User By id 
	public User getUserById(int id) {
		Optional<User> dbUser = userRepository.findById(id);
		if(dbUser.isEmpty()) {
			throw new RuntimeException("User not found ");

		}
		return dbUser.get();
		}
	
	//Get all Users 
		public List<User> findAll(){
			return userRepository.findAll();
		}
		
	
	// GET User By email
	public User getUserByEmail(String email) {
		Optional<User> dbUser = userRepository.findByEmail(email);
		if(dbUser.isEmpty()) {
			throw new RuntimeException("User not found ");
		}
		return dbUser.get();
					
	}
	
	// UPDATE Existing User
	public User updateUser(int id, User user) {
		Optional<User> dbUser = userRepository.findById(id);
		if(dbUser.isEmpty()) {
			throw new RuntimeException("User not found ");
		}
		
		User existingUser = dbUser.get();
		
		existingUser.setEmail(user.getEmail());
		existingUser.setFirstName(user.getFirstName());
		existingUser.setLastName(user.getLastName());
		existingUser.setPassword(user.getPassword());
		existingUser.setUsername(user.getUsername());
		
		return userRepository.save(existingUser);
		
	}
	
	// DELETE Existing User
	public void deleteUser(int id) {
			Optional<User> dbUser = userRepository.findById(id);
			if(dbUser.isEmpty()) {
				throw new RuntimeException("User not found ");
			}
			userRepository.delete(dbUser.get());
	}
	
	// Check If User exists by user Id and Role Id 
	
	public boolean existsByUserIdAndRoleId(Integer userId, Integer roleId) {
        return userRepository.existsByUserIdAndRoleId(userId, roleId);
    }

}
