package com.psicotestes.repository;

import com.psicotestes.dto.DashboardAdminResponseDTO;
import com.psicotestes.model.AplicacaoTeste;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AplicacaoTesteRepository extends JpaRepository<AplicacaoTeste, Long> {

    // Usado pelo psicólogo para visualizar o histórico
    List<AplicacaoTeste> findByPacienteIdOrderByDataAplicacaoDesc(Long pacienteId);

    // Usado para listar a lista de aplicações por psicólogo
    List<AplicacaoTeste> findByUsuarioIdOrderByDataAplicacaoDesc(Long psicologoId);

    // Busca uma aplicação específica já trazendo as respostas aninhadas.
    // O @EntityGraph evita o problema do N+1 Queries na hora de gerar o PDF com os resultados.
    @EntityGraph(attributePaths = {"respostas", "respostas.alternativa"})
    Optional<AplicacaoTeste> findById(Long id);

    // Métodos para os dashboards
    @Query("""
        SELECT new com.psicotestes.dto.DashboardAdminResponseDTO$TestesPorEmpresa(
            e.razaoSocial,
            t.nome,
            COUNT(a.id)
        )
        FROM AplicacaoTeste a
        JOIN a.teste t
        JOIN a.usuario u
        JOIN u.empresa e
        GROUP BY e.razaoSocial, t.nome
        ORDER BY e.razaoSocial ASC, COUNT(a.id) DESC
    """)
    List<DashboardAdminResponseDTO.TestesPorEmpresa> contarTestesAgrupadosPorEmpresa();

    @Query("""
        SELECT new com.psicotestes.dto.DashboardAdminResponseDTO$DesempenhoEmpresa(
            e.razaoSocial,
            COUNT(a.id),
            COUNT(DISTINCT a.paciente.id)
        )
        FROM AplicacaoTeste a
        JOIN a.usuario u
        JOIN u.empresa e
        GROUP BY e.razaoSocial
        ORDER BY COUNT(a.id) DESC
    """)
    List<DashboardAdminResponseDTO.DesempenhoEmpresa> montarRankingEmpresas();
}