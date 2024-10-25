package com.example.IncidentManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.IncidentManager.Entity.Notification;
import com.example.IncidentManager.Entity.User;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserAndIsReadFalse(User user);
}
