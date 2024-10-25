package com.example.IncidentManager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.IncidentManager.Entity.Application;
import com.example.IncidentManager.Entity.Incident;
import com.example.IncidentManager.Entity.Incident.StatusType;
import com.example.IncidentManager.Entity.User;
import com.example.IncidentManager.repository.ApplicationRepository;
import com.example.IncidentManager.repository.IncidentRepository;
import com.example.IncidentManager.repository.UserRepository;

@Service
public class IncidentService {
	@Autowired
	private IncidentRepository incidentRepository;
	
	 @Autowired
	 private ApplicationRepository applicationRepository;
	 
	 @Autowired
	 private UserRepository userRepository;
	 
	
	// Post Incident
	public Incident saveIncident(Incident incident) {

	        return incidentRepository.save(incident);
	}


	// GET Contributors By Incident
	public List<Object[]> findContributorsByIncident(int applicationId) {      
        return incidentRepository.findContributorsByIncident(applicationId);
    }
	
	
	//Get Incident By Id
	public Incident findIncidentId(int id) {
		Optional<Incident> incident = incidentRepository.findById(id);
		if(incident.isEmpty()) {
			throw new RuntimeException("Incident not Found");
		}
		return incident.get();
	}
	
	// Get Incident By Title
    public List<Incident> findIncidentByTitle(String title) {
        return incidentRepository.findByTitle(title);
    }
	
    // Get Incident By Application Id
    public  List<Incident>  findIncidentByAppId(int applicationId) {
        return incidentRepository.findByApplicationId(applicationId);
    }
    
    
	//Get all Incident 
	public List<Incident> findAll(){
		return incidentRepository.findAll();
	}
	
	// Get all Incidents Per Page with optional status filter
	public Page<Incident> findAllPerPage(int pageNo, int pageSize, Optional<String> status) {
	    Pageable pageable = PageRequest.of(pageNo, pageSize);
	    StatusType statusType = null;

	    if (status.isPresent() && !status.get().isEmpty()) {
	        try {
	            statusType = StatusType.valueOf(status.get());
	        } catch (IllegalArgumentException e) {
	        }
	    }

	    if (statusType != null) {
	        return incidentRepository.findAllByStatus(statusType, pageable);
	    } else {
	        return incidentRepository.findAll(pageable);
	    }
	}


	
	//GET incident by resolver id 
	public List<Incident> getIncidentsByResolverId(Integer resolverId) {
        return incidentRepository.findByResolverId(resolverId);
    }
	
	// Update Incident By Id
	public Incident updateIncident(int id, Incident incident) {
	    Optional<Incident> dbIncident = incidentRepository.findById(id);
	    if (dbIncident.isEmpty()) {
	        throw new RuntimeException("Incident not Found");
	    }
	    
	    Incident existingIncident = dbIncident.get();
	    
	    existingIncident.setTitle(incident.getTitle());
	    existingIncident.setDescription(incident.getDescription());
	    existingIncident.setReportedAt(incident.getReportedAt());
	    existingIncident.setResolvedAt(incident.getResolvedAt());
	    existingIncident.setSolutionDescription(incident.getSolutionDescription());
	    existingIncident.setStatus(incident.getStatus());
	    existingIncident.setSeverity(incident.getSeverity());
	    
	    // Fetch application entity from database using its id
        Application application = applicationRepository.findById(incident.getApplication().getId()).orElseThrow();
        // Set the application entity to the incident
        existingIncident.setApplication(application);
        
        // Fetch reportedBy user entity from database using its id
        User reportedBy = userRepository.findById(incident.getReportedBy().getId()).orElseThrow();
        
        // Set the reportedBy user entity to the incident
        existingIncident.setReportedBy(reportedBy);
        
        // Fetch resolvedBy user entity from database using its id
        User resolvedBy = userRepository.findById(incident.getResolvedBy().getId()).orElseThrow();
        
        // Set the resolvedBy user entity to the incident
        existingIncident.setResolvedBy(resolvedBy);
	   
	    
	    return incidentRepository.save(existingIncident);
	}
	
	
	//Delete Incident By Id
	public void deleteIncident(int id) {
		Optional<Incident> dbIncident = incidentRepository.findById(id);
		if(dbIncident.isEmpty()) {
			throw new RuntimeException("Incident not Found");
		}
		
		Incident existingIncident = dbIncident.get();	
		incidentRepository.delete(existingIncident);
	}
	

}
