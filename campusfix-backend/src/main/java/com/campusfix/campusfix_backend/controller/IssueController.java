package com.campusfix.campusfix_backend.controller;

import com.campusfix.campusfix_backend.entity.Issue;
import com.campusfix.campusfix_backend.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // Create a new issue
    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {
        return issueService.createIssue(issue);
    }

    // Get all issues
    @GetMapping
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }

    // Get one issue by ID
    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete an issue
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        issueService.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }
    // Update issue status
@PutMapping("/{id}/status")
public ResponseEntity<Issue> updateStatus(
        @PathVariable Long id,
        @RequestParam String status) {

    return issueService.updateStatus(id, status)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}
}