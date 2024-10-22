package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaParceiraService;

    @PostMapping("/salvar")
    public Empresa salvarEmpresa(@RequestBody Empresa empresaParceira) {
        return empresaParceiraService.salvarEmpresa(empresaParceira);
    }
}
