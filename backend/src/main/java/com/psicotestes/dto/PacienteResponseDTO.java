package com.psicotestes.dto;

import com.psicotestes.model.Paciente;

public record PacienteResponseDTO(Long id, String nome, String cpf, String email, Boolean ativo, Long psicologoId, String analiseIa) {
    public PacienteResponseDTO(Paciente paciente) {
        this(
                paciente.getId(),
                paciente.getNome(),
                paciente.getCpf(),
                paciente.getEmail(),
                paciente.getAtivo(),
                paciente.getPsicologo().getId(),
                paciente.getAnaliseIa()
        );
    }
}