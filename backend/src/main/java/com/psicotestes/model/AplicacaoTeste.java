package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aplicacoes_testes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AplicacaoTeste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double pontuacaoTotal;

    @Column(nullable = false)
    private String classificacao;

    @Column(name = "analise_ia",columnDefinition = "TEXT")
    private String analiseIa;

    @Column(name="laudo", columnDefinition = "TEXT")
    private String laudo;

    @Builder.Default
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataAplicacao = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teste_id", nullable = false)
    private Teste teste;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Relacionamento com as respostas. O CascadeType.ALL permite salvar a aplicação
    // e todas as respostas filhas em um único .save() no repositório.
    @ToString.Exclude
    @Builder.Default
    @OneToMany(mappedBy = "aplicacaoTeste", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RespostaAplicacao> respostas = new ArrayList<>();

    // Método auxiliar para garantir a sincronia do relacionamento bidirecional
    public void adicionarResposta(Alternativa alternativa) {
        RespostaAplicacao resposta = RespostaAplicacao.builder()
                .aplicacaoTeste(this)
                .alternativa(alternativa)
                .build();
        this.respostas.add(resposta);
    }
}