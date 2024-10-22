package com.example.meritoestudantil.controllers;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.services.AlunoService;
import com.example.meritoestudantil.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String userType = loginRequest.getUserType();

        if ("student".equals(userType)) {
            Aluno aluno = alunoService.validarLogin(loginRequest.getEmail(), loginRequest.getPassword());
            System.out.println(aluno+"estive aqui rodando aluno 1");
            if (aluno != null) {
                return ResponseEntity.ok().body("{ \"message\": \"Login realizado com sucesso\" }");
            }
        } else if ("enterprise".equals(userType)) {

            Empresa empresa = empresaService.validarLogin(loginRequest.getEmail(), loginRequest.getPassword());
            System.out.println(empresa+"estive aqui rodando empresa 1");

            if (empresa != null) {
                return ResponseEntity.ok().body("{ \"message\": \"Login realizado com sucesso\" }");
            }
        }

        return ResponseEntity.status(401).body("{ \"error\": \"Credenciais inválidas\" }");
    }
}
