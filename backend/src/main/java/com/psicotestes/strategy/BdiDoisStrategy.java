package com.psicotestes.strategy;

import com.psicotestes.model.Alternativa;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class BdiDoisStrategy implements CalculadoraTesteStrategy {

    @Override
    public String getIdentificadorTeste() {
        return "BDI-II";
    }

    @Override
    public Double calcular(List<Alternativa> alternativasEscolhidas) {
        // Esse teste usa somente uma soma simples
        return alternativasEscolhidas.stream()
                .mapToDouble(Alternativa::getPontuacao)
                .sum();
    }

    @Override
    public String classificar(Double pontuacaoFinal) {
        if (pontuacaoFinal >= 0 && pontuacaoFinal <= 13) {
            return "Mínimo/Sem Depressão";
        } else if (pontuacaoFinal >= 14 && pontuacaoFinal <= 19) {
            return "Depressão Leve";
        } else if (pontuacaoFinal >= 20 && pontuacaoFinal <= 28) {
            return "Depressão Moderada";
        } else if (pontuacaoFinal >= 29 && pontuacaoFinal <= 63) {
            return "Depressão Grave";
        } else {
            return "Pontuação fora do padrão esperado para o teste.";
        }
    }
}