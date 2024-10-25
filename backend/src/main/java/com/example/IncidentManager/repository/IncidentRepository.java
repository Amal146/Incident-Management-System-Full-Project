package com.example.IncidentManager.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.IncidentManager.Entity.Incident;
import com.example.IncidentManager.Entity.Incident.StatusType;

public interface IncidentRepository extends JpaRepository<Incident, Integer>{
    List<Incident> findByTitle(String title);
    List<Incident> findByDescription(String description);
    List<Incident>  findByApplicationId(int applicationId);
    @Query("SELECT i FROM Incident i WHERE i.resolvedBy.id = :resolverId")
    List<Incident> findByResolverId(@Param("resolverId") Integer resolverId);
    @Query(value = "SELECT reporter_id, resolver_id FROM public.incident WHERE id = ?1", nativeQuery = true)
    List<Object[]> findContributorsByIncident(int applicationId);
    
    Page<Incident> findAllByStatus(StatusType status, Pageable pageable);
    

}
