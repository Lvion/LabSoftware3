package com.example.meritoestudantil.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("email")
    private String email;

    @JsonProperty("senha")
    private String senha;

    public String getSenha() {
        return senha;
    }

    @OneToMany(mappedBy = "empresa")
    private List<Vantagem> vantagens;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Vantagem> getVantagens() {
        return vantagens;
    }

    public void setVantagens(List<Vantagem> vantagens) {
        this.vantagens = vantagens;
    }
}
