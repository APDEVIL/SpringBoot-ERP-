package com.example.demo.controller;

import com.example.demo.entity.Subject;
import com.example.demo.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/subjects")
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public Subject getSubject(@PathVariable int id) {
        return subjectService.getSubject(id);
    }

    @PostMapping
    public Subject addSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }

    @PutMapping("/{id}")
    public Subject updateSubject(@RequestBody Subject subject, @PathVariable int id) {
        return subjectService.updateSubject(subject, id);
    }

    @DeleteMapping("/{id}")
    public String deleteSubject(@PathVariable int id) {
        subjectService.deleteSubject(id);
        return "Subject deleted successfully";
    }
}