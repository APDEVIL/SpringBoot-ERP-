package com.example.demo.controller;

import com.example.demo.entity.Marks;
import com.example.demo.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/marks")
public class MarksController {
    @Autowired
    private MarksService marksService;

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public Marks getMark(@PathVariable int id) {
        return marksService.getMark(id);
    }

    @GetMapping("/by-student/{studentId}")
    public List<Marks> getByStudent(@PathVariable int studentId) {
        return marksService.getMarksByStudent(studentId);
    }

    @GetMapping("/by-test/{testId}")
    public List<Marks> getByTest(@PathVariable int testId) {
        return marksService.getMarksByTest(testId);
    }

    @PostMapping
    public Marks addMark(@RequestBody Marks mark) {
        return marksService.addMark(mark);
    }

    @PutMapping("/{id}")
    public Marks updateMark(@RequestBody Marks mark, @PathVariable int id) {
        return marksService.updateMark(mark, id);
    }

    @DeleteMapping("/{id}")
    public String deleteMark(@PathVariable int id) {
        marksService.deleteMark(id);
        return "Mark deleted successfully";
    }
}