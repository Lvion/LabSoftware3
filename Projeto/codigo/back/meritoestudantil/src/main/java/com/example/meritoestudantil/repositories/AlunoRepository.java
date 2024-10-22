package com.example.meritoestudantil.repositories;

import com.example.meritoestudantil.models.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    Aluno findByEmail(String email);

}
