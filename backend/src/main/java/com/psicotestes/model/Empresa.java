package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="empresas")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj", nullable = false, unique = true)
    private String cnpj;

    @Column(name = "razao_social", nullable = false)
    private String razaoSocial;

    @ToString.Exclude
    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuarios;

    public Empresa(String razaoSocial, String cnpj) {
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
    }
}
