package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Professor;
import com.example.meritoestudantil.models.Vantagem;
import com.example.meritoestudantil.repositories.VantagemRepository;
import com.example.meritoestudantil.services.VantagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/vantagens")
public class VantagemController {

    @Autowired
    private VantagemService vantagemService;

    @Autowired
    private VantagemRepository vantagemRepository;


    @PostMapping(value = "/registrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registrarVantagem(
            @RequestParam("nome") String nome,
            @RequestParam("descricao") String descricao,
            @RequestParam("custoEmMoedas") int custoEmMoedas,
            @RequestParam("empresaId") Long empresaId,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem) {
        try {
            // Cria uma nova instância de Vantagem com os dados recebidos
            Vantagem vantagem = new Vantagem();
            vantagem.setNome(nome);
            vantagem.setDescricao(descricao);
            vantagem.setCustoEmMoedas(custoEmMoedas);

            if (imagem != null && !imagem.isEmpty()) {
                vantagem.setImagem(imagem.getBytes());
            }

            // Chama o serviço para salvar a vantagem
            vantagemService.salvarVantagem(empresaId, vantagem);
            return ResponseEntity.ok("Vantagem registrada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao registrar vantagem: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public List<Vantagem> listarVantagens() {
        return vantagemRepository.findAll();
    }
}
