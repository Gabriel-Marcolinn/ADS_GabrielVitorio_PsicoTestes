package com.psicotestes.service;

import com.psicotestes.dto.DashboardAdminResponseDTO;
import com.psicotestes.dto.DashboardPsicologoAdminResponseDTO;
import com.psicotestes.dto.DashboardPsicologoResponseDTO;
import com.psicotestes.repository.AplicacaoTesteRepository;
import com.psicotestes.repository.EmpresaRepository;
import com.psicotestes.repository.PacienteRepository;
import com.psicotestes.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;
    private final AplicacaoTesteRepository aplicacaoTesteRepository;
    private final PacienteRepository pacienteRepository;

    @Transactional(readOnly = true)
    public DashboardAdminResponseDTO montarDashboardAdmin() {

        // KPIs
        DashboardAdminResponseDTO.KpisAdmin kpis = new DashboardAdminResponseDTO.KpisAdmin(
                empresaRepository.count(),
                usuarioRepository.countByTipoInAndAtivoTrue(List.of("PS","PA")), // Traz apenas Psicólogos ativos
                aplicacaoTesteRepository.count()
        );

        // Testes por Empresa
        List<DashboardAdminResponseDTO.TestesPorEmpresaPivot> distribuicaoTestes = MontarDistribuicaoTestes();

        // Ranking de empresas
        List<DashboardAdminResponseDTO.DesempenhoEmpresa> ranking = aplicacaoTesteRepository.montarRankingEmpresas();

        return new DashboardAdminResponseDTO(kpis, distribuicaoTestes, ranking);
    }

    @Transactional(readOnly = true)
    public DashboardPsicologoAdminResponseDTO montarDashboardPsicologoAdmin(Long empresaId) {

        // KPIs
        DashboardPsicologoAdminResponseDTO.KpisGestor kpis = new DashboardPsicologoAdminResponseDTO.KpisGestor(
                usuarioRepository.countByEmpresaIdAndTipoInAndAtivoTrue(empresaId, List.of("PS", "PA")),
                aplicacaoTesteRepository.countPacientesAtivosByEmpresaId(empresaId),
                aplicacaoTesteRepository.countTestesByEmpresaId(empresaId)
        );

        // 2. Gráfico e Ranking REAIS
        List<DashboardPsicologoAdminResponseDTO.DesempenhoPsicologo> desempenhoEquipe =
                aplicacaoTesteRepository.montarDesempenhoEquipe(empresaId);

        // 3. Gráfico Mensal
        List<DashboardPsicologoAdminResponseDTO.AtividadeMensalPivot> atividadeMensal = montarAtividadeMensal(empresaId);

        return new DashboardPsicologoAdminResponseDTO(kpis, desempenhoEquipe, atividadeMensal);
    }

    @Transactional(readOnly = true)
    public DashboardPsicologoResponseDTO montarDashboardPsicologo(Long usuarioId) {

        // KPIs
        DashboardPsicologoResponseDTO.KpisPsicologo kpis = new DashboardPsicologoResponseDTO.KpisPsicologo(
                pacienteRepository.countByPsicologoId(usuarioId),
                aplicacaoTesteRepository.countTestesByUsuarioId(usuarioId)
        );

        // Gráfico de Barras
        List<DashboardPsicologoResponseDTO.TesteFrequencia> frequenciaTestes =
                aplicacaoTesteRepository.buscarFrequenciaTestesPorPsicologo(usuarioId);

        return new DashboardPsicologoResponseDTO(kpis, frequenciaTestes);
    }

    private List<DashboardAdminResponseDTO.TestesPorEmpresaPivot> MontarDistribuicaoTestes() {
        List<DashboardAdminResponseDTO.TestesPorEmpresa> dadosBrutos = aplicacaoTesteRepository.contarTestesAgrupadosPorEmpresa();
        List<DashboardAdminResponseDTO.TestesPorEmpresaPivot> distribuicaoTestes = dadosBrutos.stream()
                .collect(Collectors.groupingBy(
                        DashboardAdminResponseDTO.TestesPorEmpresa::nomeEmpresa,
                        Collectors.toMap(
                                // Limpa o nome do teste (ex: "BDI - II" vira "quantidadeAplicadaBDIII")
                                dto -> "quantidadeAplicada" + dto.nomeTeste().replaceAll("[^a-zA-Z0-9]", ""),
                                DashboardAdminResponseDTO.TestesPorEmpresa::quantidadeAplicada
                        )
                ))
                .entrySet().stream()
                .map(entry -> new DashboardAdminResponseDTO.TestesPorEmpresaPivot(entry.getKey(), entry.getValue()))
                .toList();

        return distribuicaoTestes;
    }

    private List<DashboardPsicologoAdminResponseDTO.AtividadeMensalPivot> montarAtividadeMensal(Long empresaId) {
        List<DashboardPsicologoAdminResponseDTO.AtividadeMensalFlat> dadosBrutos =
                aplicacaoTesteRepository.buscarAtividadeMensalFlat(empresaId);

        // Dicionário simples para converter número em texto (Índice 1 = Jan)
        String[] nomesMeses = {"", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"};

        List<DashboardPsicologoAdminResponseDTO.AtividadeMensalPivot> atividadeMensal = dadosBrutos.stream()
                // Primeiro: Agrupamos pelo NÚMERO do mês (para manter a ordem do tempo)
                .collect(Collectors.groupingBy(
                        DashboardPsicologoAdminResponseDTO.AtividadeMensalFlat::mes,
                        Collectors.toMap(
                                DashboardPsicologoAdminResponseDTO.AtividadeMensalFlat::nomePsicologo,
                                DashboardPsicologoAdminResponseDTO.AtividadeMensalFlat::quantidade
                        )
                ))
                .entrySet().stream()
                // Segundo: Garantimos que o mês 1 venha antes do mês 2
                .sorted(Map.Entry.comparingByKey())
                // Terceiro: Traduzimos o número para "Jan", "Fev" e empacotamos pro DTO do Front-end
                .map(entry -> {
                    String nomeMes = nomesMeses[entry.getKey()];
                    return new DashboardPsicologoAdminResponseDTO.AtividadeMensalPivot(nomeMes, entry.getValue());
                })
                .toList();

        return atividadeMensal;
    }
}