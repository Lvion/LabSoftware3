package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.TransacaoVantagem;
import com.example.meritoestudantil.services.TransacaoVantagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vantagens/transacoes")
public class TransacaoVantagemController {

    @Autowired
    private TransacaoVantagemService transacaoVantagemService;

    @PostMapping("/comprar")
    public ResponseEntity<String> comprarVantagem(@RequestBody Map<String, Object> request) {
        try {
            String alunoEmail = (String) request.get("alunoEmail");
            Long vantagemId = Long.parseLong(request.get("vantagemId").toString());

            String resultado = transacaoVantagemService.comprarVantagem(alunoEmail, vantagemId);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao processar a compra: " + e.getMessage());
        }
    }


        @GetMapping("/extrato")
        public ResponseEntity<List<TransacaoVantagem>> listarTransacoesPorAluno(@RequestParam String email) {
            try {
                List<TransacaoVantagem> transacoes = transacaoVantagemService.listarTransacoesPorAluno(email);
                return ResponseEntity.ok(transacoes);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
    }

