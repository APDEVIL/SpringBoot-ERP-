package com.example.demo.controller;

import com.example.demo.entity.SubjectAllocation;
import com.example.demo.service.SubjectAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/allocations")
public class SubjectAllocationController {
    @Autowired
    private SubjectAllocationService allocationService;

    @GetMapping
    public List<SubjectAllocation> getAllAllocations() {
        return allocationService.getAllAllocations();
    }

    @GetMapping("/{id}")
    public SubjectAllocation getAllocation(@PathVariable int id) {
        return allocationService.getAllocation(id);
    }

    @GetMapping("/by-teacher/{teacherId}")
    public List<SubjectAllocation> getByTeacher(@PathVariable int teacherId) {
        return allocationService.getAllocationsByTeacher(teacherId);
    }

    @GetMapping("/by-subject/{subjectId}")
    public List<SubjectAllocation> getBySubject(@PathVariable int subjectId) {
        return allocationService.getAllocationsBySubject(subjectId);
    }

    @PostMapping
    public SubjectAllocation addAllocation(@RequestBody SubjectAllocation allocation) {
        return allocationService.addAllocation(allocation);
    }

    @PutMapping("/{id}")
    public SubjectAllocation updateAllocation(@RequestBody SubjectAllocation allocation, @PathVariable int id) {
        return allocationService.updateAllocation(allocation, id);
    }

    @DeleteMapping("/{id}")
    public String deleteAllocation(@PathVariable int id) {
        allocationService.deleteAllocation(id);
        return "Allocation deleted successfully";
    }
}