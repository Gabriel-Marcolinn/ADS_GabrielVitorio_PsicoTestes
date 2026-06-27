package com.psicotestes.service;

import com.psicotestes.dto.DashboardAdminResponseDTO;
import com.psicotestes.repository.AplicacaoTesteRepository;
import com.psicotestes.repository.EmpresaRepository;
import com.psicotestes.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;
    private final AplicacaoTesteRepository aplicacaoTesteRepository;

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
}