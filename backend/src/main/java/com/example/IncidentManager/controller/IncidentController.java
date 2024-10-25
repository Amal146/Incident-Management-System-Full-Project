package com.example.IncidentManager.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.IncidentManager.Entity.Incident;
import com.example.IncidentManager.service.IncidentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@Api(value = "Incident API", description = "CRUD operations for Incident")
public class IncidentController {
	@Autowired
	private IncidentService incidentService;
	
    @ApiOperation(value = "Add one incident", response = Incident.class)
	@PostMapping("/saveIncident")
	public Incident save(@RequestBody Incident incident) {
		return incidentService.saveIncident(incident);
	}
	
    
	@GetMapping("/findAllIncidents")
    @ApiOperation(value = "Retrieve all incidents", response = List.class)
	public List<Incident> findAll() {
		return  incidentService.findAll();
	}
	
	@GetMapping("/findAllIncidentsByPage")
	@ApiOperation(value = "Retrieve all incidents per page", response = Page.class)
	public ResponseEntity<Page<Incident>> getAllPerPage(
	        @RequestParam(defaultValue = "0") int pageNo,
	        @RequestParam(defaultValue = "10") int pageSize,
	        @RequestParam(defaultValue = "Open") String status) {
	    
	    // Call the service with the status as an optional parameter
	    Page<Incident> incidents = incidentService.findAllPerPage(pageNo, pageSize, Optional.ofNullable(status)); 
	    return new ResponseEntity<>(incidents, HttpStatus.OK);
	}

	@GetMapping("/findContributorsByIncidentId")
    @ApiOperation(value = "Retrieve contributors by incident", response = String.class)
    public List<Object[]> findContributorsByIncidentId(@RequestParam int id) {
        return incidentService.findContributorsByIncident(id);
    }
	
	@GetMapping("/findIcidentById")
    @ApiOperation(value = "Retrieve one incident by id", response = Incident.class)
	public Incident findById(@RequestParam int id) {
		return incidentService.findIncidentId(id);
	}
	
	@GetMapping("/findIcidentByIdResolver")
    @ApiOperation(value = "Retrieve incidents by resolver id", response = List.class)
	public List<Incident> getIncidentsByResolver(@RequestParam Integer resolverId) {
		return incidentService.getIncidentsByResolverId(resolverId);
	}
	
	@GetMapping("/findIncidentByTitle")
	@ApiOperation(value = "Retrieve incidents by title", response = List.class)
	public List<Incident> findByTitle(@RequestParam String title) {
	     return incidentService.findIncidentByTitle(title);
	 }
	
	@GetMapping("/findIncidentByAppId")
	@ApiOperation(value = "Retrieve incidents by application id", response = List.class)
	public List<Incident> findByAppId(@RequestParam int application_id) {
	     return incidentService.findIncidentByAppId(application_id);
	}

	
	@PutMapping("/updateIncident/{id}")
    @ApiOperation(value = "update one incident by id", response = Incident.class)
	public Incident update(@PathVariable("id") int id, @RequestBody Incident incident) {
		return incidentService.updateIncident(id , incident);
	}
	
	
	@DeleteMapping("/deleteIncident")
    @ApiOperation(value = "delete one incident by id")
	public void delete(@RequestParam int id) {
		incidentService.deleteIncident(id);
	}
	
	
}
