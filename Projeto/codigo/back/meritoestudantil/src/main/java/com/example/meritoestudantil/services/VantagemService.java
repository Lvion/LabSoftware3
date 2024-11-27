package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.models.Vantagem;
import com.example.meritoestudantil.repositories.EmpresaRepository;
import com.example.meritoestudantil.repositories.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VantagemService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    public void salvarVantagem(Long empresaId, Vantagem vantagem) {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada."));
        vantagem.setEmpresa(empresa);
        vantagemRepository.save(vantagem);
    }

}
