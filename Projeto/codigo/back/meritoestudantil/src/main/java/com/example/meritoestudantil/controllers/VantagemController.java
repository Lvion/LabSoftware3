package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Professor;
import com.example.meritoestudantil.models.Vantagem;
import com.example.meritoestudantil.repositories.VantagemRepository;
import com.example.meritoestudantil.services.VantagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vantagens")
public class VantagemController {

    @Autowired
    private VantagemService vantagemService;

    @Autowired
    private VantagemRepository vantagemRepository;


    @PostMapping("/registrar")
    public ResponseEntity<String> registrarVantagem(@RequestBody Vantagem vantagem, @RequestParam Long empresaId) {
        vantagemService.salvarVantagem(empresaId, vantagem);
        return ResponseEntity.ok("Vantagem registrada com sucesso!");
    }
    @GetMapping("/listar")
    public List<Vantagem> listarVantagens() {
        return vantagemRepository.findAll();
    }
}
