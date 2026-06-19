package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Table(name="pacientes")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE pacientes SET deletado = true WHERE id = ?")
@SQLRestriction("deletado = false")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpf", nullable = false)
    private String cpf;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "psicologo_id", nullable = false)
    private Usuario psicologo;

    @Column(name = "ativo", nullable = false)
    @Builder.Default
    private Boolean ativo = true;

    @Column(name = "deletado", nullable = false)
    @Builder.Default
    private Boolean deletado = false;

    @Column(name = "analise_ia",columnDefinition = "TEXT")
    private String analiseIa;
}
