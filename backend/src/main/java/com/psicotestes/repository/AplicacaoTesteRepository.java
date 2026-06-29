package com.psicotestes.repository;

import com.psicotestes.dto.DashboardAdminResponseDTO;
import com.psicotestes.dto.DashboardPsicologoAdminResponseDTO;
import com.psicotestes.dto.DashboardPsicologoResponseDTO;
import com.psicotestes.model.AplicacaoTeste;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AplicacaoTesteRepository extends JpaRepository<AplicacaoTeste, Long> {

    // Usado pelo psicólogo para visualizar o histórico
    List<AplicacaoTeste> findByPacienteIdOrderByDataAplicacaoDesc(Long pacienteId);

    // Usado para listar a lista de aplicações por psicólogo
    List<AplicacaoTeste> findByUsuarioIdOrderByDataAplicacaoDesc(Long psicologoId);

    // Usado para listar as aplicações por empresa
    @Query(
            "SELECT app FROM AplicacaoTeste app " +
            "JOIN app.usuario u " +
            "JOIN u.empresa e " +
            "WHERE e.id = :empresaId " +
            "ORDER BY app.paciente.nome asc"
    )
    List<AplicacaoTeste> findByEmpresaId(@Param("empresaId") Long empresaId);

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

    @Query("SELECT COUNT(a) FROM AplicacaoTeste a JOIN a.usuario u WHERE u.empresa.id = :empresaId")
    long countTestesByEmpresaId(@Param("empresaId") Long empresaId);

    @Query("SELECT COUNT(DISTINCT a.paciente.id) FROM AplicacaoTeste a JOIN a.usuario u WHERE u.empresa.id = :empresaId")
    long countPacientesAtivosByEmpresaId(@Param("empresaId") Long empresaId);

    @Query("""
        SELECT new com.psicotestes.dto.DashboardPsicologoAdminResponseDTO$DesempenhoPsicologo(
            u.nome,
            COUNT(a.id),
            COUNT(DISTINCT a.paciente.id)
        )
        FROM AplicacaoTeste a
        JOIN a.usuario u
        WHERE u.empresa.id = :empresaId
        GROUP BY u.nome
        ORDER BY COUNT(a.id) DESC
    """)
    List<DashboardPsicologoAdminResponseDTO.DesempenhoPsicologo> montarDesempenhoEquipe(@Param("empresaId") Long empresaId);

    @Query("""
        SELECT new com.psicotestes.dto.DashboardPsicologoAdminResponseDTO$AtividadeMensalFlat(
            CAST(EXTRACT(MONTH FROM a.dataAplicacao) AS int),
            u.nome,
            COUNT(a.id)
        )
        FROM AplicacaoTeste a
        JOIN a.usuario u
        WHERE u.empresa.id = :empresaId
        GROUP BY EXTRACT(MONTH FROM a.dataAplicacao), u.nome
        ORDER BY EXTRACT(MONTH FROM a.dataAplicacao) ASC
    """)
    List<DashboardPsicologoAdminResponseDTO.AtividadeMensalFlat> buscarAtividadeMensalFlat(@Param("empresaId") Long empresaId);

    @Query("SELECT COUNT(a) FROM AplicacaoTeste a WHERE a.usuario.id = :usuarioId")
    long countTestesByUsuarioId(@Param("usuarioId") Long usuarioId);

    @Query("""
        SELECT new com.psicotestes.dto.DashboardPsicologoResponseDTO$TesteFrequencia(
            t.nome,
            COUNT(a.id)
        )
        FROM AplicacaoTeste a
        JOIN a.teste t
        WHERE a.usuario.id = :usuarioId
        GROUP BY t.nome
        ORDER BY COUNT(a.id) DESC
    """)
    List<DashboardPsicologoResponseDTO.TesteFrequencia> buscarFrequenciaTestesPorPsicologo(@Param("usuarioId") Long usuarioId);
}