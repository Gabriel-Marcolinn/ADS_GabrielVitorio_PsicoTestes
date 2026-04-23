package com.psicotestes.model;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import lombok.*;

import java.util.List;

@Table(name="empresas")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 1. Quando o Spring tentar deletar, ele vai rodar esse UPDATE em vez do DELETE real
@SQLDelete(sql = "UPDATE empresas SET deletado = true WHERE id = ?")
// 2. Toda vez que o Spring fizer um SELECT, ele vai adicionar "AND deletado = false" automaticamente!
@SQLRestriction("deletado = false")
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj", nullable = false)
    private String cnpj;

    @Column(name = "razao_social", nullable = false)
    private String razaoSocial;

    @Builder.Default
    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    @Builder.Default
    @Column(name = "deletado", nullable = false)
    private Boolean deletado = false;

    @ToString.Exclude
    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuarios;

    public Empresa(String razaoSocial, String cnpj) {
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.ativo = true;
        this.deletado = false;
    }
}
