package com.example.demo.repository;

import com.example.demo.entity.SubjectAllocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectAllocationRepository extends JpaRepository<SubjectAllocation, Integer> {
    List<SubjectAllocation> findByTeacherId(Integer teacherId);
    List<SubjectAllocation> findBySubjectId(Integer subjectId);
}