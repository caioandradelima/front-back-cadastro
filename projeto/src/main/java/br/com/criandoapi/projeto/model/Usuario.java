package br.com.criandoapi.projeto.model;

import jakarta.persistence.*;


@Entity
@Table (name="alunos")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name="id")
    private Integer id;
    @Column(name="nome", length=100 , nullable = true)
    private String nome;
    @Column(name="idade")
    private Integer idade ;
    @Column(name="profissao", length=100 , nullable = true)
    private String profissao;
    @Column(name="sexo", length=10 , nullable = true)
    private String sexo;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
}
