package com.psicotestes.repository;

import com.psicotestes.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    // Para validação de unicidade na hora de cadastrar/editar
    Optional<Paciente> findByCpfAndPsicologoIdOrderByNomeAsc(String cpf, Long psicologoId);
    Optional<Paciente> findByEmailAndPsicologoIdOrderByNomeAsc(String email, Long psicologoId);

    // Essencial para o psicólogo ver apenas a sua listagem de pacientes
    List<Paciente> findByPsicologoId(Long psicologoId);

    // Para facilitar a busca de um paciente específico na tela
    List<Paciente> findByPsicologoIdAndNomeContainingIgnoreCase(Long psicologoId, String nome);

    // Para facilitar a listagem de pacientes ativos e inativos
    List<Paciente> findByPsicologoIdAndAtivoOrderByNomeAsc(Long psicologoId, Boolean ativo);

    // Para listar todos os pacientes de uma empresa
    @Query("SELECT p FROM Paciente p " +
            "JOIN p.psicologo u " +
            "WHERE u.empresa.id = :empresaId " +
            "AND p.ativo = :ativo " +
            "ORDER BY p.nome")
    List<Paciente> findByEmpresaId(@Param("empresaId") Long empresaId, @Param("ativo") Boolean ativo);

    // Usado para os dashboards
    long countByPsicologoId(Long usuarioId);
}