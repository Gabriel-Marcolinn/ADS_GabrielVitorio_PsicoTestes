package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name="alternativas")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alternativa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alternativa", nullable = false)
    private String alternativa;

    @Column(name = "pontuacao", nullable = false)
    private Double pontuacao;

    @ManyToOne
    @JoinColumn(name = "pergunta_id", nullable = false)
    private Pergunta pergunta;
}
