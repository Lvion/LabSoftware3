package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.repositories.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public Empresa salvarEmpresa(Empresa empresaParceira) {
        return empresaRepository.save(empresaParceira);
    }
    public Empresa validarLogin(String email, String password) {
        Optional<Empresa> empresaOpt = empresaRepository.findByEmail(email);

        if (empresaOpt.isPresent()) {
            Empresa empresa = empresaOpt.get();
            if (empresa.getSenha().equals(password)) {
                return empresa;
            }
        }

        return null;
    }
    public Empresa updateEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }
    public Empresa updateEmpresaByEmail(Empresa empresa) {
        System.out.println(empresa+"dentro do service empresa 1");

        Optional<Empresa> existingEmpresa = empresaRepository.findByEmail(empresa.getEmail());

        if (existingEmpresa.isPresent()) {
            Empresa updatedEmpresa = existingEmpresa.get();
            updatedEmpresa.setNome(empresa.getNome());
            updatedEmpresa.setEmail(empresa.getEmail());
            System.out.println(updatedEmpresa+"dentro do service updatedempresa 2");

            System.out.println(empresa+"dentro do service empresa 3");

            if (empresa.getSenha() != null && !empresa.getSenha().isEmpty()) {
                updatedEmpresa.setSenha(empresa.getSenha());
            }
            return empresaRepository.save(updatedEmpresa);
        } else {
            return null;
        }
    }
    public boolean deleteEmpresaByEmail(String email) {
        Optional<Empresa> empresaOptional = empresaRepository.findByEmail(email);
        if (empresaOptional.isPresent()) {
            empresaRepository.delete(empresaOptional.get());
            return true;
        } else {
            return false;
        }
    }
}
