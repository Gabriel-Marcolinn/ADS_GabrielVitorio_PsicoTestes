package com.psicotestes.controller;

import com.psicotestes.model.AplicacaoTeste;
import com.psicotestes.service.AplicacaoTesteService;
import com.psicotestes.service.RelatorioPdfService;
import com.psicotestes.strategy.CalculadoraFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/relatorios")
@RequiredArgsConstructor
public class RelatorioPdfController {

    private final RelatorioPdfService relatorioPdfService;
    private final AplicacaoTesteService aplicacaoTesteService;

    @GetMapping("/aplicacao/{id}/simplificado")
    public ResponseEntity<byte[]> baixarRelatorioSimplificado(@PathVariable Long id) {
        try {
            AplicacaoTeste aplicacaoTeste = aplicacaoTesteService.buscarAplicacaoCompleta(id);
            String dataAtualFormatada = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

            // Executa a geração do documento em memória
            byte[] pdfBytes = relatorioPdfService.gerarRelatorioSimplificado(
                    aplicacaoTeste.getPaciente().getNome(),
                    aplicacaoTeste.getUsuario().getNome(),
                    aplicacaoTeste.getTeste().getNome(),
                    aplicacaoTeste.getPontuacaoTotal(),
                    aplicacaoTeste.getClassificacao(),
                    dataAtualFormatada
            );

            // Prepara os Headers HTTP informando ao navegador/React que o payload é um anexo binário de PDF
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "laudo-simplificado-id" + id + ".pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            // Grava o arquivo na temp também para conferência
            Path arquivoTemp = Files.createTempFile("relatorio_simplificado_temp", ".pdf");
            Files.write(arquivoTemp,pdfBytes);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } catch (IOException e) {
            System.err.println("Erro ao manipular o arquivo temporário: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            System.err.println("Erro ao baixar arquivo pdf: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}