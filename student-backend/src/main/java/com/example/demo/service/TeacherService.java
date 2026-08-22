package com.example.demo.service;

import com.example.demo.entity.Teacher;
import com.example.demo.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository repo;

    public List<Teacher> getAllTeachers() {
        return repo.findAll();
    }

    public Teacher getTeacher(int id) {
        return repo.findById(id).orElse(null);
    }

    public Teacher addTeacher(Teacher teacher) {
        return repo.save(teacher);
    }

    public Teacher updateTeacher(Teacher teacher, int id) {
        teacher.setId(id);
        return repo.save(teacher);
    }

    public void deleteTeacher(int id) {
        repo.deleteById(id);
    }
}