package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Professor;
import com.example.meritoestudantil.repositories.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor validarLogin(String email, String password) {
        Optional<Professor> professorOpt = professorRepository.findByEmail(email);

        if (professorOpt.isPresent()) {
            Professor professor = professorOpt.get();
            if (professor.getSenha().equals(password)) {
                return professor;
            }
        }

        return null;
    }

    public Professor salvarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }


}
