package com.example.demo.repository;

import com.example.demo.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarksRepository extends JpaRepository<Marks, Integer> {
    List<Marks> findByStudentId(Integer studentId);
    List<Marks> findByTestId(Integer testId);
}