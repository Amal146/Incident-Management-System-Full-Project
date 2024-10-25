package com.example.IncidentManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.IncidentManager.Entity.Notification;
import com.example.IncidentManager.Entity.User;
import com.example.IncidentManager.service.NotificationService;
import com.example.IncidentManager.service.UserService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @Autowired
	private  UserService userService;
	
    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications(@RequestParam int userId) {
        User user = userService.getUserById(userId);
        return notificationService.getUnreadNotifications(user);
    }

    @PostMapping("/mark-as-read")
    public void markAsRead(@RequestParam int notificationId) {
        notificationService.markAsRead(notificationId);
    }
    
    @PostMapping("/save")
    public void save(@RequestBody Notification notification) {
        notificationService.saveNotification(notification);
    }
}

