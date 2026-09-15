package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTests {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @Test
    void getAllStudentDetails_returnsListOfStudents() {
        // Arrange: fake data the mock repository will return
        Student s1 = new Student(1, "Akash", "CSE");
        Student s2 = new Student(2, "Priya", "ECE");
        when(studentRepository.findAll()).thenReturn(Arrays.asList(s1, s2));

        // Act
        List<Student> result = studentService.getAllStudentDetails();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Akash", result.get(0).getName());
        verify(studentRepository, times(1)).findAll();
    }

    @Test
    void getStudentDetails_returnsStudent_whenIdExists() {
        Student student = new Student(1, "Akash", "CSE");
        when(studentRepository.findById(1)).thenReturn(Optional.of(student));

        Student result = studentService.getStudentDetails(1);

        assertNotNull(result);
        assertEquals("Akash", result.getName());
        assertEquals("CSE", result.getBranch());
    }

    @Test
    void getStudentDetails_returnsNull_whenIdDoesNotExist() {
        when(studentRepository.findById(99)).thenReturn(Optional.empty());

        Student result = studentService.getStudentDetails(99);

        assertNull(result);
    }

    @Test
    void addStudentDetails_savesAndReturnsStudent() {
        Student newStudent = new Student(null, "Rahul", "ME");
        Student savedStudent = new Student(3, "Rahul", "ME");
        when(studentRepository.save(newStudent)).thenReturn(savedStudent);

        Student result = studentService.addStudentDetails(newStudent);

        assertNotNull(result.getId());
        assertEquals(3, result.getId());
        assertEquals("Rahul", result.getName());
        verify(studentRepository, times(1)).save(newStudent);
    }

    @Test
    void updateStudentDetails_updatesIdAndSaves() {
        Student updatedData = new Student(null, "Akash Updated", "IT");
        Student savedStudent = new Student(1, "Akash Updated", "IT");
        when(studentRepository.save(any(Student.class))).thenReturn(savedStudent);

        Student result = studentService.updateStudentDetails(updatedData, 1);

        assertEquals(1, result.getId());
        assertEquals("Akash Updated", result.getName());
        assertEquals("IT", result.getBranch());
    }

    @Test
    void deleteStudentDetails_callsRepositoryDeleteById() {
        studentService.deleteStudentDetails(1);

        verify(studentRepository, times(1)).deleteById(1);
    }
}