package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Professor;
import com.example.meritoestudantil.repositories.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class ProfessorController {
    @Autowired
    ProfessorRepository professorRepository;

    @GetMapping("/listar")
    public List<Professor> listarProfessores() {
        return professorRepository.findAll();
    }
}
