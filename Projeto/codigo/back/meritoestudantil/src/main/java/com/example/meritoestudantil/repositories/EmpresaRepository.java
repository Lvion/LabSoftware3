package com.example.meritoestudantil.repositories;

import com.example.meritoestudantil.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Empresa findByEmail(String email);

}
