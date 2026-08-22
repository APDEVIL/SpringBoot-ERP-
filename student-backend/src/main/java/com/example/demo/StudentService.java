package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;

    public List<Student> getAllStudentDetails() { return repo.findAll(); }
    public Student getStudentDetails(int id) { return repo.findById(id).orElse(null); }
    public Student addStudentDetails(Student student) { return repo.save(student); }
    public Student updateStudentDetails(Student student, int id) {
        student.setId(id);
        return repo.save(student);
    }
    public void deleteStudentDetails(int id) { repo.deleteById(id); }
}