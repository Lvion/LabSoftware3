package com.example.meritoestudantil.repositories;

import com.example.meritoestudantil.models.Instituicao;
import com.example.meritoestudantil.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByEmail(String email);


}
