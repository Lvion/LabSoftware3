package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.services.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping("/transferir")
    public ResponseEntity<String> transferirMoedas(@RequestBody Map<String, Object> request) {
        try {
            String professorEmail = (String) request.get("professorEmail");
            Long alunoId = Long.parseLong(request.get("alunoId").toString());
            int quantidadeMoedas = Integer.parseInt(request.get("quantidadeMoedas").toString());
            String descricao = (String) request.get("descricao") != "" ? (String) request.get("descricao")
                    : "Transferência de moedas";

            String resultado = transacaoService.transferirMoedas(professorEmail, alunoId, quantidadeMoedas, descricao);
            if ("Transferência realizada com sucesso.".equals(resultado)) {
                return ResponseEntity.ok(resultado);
            } else {
                return ResponseEntity.badRequest().body(resultado);
            }
        } catch (ClassCastException | NumberFormatException e) {
            return ResponseEntity.badRequest().body("Erro na formatação dos parâmetros: " + e.getMessage());
        }
    }
}
