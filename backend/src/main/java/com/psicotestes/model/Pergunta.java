package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="perguntas")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pergunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pergunta", nullable = false)
    private String pergunta;

    @ManyToOne
    @JoinColumn(name = "teste_id", nullable = false)
    private Teste teste;

    @ToString.Exclude
    @OneToMany(mappedBy = "pergunta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Alternativa> alternativas;
}
