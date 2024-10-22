package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping("/salvar")
    public Aluno salvarAluno(@RequestBody Map<String, Object> alunoPayload) {
        // Extrai os dados do payload
        String instituicaoId = alunoPayload.get("instituicaoId").toString();

        // Cria um objeto Aluno a partir do payload
        Aluno aluno = new Aluno();
        aluno.setNome(alunoPayload.get("nome").toString());
        aluno.setCpf(alunoPayload.get("cpf").toString());
        aluno.setRg(alunoPayload.get("rg").toString());
        aluno.setCurso(alunoPayload.get("curso").toString());
        aluno.setEmail(alunoPayload.get("email").toString());
        aluno.setSenha(alunoPayload.get("senha").toString());

        // Chama o serviço para salvar o aluno e retornar
        return alunoService.salvarAluno(aluno, instituicaoId);
    }
}
