package com.psicotestes.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void enviarRelatorioComAnexo(String destinatario, String nomePaciente, byte[] pdfBytes) {
        try {
            MimeMessage mensagem = mailSender.createMimeMessage();

            // O "true" indica que a mensagem terá anexo (Multipart)
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true);

            helper.setTo(destinatario);
            helper.setSubject("Resultado da Avaliação Psicométrica - " + nomePaciente);
            helper.setText("Olá,\n\nSegue em anexo o relatório da avaliação psicológica do paciente " + nomePaciente + ".\n\nEmail enviado automaticamente pelo Sistema PsicoTestes.");

            // Anexa o PDF que foi gerado em memória
            helper.addAttachment("Laudo_" + nomePaciente.replace(" ", "_") + ".pdf", new ByteArrayResource(pdfBytes));

            mailSender.send(mensagem);

        } catch (MessagingException e) {
            throw new RuntimeException("Falha ao enviar o e-mail com o laudo", e);
        }
    }
}