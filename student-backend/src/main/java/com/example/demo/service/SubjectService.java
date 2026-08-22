package com.example.demo.service;

import com.example.demo.entity.Subject;
import com.example.demo.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository repo;

    public List<Subject> getAllSubjects() {
        return repo.findAll();
    }

    public Subject getSubject(int id) {
        return repo.findById(id).orElse(null);
    }

    public Subject addSubject(Subject subject) {
        return repo.save(subject);
    }

    public Subject updateSubject(Subject subject, int id) {
        subject.setId(id);
        return repo.save(subject);
    }

    public void deleteSubject(int id) {
        repo.deleteById(id);
    }
}