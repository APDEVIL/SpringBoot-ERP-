package com.example.demo.service;

import com.example.demo.entity.SubjectAllocation;
import com.example.demo.repository.SubjectAllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectAllocationService {
    @Autowired
    private SubjectAllocationRepository repo;

    public List<SubjectAllocation> getAllAllocations() {
        return repo.findAll();
    }

    public SubjectAllocation getAllocation(int id) {
        return repo.findById(id).orElse(null);
    }

    public List<SubjectAllocation> getAllocationsByTeacher(int teacherId) {
        return repo.findByTeacherId(teacherId);
    }

    public List<SubjectAllocation> getAllocationsBySubject(int subjectId) {
        return repo.findBySubjectId(subjectId);
    }

    public SubjectAllocation addAllocation(SubjectAllocation allocation) {
        return repo.save(allocation);
    }

    public SubjectAllocation updateAllocation(SubjectAllocation allocation, int id) {
        allocation.setId(id);
        return repo.save(allocation);
    }

    public void deleteAllocation(int id) {
        repo.deleteById(id);
    }
}