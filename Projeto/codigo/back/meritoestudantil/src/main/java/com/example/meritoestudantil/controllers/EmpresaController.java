package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/salvar")
    public Empresa salvarEmpresa(@RequestBody Empresa empresaParceira) {
        return empresaService.salvarEmpresa(empresaParceira);
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateEmpresa(@RequestBody Empresa empresa) {

        Empresa updatedEmpresa = empresaService.updateEmpresaByEmail(empresa);
        if (updatedEmpresa != null) {
            return ResponseEntity.ok("Dados da empresa atualizados com sucesso!");
        } else {
            return ResponseEntity.status(400).body("Erro ao atualizar dados da empresa. Email não encontrado.");
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteEmpresa(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        boolean isDeleted = empresaService.deleteEmpresaByEmail(email);

        if (isDeleted) {
            return ResponseEntity.ok("Empresa excluída com sucesso.");
        } else {
            return ResponseEntity.status(404).body("Erro ao excluir empresa. Empresa não encontrada.");
        }
    }
}
