package com.example.meritoestudantil.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class TransacaoVantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("data")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date data;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = true)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "vantagem_id", nullable = true)
    private Vantagem vantagem;

    @Column(name = "quantidade_moedas", nullable = true)
    private int quantidadeMoedas;

    @Column(name = "descricao", nullable = true)
    private String descricao;

    @Column(name = "codigo_confirmacao", nullable = true, unique = true)
    private String codigoConfirmacao;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Vantagem getVantagem() {
        return vantagem;
    }

    public void setVantagem(Vantagem vantagem) {
        this.vantagem = vantagem;
    }

    public int getQuantidadeMoedas() {
        return quantidadeMoedas;
    }

    public void setQuantidadeMoedas(int quantidadeMoedas) {
        this.quantidadeMoedas = quantidadeMoedas;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCodigoConfirmacao() {
        return codigoConfirmacao;
    }

    public void setCodigoConfirmacao(String codigoConfirmacao) {
        this.codigoConfirmacao = codigoConfirmacao;
    }
}
