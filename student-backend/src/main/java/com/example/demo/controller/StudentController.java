package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentservice;

    @GetMapping
    public List<Student> getAllStudentDetails() {
        return studentservice.getAllStudentDetails();
    }

    @GetMapping("/{id}")
    public Student getStudentDetails(@PathVariable int id) {
        return studentservice.getStudentDetails(id);
    }

    @PostMapping
    public Student addStudentDetails(@RequestBody Student student) {
        return studentservice.addStudentDetails(student);
    }

    @PutMapping("/{id}")
    public Student updateStudentDetails(@RequestBody Student student, @PathVariable int id) {
        return studentservice.updateStudentDetails(student, id);
    }

    @DeleteMapping("/{id}")
    public String deleteStudentDetails(@PathVariable int id) {
        studentservice.deleteStudentDetails(id);
        return "Student deleted successfully";
    }
}