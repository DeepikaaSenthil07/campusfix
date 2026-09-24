package com.campusfix.campusfix_backend.repository;

import com.campusfix.campusfix_backend.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Long> {
}