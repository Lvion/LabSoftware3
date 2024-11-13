package com.example.meritoestudantil.repositories;

import com.example.meritoestudantil.models.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}
