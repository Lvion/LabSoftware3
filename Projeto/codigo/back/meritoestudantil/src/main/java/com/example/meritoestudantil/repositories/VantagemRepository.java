package com.example.meritoestudantil.repositories;

import com.example.meritoestudantil.models.Vantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {
}
