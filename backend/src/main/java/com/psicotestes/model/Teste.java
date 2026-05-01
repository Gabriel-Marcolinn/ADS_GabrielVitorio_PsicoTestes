package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="testes")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @ToString.Exclude
    @OneToMany(mappedBy = "teste", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pergunta> perguntas;
}
