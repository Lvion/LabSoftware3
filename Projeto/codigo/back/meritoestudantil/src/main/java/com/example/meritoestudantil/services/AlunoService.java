package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.models.Instituicao;
import com.example.meritoestudantil.repositories.AlunoRepository;
import com.example.meritoestudantil.repositories.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private InstituicaoRepository instituicaoRepository;

    public Aluno salvarAluno(Aluno aluno, String instituicaoId) {
        // Busca a instituição pelo ID
        Instituicao instituicao = instituicaoRepository.findByNome(instituicaoId)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada com o ID: " + instituicaoId));

        // Define a instituição no aluno
        aluno.setInstituicao(instituicao);

        // Salva o aluno
        return alunoRepository.save(aluno);
    }
    public Aluno validarLogin(String email, String password) {
        Aluno aluno = alunoRepository.findByEmail(email);
        if (aluno != null && aluno.getSenha().equals(password)) {
            return aluno;
        }
        return null;
    }
}
