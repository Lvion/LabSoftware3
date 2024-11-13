package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.repositories.AlunoRepository;
import com.example.meritoestudantil.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private AlunoRepository alunoRepository;


    @PostMapping("/salvar")
    public ResponseEntity<?> salvarAluno(@RequestBody Map<String, Object> alunoPayload) {
        try {
            String instituicaoId = alunoPayload.get("instituicaoId").toString();

            Aluno aluno = new Aluno();
            aluno.setNome(alunoPayload.get("nome").toString());
            aluno.setCpf(alunoPayload.get("cpf").toString());
            aluno.setRg(alunoPayload.get("rg").toString());
            aluno.setCurso(alunoPayload.get("curso").toString());
            aluno.setEmail(alunoPayload.get("email").toString());
            aluno.setSenha(alunoPayload.get("senha").toString());
            aluno.setEndereco(alunoPayload.get("endereco").toString());

            alunoService.salvarAluno(aluno, instituicaoId);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Aluno salvo com sucesso");
            responseBody.put("aluno", aluno);
            responseBody.put("status", HttpStatus.OK);

            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro ao salvar aluno.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
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
    @GetMapping("/listar")
    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }
}
