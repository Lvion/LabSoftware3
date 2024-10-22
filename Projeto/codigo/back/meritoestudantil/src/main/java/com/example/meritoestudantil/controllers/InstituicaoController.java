package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Instituicao;
import com.example.meritoestudantil.services.InstituicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instituicao")
public class InstituicaoController {

    @Autowired
    private InstituicaoService instituicaoService;

    @GetMapping("/listar")
    public List<Instituicao> listarInstituicoes() {
        return instituicaoService.listarInstituicoes();
    }
    @GetMapping("/{id}")
    public Instituicao buscarInstituicaoPorId(@PathVariable Long id) {
        return instituicaoService.buscarPorId(id);
    }
    @PostMapping("/salvar")
    public Instituicao salvarInstituicao(@RequestBody Instituicao instituicao) {
        return instituicaoService.salvarInstituicao(instituicao);
    }
}
