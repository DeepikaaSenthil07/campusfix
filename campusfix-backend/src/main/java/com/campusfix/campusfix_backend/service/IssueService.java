package com.campusfix.campusfix_backend.service;

import com.campusfix.campusfix_backend.entity.Issue;
import com.campusfix.campusfix_backend.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    // Create a new issue
    public Issue createIssue(Issue issue) {
        issue.setStatus("OPEN");
        return issueRepository.save(issue);
    }

    // Get all issues
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    // Get one issue by ID
    public Optional<Issue> getIssueById(Long id) {
        return issueRepository.findById(id);
    }

    // Delete an issue
    public void deleteIssue(Long id) {
        issueRepository.deleteById(id);
    }
    // Update issue status
public Optional<Issue> updateStatus(Long id, String status) {
    Optional<Issue> optionalIssue = issueRepository.findById(id);

    if (optionalIssue.isPresent()) {
        Issue issue = optionalIssue.get();
        issue.setStatus(status);
        return Optional.of(issueRepository.save(issue));
    }

    return Optional.empty();
}
}