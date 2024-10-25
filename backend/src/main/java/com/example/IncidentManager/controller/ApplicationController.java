package com.example.IncidentManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.IncidentManager.Entity.Application;
import com.example.IncidentManager.payload.response.MessageResponse;
import com.example.IncidentManager.service.ApplicationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RequestMapping("/api")
@Api(value = "Application API" , description = "CRUD operations for Application")
public class ApplicationController {
	@Autowired
	private ApplicationService applicationService;
	
	@ApiOperation(value = "Add one Application" , response = Application.class)
	@PostMapping("/saveApp")
	public Application save(@RequestBody Application app) {
		return applicationService.saveApplication(app);
	}
	
    
	@GetMapping("/findAllApplications")
    @ApiOperation(value = "Retrieve all applications", response = List.class)
	public List<Application> findAll() {
		return  applicationService.findAll();
	}
	
	@GetMapping("/findAppById")
    @ApiOperation(value = "Retrieve one Application by id", response = Application.class)
	public Application findById(@RequestParam int id) {
		return applicationService.findApplicationById(id);
	}
	
	@GetMapping("/findAppByManagerId")
    @ApiOperation(value = "Retrieve one Application by manager id", response = Application.class)
	public List<Application> findByManagerId(@RequestParam int id) {
		return applicationService.findAppByManagerId(id);
	}
	
	
	@PutMapping("/updateApplication/{id}")
    @ApiOperation(value = "Update an Application by id", response = Application.class)
    public Application update(@RequestParam int id, @RequestBody Application updatedApplication) {
        return applicationService.updateApplication(id, updatedApplication);
    }
	
	
	@DeleteMapping("/deleteApplication")
    @ApiOperation(value = "delete one Application by id")
	public ResponseEntity<MessageResponse> delete(@RequestParam int id) {
		applicationService.deleteApplication(id);
		return ResponseEntity.ok(new MessageResponse("App deleted successfully!"));
	}
	
}
