-- ==============================================================================
-- CARGA INICIAL: TESTE 4 - Escala de Ideação Suicida BECK - BSS
-- ==============================================================================

-- 1. Criação do Teste (ID 3)
INSERT INTO testes (id, nome)
VALUES (3, 'Escala de Ideação Suicida BECK - BSS');

-- 2. Criação das 20 Perguntas vinculadas ao Teste ID 3
INSERT INTO perguntas (id, pergunta, teste_id) VALUES
                                                   (48, '1. O quanto você sente vontade de continuar vivendo atualmente?', 3),
                                                   (49, '2. O quanto você sente vontade de morrer ou desaparecer?', 3),
                                                   (50, '3. O quanto você percebe motivos, vínculos ou responsabilidades que ajudam você a continuar?', 3),
                                                   (51, '4. O quanto você percebe motivos que fazem a morte parecer uma saída?', 3),
                                                   (52, '5. Com que frequência você tem pensado em tirar a própria vida?', 3),
                                                   (53, '6. Quando esses pensamentos aparecem, por quanto tempo eles costumam permanecer?', 3),
                                                   (54, '7. O quanto você consegue afastar ou interromper esses pensamentos quando surgem?', 3),
                                                   (55, '8. O quanto você sente impulso de fazer algo contra si mesmo?', 3),
                                                   (56, '9. O quanto você já pensou em como, quando ou onde poderia se machucar?', 3),
                                                   (57, '10. O quanto você já fez preparativos, separou meios, escreveu mensagens ou organizou algo relacionado a uma possível tentativa?', 3),
                                                   (58, '11. O quanto você sente que teria acesso fácil a meios para se machucar?', 3),
                                                   (59, '12. O quanto você acredita que uma tentativa poderia resultar em morte?', 3),
                                                   (60, '13. O quanto o medo da morte impede você de agir contra si mesmo?', 3),
                                                   (61, '14. O quanto pensar no impacto sobre outras pessoas impede você de agir?', 3),
                                                   (62, '15. O quanto você se sente dividido entre querer viver e querer morrer?', 3),
                                                   (63, '16. O quanto você conseguiu contar a alguém sobre esses pensamentos ou pedir ajuda?', 3),
                                                   (64, '17. O quanto você tem se isolado ou evitado contato com pessoas próximas?', 3),
                                                   (65, '18. O quanto você sente que o futuro não tem solução ou possibilidade de melhora?', 3),
                                                   (66, '19. O quanto seu sofrimento emocional está intenso neste momento?', 3),
                                                   (67, '20. O quanto você se sente capaz de procurar ajuda antes de agir contra si mesmo?', 3);

-- 3. Criação das Alternativas vinculadas a cada Pergunta (0 a 3 pontos)

-- Alternativas para a Pergunta ID 48
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (48, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (48, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (48, 2, 'Moderado / presente de forma clara'),
                                                                   (48, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 49
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (49, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (49, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (49, 2, 'Moderado / presente de forma clara'),
                                                                   (49, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 50
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (50, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (50, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (50, 2, 'Moderado / presente de forma clara'),
                                                                   (50, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 51
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (51, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (51, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (51, 2, 'Moderado / presente de forma clara'),
                                                                   (51, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 52
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (52, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (52, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (52, 2, 'Moderado / presente de forma clara'),
                                                                   (52, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 53
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (53, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (53, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (53, 2, 'Moderado / presente de forma clara'),
                                                                   (53, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 54
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (54, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (54, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (54, 2, 'Moderado / presente de forma clara'),
                                                                   (54, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 55
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (55, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (55, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (55, 2, 'Moderado / presente de forma clara'),
                                                                   (55, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 56
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (56, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (56, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (56, 2, 'Moderado / presente de forma clara'),
                                                                   (56, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 57
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (57, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (57, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (57, 2, 'Moderado / presente de forma clara'),
                                                                   (57, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 58
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (58, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (58, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (58, 2, 'Moderado / presente de forma clara'),
                                                                   (58, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 59
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (59, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (59, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (59, 2, 'Moderado / presente de forma clara'),
                                                                   (59, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 60
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (60, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (60, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (60, 2, 'Moderado / presente de forma clara'),
                                                                   (60, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 61
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (61, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (61, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (61, 2, 'Moderado / presente de forma clara'),
                                                                   (61, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 62
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (62, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (62, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (62, 2, 'Moderado / presente de forma clara'),
                                                                   (62, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 63
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (63, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (63, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (63, 2, 'Moderado / presente de forma clara'),
                                                                   (63, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 64
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (64, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (64, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (64, 2, 'Moderado / presente de forma clara'),
                                                                   (64, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 65
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (65, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (65, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (65, 2, 'Moderado / presente de forma clara'),
                                                                   (65, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 66
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (66, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (66, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (66, 2, 'Moderado / presente de forma clara'),
                                                                   (66, 3, 'Intenso / muito presente / alta intensidade');

-- Alternativas para a Pergunta ID 67
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (67, 0, 'Ausente / não ocorreu / nenhuma intensidade'),
                                                                   (67, 1, 'Leve / pouco presente / baixa intensidade'),
                                                                   (67, 2, 'Moderado / presente de forma clara'),
                                                                   (67, 3, 'Intenso / muito presente / alta intensidade');

-- ==============================================================================
-- ATUALIZAÇÃO DAS SEQUENCES
-- ==============================================================================
SELECT setval('testes_id_seq', (SELECT MAX(id) FROM testes));
SELECT setval('perguntas_id_seq', (SELECT MAX(id) FROM perguntas));
SELECT setval('alternativas_id_seq', (SELECT MAX(id) FROM alternativas));