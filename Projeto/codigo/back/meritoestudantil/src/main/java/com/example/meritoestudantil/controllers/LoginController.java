package com.example.meritoestudantil.controllers;

import java.util.Map;

import com.example.meritoestudantil.models.Professor;
import com.example.meritoestudantil.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.models.Empresa;
import com.example.meritoestudantil.services.AlunoService;
import com.example.meritoestudantil.services.EmpresaService;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ProfessorService professorService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String userType = loginRequest.getUserType();

        if ("student".equals(userType)) {
            Aluno aluno = alunoService.validarLogin(loginRequest.getEmail(), loginRequest.getPassword());
            if (aluno != null) {
                return ResponseEntity.ok().body(Map.of("userType", 1, "data", aluno));
            }
        } else if ("enterprise".equals(userType)) {
            Empresa empresa = empresaService.validarLogin(loginRequest.getEmail(), loginRequest.getPassword());
            if (empresa != null) {
                return ResponseEntity.ok().body(Map.of("userType", 2, "data", empresa));
            }
        } else if ("professor".equals(userType)) {
            Professor professor = professorService.validarLogin(loginRequest.getEmail(), loginRequest.getPassword());
            if (professor != null) {
                return ResponseEntity.ok().body(Map.of("userType", 3, "data", professor));
            }
        }

        return ResponseEntity.status(401).body("{ \"error\": \"Credenciais inválidas\" }");
    }
}