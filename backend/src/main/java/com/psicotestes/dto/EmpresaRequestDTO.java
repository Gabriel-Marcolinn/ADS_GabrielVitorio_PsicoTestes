package com.psicotestes.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CNPJ;

// DTO de Entrada (O que o React envia ao cadastrar uma clínica)
// Não pedimos o ID, pois é o banco que gera!
public record EmpresaRequestDTO(
        @NotBlank(message = "A Razão Social é obrigatória")
        String razaoSocial,

        @NotBlank(message = "O CNPJ é obrigatório")
        @CNPJ(message = "Formato de CNPJ inválido") // O Spring já valida se o CNPJ é real!
        String cnpj
) {}