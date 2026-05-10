package com.psicotestes.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name="usuarios")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE usuarios SET deletado = true WHERE id = ?")
@SQLRestriction("deletado = false")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "tipo", nullable = false, length = 2)
    private String tipo;

    @Column(name = "ativo", nullable = false)
    @Builder.Default
    private Boolean ativo = true;

    @Column(name = "deletado", nullable = false)
    @Builder.Default
    private Boolean deletado = false;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @ToString.Exclude
    @OneToMany(mappedBy = "psicologo")
    private List<Paciente> pacientes;

    // =======================================================================
    // MÉTODOS OBRIGATÓRIOS DA INTERFACE USERDETAILS DO SPRING SECURITY
    // =======================================================================

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Converte os nossos tipos (DVP) em Roles que o Spring entende
        if (this.tipo.equals("AD")) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else if (this.tipo.equals("PA")) {
            return List.of(new SimpleGrantedAuthority("ROLE_PSICOLOGO_ADMIN"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_PSICOLOGO"));
        }
    }

    @Override
    public String getUsername() {
        return this.email; // Diz ao Spring que o login é feito pelo email
    }

    @Override
    public String getPassword() {
        return this.senha; // Diz ao Spring onde está a senha
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.ativo; // Bloqueia o login automaticamente se ativo = false
    }
}
