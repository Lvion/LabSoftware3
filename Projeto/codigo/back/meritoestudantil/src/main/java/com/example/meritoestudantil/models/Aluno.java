package com.example.meritoestudantil.models;

import jakarta.persistence.*;
import java.util.List;
import com.example.meritoestudantil.models.Transacao;
import com.example.meritoestudantil.models.Instituicao;

@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private String curso;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @OneToMany(mappedBy = "aluno")
    private List<Transacao> transacoes;


}
