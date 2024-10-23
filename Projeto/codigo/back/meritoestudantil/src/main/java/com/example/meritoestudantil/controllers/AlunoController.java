package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping("/salvar")
    public Aluno salvarAluno(@RequestBody Map<String, Object> alunoPayload) {
        String instituicaoId = alunoPayload.get("instituicaoId").toString();

        Aluno aluno = new Aluno();
        aluno.setNome(alunoPayload.get("nome").toString());
        aluno.setCpf(alunoPayload.get("cpf").toString());
        aluno.setRg(alunoPayload.get("rg").toString());
        aluno.setCurso(alunoPayload.get("curso").toString());
        aluno.setEmail(alunoPayload.get("email").toString());
        aluno.setSenha(alunoPayload.get("senha").toString());
        aluno.setEndereco(alunoPayload.get("endereco").toString());

        return alunoService.salvarAluno(aluno, instituicaoId);
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateAluno(@RequestBody Aluno aluno) {
        Aluno updatedAluno = alunoService.updateAlunoByEmail(aluno);
        if (updatedAluno != null) {
            return ResponseEntity.ok("Dados do aluno atualizados com sucesso!");
        } else {
            return ResponseEntity.status(400).body("Erro ao atualizar dados do aluno. Email não encontrado.");
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAluno(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        boolean isDeleted = alunoService.deleteAlunoByEmail(email);

        if (isDeleted) {
            return ResponseEntity.ok("Aluno excluído com sucesso.");
        } else {
            return ResponseEntity.status(404).body("Erro ao excluir aluno. Aluno não encontrado.");
        }
    }
}
