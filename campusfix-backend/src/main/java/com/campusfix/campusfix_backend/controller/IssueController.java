package com.campusfix.campusfix_backend.controller;

import com.campusfix.campusfix_backend.model.Issue;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    private final List<Issue> issues = new ArrayList<>();

    @PostMapping
    public String createIssue(@RequestBody Issue issue) {

        issues.add(issue);

        System.out.println("New Issue Received:");
        System.out.println("Title: " + issue.getTitle());
        System.out.println("Category: " + issue.getCategory());
        System.out.println("Location: " + issue.getLocation());
        System.out.println("Description: " + issue.getDescription());

        return "Issue received successfully!";
    }
    @GetMapping
    public List<Issue> getIssues() {
        return issues;
    }
}