package com.psicotestes.strategy;

import com.psicotestes.model.Alternativa;
import java.util.List;

// Interface para poder fazer a criação das outras "calculadoras" de testes, para cada teste teremos um cálculo diferente
public interface CalculadoraTesteStrategy {

    String getIdentificadorTeste();

    Double calcular(List<Alternativa> alternativasEscolhidas);

    String classificar(Double pontuacaoFinal);
}