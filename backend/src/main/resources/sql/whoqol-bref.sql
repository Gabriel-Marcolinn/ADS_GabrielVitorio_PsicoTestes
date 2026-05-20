-- ==============================================================================
-- CARGA INICIAL: TESTE 3 - Remix Inspirado no WHOQOL-BREF
-- ==============================================================================

-- 1. Criação do Teste (ID 2)
INSERT INTO testes (id, nome) 
VALUES (2, 'WHOQOL-BREF');

-- 2. Criação das 26 Perguntas vinculadas ao Teste ID 2
INSERT INTO perguntas (id, pergunta, teste_id) VALUES
(22, 'Como você avalia sua qualidade de vida de modo geral?', 2),
(23, 'Quão satisfeito você está com sua saúde?', 2),
(24, 'Com que frequência dores ou desconfortos físicos atrapalham sua rotina?', 2),
(25, 'O quanto você depende de remédios, tratamentos ou cuidados para funcionar no dia a dia?', 2),
(26, 'Quanta energia você sente que tem para realizar suas atividades diárias?', 2),
(27, 'O quanto você sente que sua vida tem direção, propósito ou significado?', 2),
(28, 'Quão bem você consegue se concentrar nas suas atividades?', 2),
(29, 'Quão seguro você se sente em sua vida diária?', 2),
(30, 'Quão adequado é o ambiente em que você vive em relação a barulho, clima, poluição, limpeza ou conforto?', 2),
(31, 'Quão bem você consegue se locomover ou circular pelos lugares de que precisa?', 2),
(32, 'Quão satisfeito você está com sua aparência ou imagem corporal?', 2),
(33, 'O quanto seus recursos financeiros são suficientes para suas necessidades?', 2),
(34, 'Quão fácil é para você acessar informações importantes para sua vida, estudos, trabalho ou saúde?', 2),
(35, 'Quão disponíveis são oportunidades de lazer, descanso ou atividades prazerosas para você?', 2),
(36, 'Quão bem você consegue realizar suas atividades do dia a dia?', 2),
(37, 'Quão satisfeito você está com seu sono?', 2),
(38, 'Quão satisfeito você está com sua capacidade de trabalhar, estudar ou cumprir responsabilidades?', 2),
(39, 'Quão satisfeito você está consigo mesmo?', 2),
(40, 'Com que frequência você sente tristeza, ansiedade, culpa, irritação ou desânimo?', 2),
(41, 'Quão satisfeito você está com suas relações pessoais?', 2),
(42, 'Quão satisfeito você está com o apoio que recebe de pessoas próximas?', 2),
(43, 'Quão satisfeito você está com sua vida afetiva, íntima ou sexual?', 2),
(44, 'Quão satisfeito você está com o lugar onde mora?', 2),
(45, 'Quão satisfeito você está com seu acesso a serviços de saúde quando precisa?', 2),
(46, 'Quão satisfeito você está com suas condições de transporte ou deslocamento?', 2),
(47, 'Quão satisfeito você está com o equilíbrio entre obrigações, descanso e vida pessoal?', 2);

-- 3. Criação das Alternativas vinculadas a cada Pergunta (1 a 5 pontos)

-- Alternativas para a Pergunta ID 22
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(22, 1.0, 'Muito Ruim'),
(22, 2.0, 'Ruim'),
(22, 3.0, 'Regular'),
(22, 4.0, 'Bom'),
(22, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 23
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(23, 1.0, 'Muito Ruim'),
(23, 2.0, 'Ruim'),
(23, 3.0, 'Regular'),
(23, 4.0, 'Bom'),
(23, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 24
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(24, 1.0, 'Muito Ruim'),
(24, 2.0, 'Ruim'),
(24, 3.0, 'Regular'),
(24, 4.0, 'Bom'),
(24, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 25
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(25, 1.0, 'Muito Ruim'),
(25, 2.0, 'Ruim'),
(25, 3.0, 'Regular'),
(25, 4.0, 'Bom'),
(25, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 26
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(26, 1.0, 'Muito Ruim'),
(26, 2.0, 'Ruim'),
(26, 3.0, 'Regular'),
(26, 4.0, 'Bom'),
(26, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 27
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(27, 1.0, 'Muito Ruim'),
(27, 2.0, 'Ruim'),
(27, 3.0, 'Regular'),
(27, 4.0, 'Bom'),
(27, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 28
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(28, 1.0, 'Muito Ruim'),
(28, 2.0, 'Ruim'),
(28, 3.0, 'Regular'),
(28, 4.0, 'Bom'),
(28, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 29
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(29, 1.0, 'Muito Ruim'),
(29, 2.0, 'Ruim'),
(29, 3.0, 'Regular'),
(29, 4.0, 'Bom'),
(29, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 30
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(30, 1.0, 'Muito Ruim'),
(30, 2.0, 'Ruim'),
(30, 3.0, 'Regular'),
(30, 4.0, 'Bom'),
(30, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 31
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(31, 1.0, 'Muito Ruim'),
(31, 2.0, 'Ruim'),
(31, 3.0, 'Regular'),
(31, 4.0, 'Bom'),
(31, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 32
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(32, 1.0, 'Muito Ruim'),
(32, 2.0, 'Ruim'),
(32, 3.0, 'Regular'),
(32, 4.0, 'Bom'),
(32, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 33
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(33, 1.0, 'Muito Ruim'),
(33, 2.0, 'Ruim'),
(33, 3.0, 'Regular'),
(33, 4.0, 'Bom'),
(33, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 34
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(34, 1.0, 'Muito Ruim'),
(34, 2.0, 'Ruim'),
(34, 3.0, 'Regular'),
(34, 4.0, 'Bom'),
(34, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 35
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(35, 1.0, 'Muito Ruim'),
(35, 2.0, 'Ruim'),
(35, 3.0, 'Regular'),
(35, 4.0, 'Bom'),
(35, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 36
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(36, 1.0, 'Muito Ruim'),
(36, 2.0, 'Ruim'),
(36, 3.0, 'Regular'),
(36, 4.0, 'Bom'),
(36, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 37
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(37, 1.0, 'Muito Ruim'),
(37, 2.0, 'Ruim'),
(37, 3.0, 'Regular'),
(37, 4.0, 'Bom'),
(37, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 38
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(38, 1.0, 'Muito Ruim'),
(38, 2.0, 'Ruim'),
(38, 3.0, 'Regular'),
(38, 4.0, 'Bom'),
(38, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 39
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(39, 1.0, 'Muito Ruim'),
(39, 2.0, 'Ruim'),
(39, 3.0, 'Regular'),
(39, 4.0, 'Bom'),
(39, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 40
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(40, 1.0, 'Muito Ruim'),
(40, 2.0, 'Ruim'),
(40, 3.0, 'Regular'),
(40, 4.0, 'Bom'),
(40, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 41
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(41, 1.0, 'Muito Ruim'),
(41, 2.0, 'Ruim'),
(41, 3.0, 'Regular'),
(41, 4.0, 'Bom'),
(41, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 42
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(42, 1.0, 'Muito Ruim'),
(42, 2.0, 'Ruim'),
(42, 3.0, 'Regular'),
(42, 4.0, 'Bom'),
(42, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 43
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(43, 1.0, 'Muito Ruim'),
(43, 2.0, 'Ruim'),
(43, 3.0, 'Regular'),
(43, 4.0, 'Bom'),
(43, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 44
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(44, 1.0, 'Muito Ruim'),
(44, 2.0, 'Ruim'),
(44, 3.0, 'Regular'),
(44, 4.0, 'Bom'),
(44, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 45
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(45, 1.0, 'Muito Ruim'),
(45, 2.0, 'Ruim'),
(45, 3.0, 'Regular'),
(45, 4.0, 'Bom'),
(45, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 46
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(46, 1.0, 'Muito Ruim'),
(46, 2.0, 'Ruim'),
(46, 3.0, 'Regular'),
(46, 4.0, 'Bom'),
(46, 5.0, 'Muito Bom');

-- Alternativas para a Pergunta ID 47
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
(47, 1.0, 'Muito Ruim'),
(47, 2.0, 'Ruim'),
(47, 3.0, 'Regular'),
(47, 4.0, 'Bom'),
(47, 5.0, 'Muito Bom');

-- ==============================================================================
-- ATUALIZAÇÃO DAS SEQUENCES (EVITA ERROS DE AUTO-INCREMENTO NO POSTGRESQL)
-- ==============================================================================
SELECT setval('testes_id_seq', (SELECT MAX(id) FROM testes));
SELECT setval('perguntas_id_seq', (SELECT MAX(id) FROM perguntas));
SELECT setval('alternativas_id_seq', (SELECT MAX(id) FROM alternativas));