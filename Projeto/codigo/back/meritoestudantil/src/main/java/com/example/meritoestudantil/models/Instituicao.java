package com.example.meritoestudantil.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Instituicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("nome")
    private String nome;
    @JsonProperty("endereco")
    private String endereco;

    @OneToMany(mappedBy = "instituicao")
    private List<Aluno> alunos;

    @OneToMany(mappedBy = "instituicao")
    private List<Professor> professores;

    @OneToMany(mappedBy = "instituicao")
    private List<Departamento> departamentos;


}
