package com.example.meritoestudantil.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("email")
    private String email;

    @JsonProperty("cpf")
    private String cpf;

    public String getSenha() {
        return senha;
    }

    @JsonProperty("rg")
    private String rg;

    @JsonProperty("endereco")
    private String endereco;

    @JsonProperty("curso")
    private String curso;

    @JsonProperty("senha")
    private String senha;

    @JsonProperty("saldoMoedas")
    private Integer saldoMoedas;



    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @OneToMany(mappedBy = "aluno")
    private List<Transacao> transacoes;

    public void setInstituicao(Instituicao instituicao) {
        this.instituicao = instituicao;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setSaldoMoedas(Integer saldoMoedas) {
        this.saldoMoedas = saldoMoedas;
    }

    public void setTransacoes(List<Transacao> transacoes) {
        this.transacoes = transacoes;
    }
}
