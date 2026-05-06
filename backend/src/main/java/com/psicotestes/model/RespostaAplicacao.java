package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "respostas_aplicacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RespostaAplicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aplicacao_teste_id", nullable = false)
    private AplicacaoTeste aplicacaoTeste;

    // Armazena exatamente qual alternativa foi escolhida pelo paciente nesta aplicação
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alternativa_id", nullable = false)
    private Alternativa alternativa;
}