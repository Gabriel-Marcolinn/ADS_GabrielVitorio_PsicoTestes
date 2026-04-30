package com.psicotestes.dto;

import com.psicotestes.model.Usuario;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        String tipo,
        Boolean ativo,
        Long empresaId
) {
    public UsuarioResponseDTO(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTipo(),
                usuario.getAtivo(),
                usuario.getEmpresa().getId()
        );
    }
}