package com.example.demo.service;

import com.example.demo.entity.Marks;
import com.example.demo.repository.MarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {
    @Autowired
    private MarksRepository repo;

    public List<Marks> getAllMarks() {
        return repo.findAll();
    }

    public Marks getMark(int id) {
        return repo.findById(id).orElse(null);
    }

    public List<Marks> getMarksByStudent(int studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<Marks> getMarksByTest(int testId) {
        return repo.findByTestId(testId);
    }

    public Marks addMark(Marks mark) {
        return repo.save(mark);
    }

    public Marks updateMark(Marks mark, int id) {
        mark.setId(id);
        return repo.save(mark);
    }

    public void deleteMark(int id) {
        repo.deleteById(id);
    }
}