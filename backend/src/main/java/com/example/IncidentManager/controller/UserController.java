package com.example.IncidentManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.IncidentManager.service.UserService;

import com.example.IncidentManager.Entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@Api(value = "User API", description = "CRUD operations for User")
public class UserController {
	@Autowired
	private  UserService userService;
	
    @ApiOperation(value = "Add one User", response = User.class)
	@PostMapping("/saveUser")
	public User save(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
    
	@GetMapping("/findAllUsers")
    @ApiOperation(value = "Retrieve all Users", response = List.class)
	public List<User> findAll() {
		return  userService.findAll();
	}
	
	@GetMapping("/findUserById")
    @ApiOperation(value = "Retrieve one User by id", response = User.class)
	public User findById(@RequestParam int id) {
		return userService.getUserById(id);
	}
	
	@GetMapping("/findUserByEmail")
	@ApiOperation(value = "Retrieve Users by Email", response = List.class)
	public User findByEmail(@RequestParam String email) {
	     return userService.getUserByEmail(email);
	 }
	
	
	
	@PutMapping("/updateUser/{id}")
    @ApiOperation(value = "update one User by id", response = User.class)
	public User update(@PathVariable("id") int id,@RequestBody User User) {
		return userService.updateUser(id ,User);
	}
	
	
	@DeleteMapping("/deleteUser")
    @ApiOperation(value = "delete one User by id")
	public void delete(@RequestParam int id) {
		userService.deleteUser(id);
		System.out.println("User deleted successfully");
	}
	
	
	 @GetMapping("/exists/userRole")
	 public boolean existsByUserIdAndRoleId(@RequestParam Integer userId, @RequestParam Integer roleId) {
        return userService.existsByUserIdAndRoleId(userId, roleId);
     }
	 
	 @GetMapping("/UsersByRoleId")
	 public List<User> getUsersByRole(@RequestParam Integer roleId) {
			return userService.getUsersByRole(roleId);
		}
}
