package com.psicotestes.controller;

import com.psicotestes.model.AplicacaoTeste;
import com.psicotestes.service.AplicacaoTesteService;
import com.psicotestes.service.EmailService;
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
    private final EmailService emailService;

    @GetMapping("/aplicacao/{id}/simplificado")
    public ResponseEntity<byte[]> baixarRelatorioSimplificado(@PathVariable Long id) {
        try {
            AplicacaoTeste aplicacaoTeste = aplicacaoTesteService.buscarAplicacaoCompleta(id);

            // Executa a geração do documento em memória
            byte[] pdfBytes = relatorioPdfService.gerarRelatorioSimplificado(aplicacaoTeste);

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

    @PostMapping("/aplicacao/{id}/enviar-email")
    public ResponseEntity<String> enviarRelatorioPorEmail(
            @PathVariable Long id,
            @RequestParam String emailDestinatario) {

        AplicacaoTeste aplicacaoTeste = aplicacaoTesteService.buscarAplicacaoCompleta(id);
        byte[] pdfBytes = relatorioPdfService.gerarRelatorioSimplificado(aplicacaoTeste);
        if (emailDestinatario == null || emailDestinatario.isEmpty()) {
            emailDestinatario = aplicacaoTeste.getPaciente().getEmail();
        }

        emailService.enviarRelatorioComAnexo(emailDestinatario, aplicacaoTeste.getPaciente().getNome(), pdfBytes);
        return ResponseEntity.ok("E-mail enviado com sucesso para " + emailDestinatario);
    }
}