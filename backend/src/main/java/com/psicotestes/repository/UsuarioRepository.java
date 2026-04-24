package com.psicotestes.repository;

import com.psicotestes.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Para validação de unicidade no cadastro e para realizar o login do usuário
    Optional<Usuario> findByEmail(String email);

    // Essencial para o psicólogo administrador ver apenas a listagem de usuários da sua empresa
    List<Usuario> findByEmpresaId(Long empresaId);

    // Para facilitar a listagem de usuários de uma empresa filtrando entre ativos e inativos
    List<Usuario> findByEmpresaIdAndAtivo(Long empresaId, Boolean ativo);

    // Para facilitar a busca global de um usuário pelo nome (uso exclusivo do Administrador geral)
    List<Usuario> findByNomeContainingIgnoreCase(String nome);

    // Para indicar se tem algum usuário cadastrado na empresa, impedindo a remoção da mesma caso sim
    Boolean existsByEmpresaId(Long empresaId);
}