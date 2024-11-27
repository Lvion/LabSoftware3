package com.example.meritoestudantil.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("data")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date data;

    @JsonProperty("quantidadeMoedas")
    private int quantidadeMoedas;

    @JsonProperty("descricao")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_transacao")
    private TipoTransacao tipoTransacao;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    @JsonBackReference
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = true) // Opcional para COMPRA_BENEFICIO
    private Professor professor;



    @ManyToOne
    @JoinColumn(name = "vantagem_id", nullable = true) // Opcional para TRANSFERENCIA
    private Vantagem vantagem;

    @JsonProperty("nomeProfessor")
    public String getNomeProfessor() {
        return professor != null ? professor.getNome() : null;
    }

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

    public TipoTransacao getTipoTransacao() {
        return tipoTransacao;
    }

    public void setTipoTransacao(TipoTransacao tipoTransacao) {
        this.tipoTransacao = tipoTransacao;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }




    public Vantagem getVantagem() {
        return vantagem;
    }

    public void setVantagem(Vantagem vantagem) {
        this.vantagem = vantagem;
    }
}
