package com.example.demo.service;

import com.example.demo.entity.Test;
import com.example.demo.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    private TestRepository repo;

    public List<Test> getAllTests() {
        return repo.findAll();
    }

    public Test getTest(int id) {
        return repo.findById(id).orElse(null);
    }

    public List<Test> getTestsBySubject(int subjectId) {
        return repo.findBySubjectId(subjectId);
    }

    public Test addTest(Test test) {
        return repo.save(test);
    }

    public Test updateTest(Test test, int id) {
        test.setId(id);
        return repo.save(test);
    }

    public void deleteTest(int id) {
        repo.deleteById(id);
    }
}