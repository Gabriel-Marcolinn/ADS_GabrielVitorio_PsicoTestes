package com.psicotestes.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record AplicacaoRequestDTO(

        @NotNull(message = "O ID do paciente é obrigatório.")
        Long pacienteId,

        @NotNull(message = "O ID do teste é obrigatório.")
        Long testeId,

        // O React envia apenas um array numérico com os IDs das alternativas que o paciente clicou
        @NotEmpty(message = "A lista de respostas não pode estar vazia.")
        List<Long> alternativasIds
) {}