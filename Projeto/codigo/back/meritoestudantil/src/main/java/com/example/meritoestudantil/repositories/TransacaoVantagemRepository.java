package com.example.meritoestudantil.repositories;

import com.example.meritoestudantil.models.TransacaoVantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoVantagemRepository extends JpaRepository<TransacaoVantagem, Long> {
    List<TransacaoVantagem> findByAlunoEmail(String email);

}
