package com.psicotestes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestDTO(
        @NotBlank(message = "O nome é obrigatório.")
        String nome,

        @NotBlank(message = "O e-mail é obrigatório.")
        @Email(message = "Formato de e-mail inválido.")
        String email,

        @NotBlank(message = "A senha é obrigatória.")
        String senha,

        @NotBlank(message = "O tipo de usuário é obrigatório (AD, PA ou PS).")
        String tipo,

        @NotNull(message = "O ID da empresa é obrigatório.")
        Long empresaId
) {}