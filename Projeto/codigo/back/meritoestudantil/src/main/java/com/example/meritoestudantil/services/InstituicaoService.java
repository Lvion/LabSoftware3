package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Instituicao;
import com.example.meritoestudantil.repositories.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituicaoService {

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    public List<Instituicao> listarInstituicoes() {
        return instituicaoRepository.findAll();
    }
    public Instituicao buscarPorId(Long id) {
        return instituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada com o ID: " + id));
    }
    public Instituicao salvarInstituicao(Instituicao instituicao) {
        return instituicaoRepository.save(instituicao);
    }
}
