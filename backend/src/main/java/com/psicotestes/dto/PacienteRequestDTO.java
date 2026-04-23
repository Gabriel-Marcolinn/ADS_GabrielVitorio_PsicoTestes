package com.psicotestes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

public record PacienteRequestDTO(
        @NotBlank(message = "O nome é obrigatório.")
        String nome,

        @NotBlank(message = "O CPF é obrigatório.")
        @CPF(message = "CPF inválido.")
        String cpf,

        @NotBlank(message = "O E-mail é obrigatório.")
        @Email(message = "E-mail inválido.")
        String email,

        @NotNull(message = "O ID do psicólogo responsável é obrigatório.")
        Long psicologoId
) {}