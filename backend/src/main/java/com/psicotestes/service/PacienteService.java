package com.psicotestes.service;

import com.psicotestes.dto.PacienteRequestDTO;
import com.psicotestes.dto.PacienteResponseDTO;
import com.psicotestes.model.Paciente;
import com.psicotestes.model.Usuario;
import com.psicotestes.repository.PacienteRepository;
import com.psicotestes.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    // Usado na integração por IA, retorna uma entidade mas não é manipulado pelo frontend
    @Transactional
    public Paciente buscarPorId(Long idPaciente) {
        return pacienteRepository.findById(idPaciente).orElseThrow(() -> new RuntimeException("Paciente não encontrado."));
    }

    @Transactional
    public PacienteResponseDTO salvar(PacienteRequestDTO dto) {
        if (pacienteRepository.findByCpf(dto.cpf()).isPresent()) {
            throw new RuntimeException("Já existe um paciente cadastrado com este CPF.");
        }

        if (pacienteRepository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("Já existe um paciente cadastrado com este email.");
        }

        Usuario psicologo = usuarioRepository.findById(dto.psicologoId())
                .orElseThrow(() -> new RuntimeException("Psicólogo não encontrado."));

        String cpfFormatado = dto.cpf().trim().replace("-", "").replace(".","");

        Paciente paciente = Paciente.builder()
                .nome(dto.nome())
                .cpf(cpfFormatado)
                .email(dto.email())
                .psicologo(psicologo)
                .ativo(true)
                .deletado(false)
                .build();

        return new PacienteResponseDTO(pacienteRepository.save(paciente));
    }

    @Transactional(readOnly = true)
    public List<PacienteResponseDTO> listarPorPsicologo(Long psicologoId, Boolean ativo) {
        return pacienteRepository.findByPsicologoIdAndAtivo(psicologoId, ativo)
                .stream()
                .map(paciente -> new PacienteResponseDTO(paciente))
                .toList();
    }

    @Transactional
    public PacienteResponseDTO atualizar(Long id, PacienteRequestDTO dto) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

        // Só lança erro se o CPF mudou E o novo CPF já existe no banco
        if (!paciente.getCpf().equals(dto.cpf()) && pacienteRepository.findByCpf(dto.cpf()).isPresent()) {
            throw new RuntimeException("Este CPF já está em uso por outro paciente.");
        }

        // Só lança erro se o email mudou E o novo email já existe no banco
        if (!paciente.getEmail().equals(dto.email()) && pacienteRepository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("Este email já está em uso por outro paciente.");
        }

        Usuario psicologo = usuarioRepository.findById(dto.psicologoId())
                .orElseThrow(() -> new RuntimeException("Psicólogo não encontrado."));

        paciente.setNome(dto.nome());
        paciente.setCpf(dto.cpf());
        paciente.setEmail(dto.email());
        paciente.setPsicologo(psicologo);

        return new PacienteResponseDTO(pacienteRepository.save(paciente));
    }

    @Transactional
    public PacienteResponseDTO alternarStatus(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

        paciente.setAtivo(!paciente.getAtivo());
        return new PacienteResponseDTO(paciente);
    }

    @Transactional
    public void remover(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado.");
        }
        pacienteRepository.deleteById(id);
    }

    @Transactional
    public void salvarAnaliseIa(Long pacienteId, String analiseIa) {
        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));
        paciente.setAnaliseIa(analiseIa);
        pacienteRepository.save(paciente);
    }
}
