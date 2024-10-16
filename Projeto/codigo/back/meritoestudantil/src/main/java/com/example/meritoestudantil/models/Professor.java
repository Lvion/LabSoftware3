package com.example.meritoestudantil.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String departamento;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;
    @OneToMany(mappedBy = "professor")
    private List<Transacao> transacoes;


}
