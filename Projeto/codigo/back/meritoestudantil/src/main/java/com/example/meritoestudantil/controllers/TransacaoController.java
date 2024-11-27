package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.TipoTransacao;
import com.example.meritoestudantil.services.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
            String descricao = (String) request.get("descricao");
            TipoTransacao tipoTransacao = TipoTransacao.valueOf(request.get("tipoTransacao").toString().toUpperCase());

            String resultado = transacaoService.transferirMoedas(professorEmail, alunoId, quantidadeMoedas, descricao, tipoTransacao);
            if ("Transferência realizada com sucesso.".equals(resultado)) {
                return ResponseEntity.ok(resultado);
            } else {
                return ResponseEntity.badRequest().body(resultado);
            }
        } catch (ClassCastException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erro nos parâmetros: " + e.getMessage());



        }
    }
    @PostMapping("/comprar-beneficio")
    public ResponseEntity<?> comprarBeneficio(@RequestBody Map<String, Object> request) {
        try {
            String alunoEmail = (String) request.get("alunoEmail");
            if (alunoEmail == null || alunoEmail.trim().isEmpty()) {
                throw new IllegalArgumentException("Email do aluno não pode estar vazio.");
            }

            Object beneficioIdObj = request.get("beneficioId");
            if (beneficioIdObj == null) {
                throw new IllegalArgumentException("ID do benefício não pode ser nulo.");
            }
            Long beneficioId = Long.parseLong(beneficioIdObj.toString());

            String resultado = transacaoService.comprarBeneficio(alunoEmail, beneficioId);
            if ("Compra realizada com sucesso.".equals(resultado)) {
                return ResponseEntity.ok(resultado);
            } else {
                return ResponseEntity.badRequest().body(resultado);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erro ao processar a compra: " + e.getMessage());
        }
    }



}
