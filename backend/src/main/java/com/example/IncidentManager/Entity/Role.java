package com.example.IncidentManager.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ERole name;
  
  public ERole getName() {
	return name;
}

public void setName(ERole name) {
	this.name = name;
}

public enum ERole {
	    ROLE_USER,
	    ROLE_MODERATOR,
	    ROLE_ADMIN,
	    ROLE_TESTER
	}

  public Role() {

  }

  public Role(ERole name) {
    this.name = name;
  }

  // getters and setters
}

