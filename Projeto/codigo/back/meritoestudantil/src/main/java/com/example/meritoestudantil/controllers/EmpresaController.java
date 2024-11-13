package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.repositories.EmpresaRepository;
import com.example.meritoestudantil.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enterprise")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;
    private EmpresaRepository empresaRepository;


    @PostMapping("/salvar")
    public ResponseEntity<?> salvarEmpresa(@RequestBody Empresa empresaParceira) throws Exception {
        try {
            empresaService.salvarEmpresa(empresaParceira);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(null);
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
    @GetMapping("/listar")
    public List<Empresa> listarEmpresas() {
        return empresaRepository.findAll();
    }
}
