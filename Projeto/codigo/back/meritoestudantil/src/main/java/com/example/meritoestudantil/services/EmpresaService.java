package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.repositories.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public Empresa salvarEmpresa(Empresa empresaParceira) {
        return empresaRepository.save(empresaParceira);
    }
    public Empresa validarLogin(String email, String password) {
        Empresa empresa = empresaRepository.findByEmail(email);
        if (empresa != null && empresa.getSenha().equals(password)) {
            return empresa;
        }
        return null;
    }
}
