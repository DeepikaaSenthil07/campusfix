package com.campusfix.campusfix_backend.model;

public class Issue {

    private String title;
    private String category;
    private String location;
    private String description;

    public Issue() {
    }

    public Issue(String title, String category, String location, String description) {
        this.title = title;
        this.category = category;
        this.location = location;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}