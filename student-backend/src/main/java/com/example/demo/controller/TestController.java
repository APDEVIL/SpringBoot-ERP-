package com.example.demo.controller;

import com.example.demo.entity.Test;
import com.example.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tests")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping
    public List<Test> getAllTests() {
        return testService.getAllTests();
    }

    @GetMapping("/{id}")
    public Test getTest(@PathVariable int id) {
        return testService.getTest(id);
    }

    @GetMapping("/by-subject/{subjectId}")
    public List<Test> getBySubject(@PathVariable int subjectId) {
        return testService.getTestsBySubject(subjectId);
    }

    @PostMapping
    public Test addTest(@RequestBody Test test) {
        return testService.addTest(test);
    }

    @PutMapping("/{id}")
    public Test updateTest(@RequestBody Test test, @PathVariable int id) {
        return testService.updateTest(test, id);
    }

    @DeleteMapping("/{id}")
    public String deleteTest(@PathVariable int id) {
        testService.deleteTest(id);
        return "Test deleted successfully";
    }
}