package com.example.IncidentManager.Entity;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "incident")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class Incident implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String title;
	private String description;

	@Enumerated(EnumType.STRING)
	private StatusType status;

	@Enumerated(EnumType.STRING)
	private SeverityType severity;

	private Timestamp reportedAt;
	private Timestamp resolvedAt;

	private String solutionDescription;

	public enum StatusType {
		Open, In_Progress, Resolved , Readytotest , Closed
	}

	public enum SeverityType {
		Low, Medium, High, Critical
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "application_id", referencedColumnName = "id")
	private Application application;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reporter_id", referencedColumnName = "id")
	private User reportedBy;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "resolver_id", referencedColumnName = "id")
	private User resolvedBy;

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public StatusType getStatus() {
		return status;
	}

	@Transient
	public void setStatus(String status) {
		this.status = status != null ? StatusType.valueOf(status) : null;
	}

	public void setStatus(StatusType status) {
		this.status = status;
	}

	public SeverityType getSeverity() {
		return severity;
	}

	@Transient
	public void setSeverity(String severity) {
		this.severity = severity != null ? SeverityType.valueOf(severity) : null;
	}

	public void setSeverity(SeverityType severity) {
		this.severity = severity;
	}

	

	public String getSolutionDescription() {
		return solutionDescription;
	}

	public void setSolutionDescription(String solution_description) {
		this.solutionDescription = solution_description;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}
	
	public void setReportedBy(User reporter) {
		this.reportedBy = reporter;
	}
	
	public void setResolvedBy(User resolver) {
		this.resolvedBy = resolver;
	}

	public User getReportedBy() {
		return reportedBy;
	}

	public User getResolvedBy() {
		return resolvedBy;
	}

	public Timestamp getReportedAt() {
		return reportedAt;
	}

	public void setReportedAt(Timestamp reportedAt) {
		this.reportedAt = reportedAt;
	}

	public Timestamp getResolvedAt() {
		return resolvedAt;
	}

	public void setResolvedAt(Timestamp resolvedAt) {
		this.resolvedAt = resolvedAt;
	}

}
