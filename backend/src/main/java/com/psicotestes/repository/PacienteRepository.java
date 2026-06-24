package com.psicotestes.repository;

import com.psicotestes.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    // Para validação de unicidade na hora de cadastrar/editar
    Optional<Paciente> findByCpfAndPsicologoId(String cpf, Long psicologoId);
    Optional<Paciente> findByEmailAndPsicologoId(String email, Long psicologoId);

    // Essencial para o psicólogo ver apenas a sua listagem de pacientes
    List<Paciente> findByPsicologoId(Long psicologoId);

    // Para facilitar a busca de um paciente específico na tela
    List<Paciente> findByPsicologoIdAndNomeContainingIgnoreCase(Long psicologoId, String nome);

    // Para facilitar a listagem de pacientes ativos e inativos
    List<Paciente> findByPsicologoIdAndAtivo(Long psicologoId, Boolean ativo);
}