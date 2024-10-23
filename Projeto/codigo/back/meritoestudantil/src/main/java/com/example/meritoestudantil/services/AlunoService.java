package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.models.Instituicao;
import com.example.meritoestudantil.repositories.AlunoRepository;
import com.example.meritoestudantil.repositories.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private InstituicaoRepository instituicaoRepository;

    public Aluno salvarAluno(Aluno aluno, String instituicaoId) {
        Instituicao instituicao = instituicaoRepository.findByNome(instituicaoId)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada com o ID: " + instituicaoId));


        aluno.setInstituicao(instituicao);

        return alunoRepository.save(aluno);
    }
    public Aluno validarLogin(String email, String password) {
        Optional<Aluno> alunoOpt = alunoRepository.findByEmail(email);

        if (alunoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            if (aluno.getSenha().equals(password)) {
                return aluno;
            }
        }

        return null;
    }
    public Aluno updateAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }
    public Aluno updateAlunoByEmail(Aluno aluno) {
        Optional<Aluno> existingAluno = alunoRepository.findByEmail(aluno.getEmail());

        if (existingAluno.isPresent()) {
            Aluno updatedAluno = existingAluno.get();
            updatedAluno.setNome(aluno.getNome());
            updatedAluno.setEmail(aluno.getEmail());


            if (aluno.getSenha() != null && !aluno.getSenha().isEmpty()) {
                updatedAluno.setSenha(aluno.getSenha());
            }
            return alunoRepository.save(updatedAluno);
        } else {
            return null;
        }
    }
    public boolean deleteAlunoByEmail(String email) {
        Optional<Aluno> alunoOptional = alunoRepository.findByEmail(email);
        if (alunoOptional.isPresent()) {
            alunoRepository.delete(alunoOptional.get());
            return true;
        } else {
            return false;
        }
    }
}
