package com.example.meritoestudantil.models;

import jakarta.persistence.*;

@Entity
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String foto;
    private int custoEmMoedas;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

}
