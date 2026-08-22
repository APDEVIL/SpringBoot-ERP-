package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class StudentController {
    @Autowired
    private StudentService studentservice;

    @GetMapping("/students")
    public List<Student> getAllStudentDetails() {
        return studentservice.getAllStudentDetails();
    }

    @GetMapping("/students/{id}")
    public Student getStudentDetails(@PathVariable int id) {
        return studentservice.getStudentDetails(id);
    }

    @PostMapping("/students")
    public Student addStudentDetails(@RequestBody Student student) {
        return studentservice.addStudentDetails(student);
    }

    @PutMapping("/students/{id}")
    public Student updateStudentDetails(@RequestBody Student student, @PathVariable int id) {
        return studentservice.updateStudentDetails(student, id);
    }

    @DeleteMapping("/students/{id}")
    public String deleteStudentDetails(@PathVariable int id) {
        studentservice.deleteStudentDetails(id);
        return "Student deleted successfully";
    }
}