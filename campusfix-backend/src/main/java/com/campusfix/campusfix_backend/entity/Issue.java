package com.campusfix.campusfix_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String location;

    private String category;

    private String status;
    private String priority;

    public Issue() {
    }

    public Issue(String title, String description, String location,
             String category, String status, String priority) {
    this.title = title;
    this.description = description;
    this.location = location;
    this.category = category;
    this.status = status;
    this.priority = priority;
}

    public Long getId() {
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getPriority() {
    return priority;
}

public void setPriority(String priority) {
    this.priority = priority;
}
}