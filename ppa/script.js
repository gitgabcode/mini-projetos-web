// Configuração do PPA
const configPPA = {
    pesos: {
        apontamentos: 0.40,
        compras: 0.25,
        estoque: 0.25,
        orcamento: 0.10
    }
};

// Estado atual da aplicação
let modoAtual = 'compras';
let ppaChart = null;

// Notas dos setores (armazenamento global)
let notasSetores = {
    compras: 0,
    estoque: 0,
    apontamentos: 0,
    orcamento: 0
};

// Função para trocar modo/setor
function trocarModo(modo, elemento = null) {
    console.log('🔄 Trocando para modo:', modo);
    
    // Atualizar botões
    document.querySelectorAll('.modo-btn').forEach(btn => btn.classList.remove('active'));
    
    // Se elemento foi passado, usar ele; senão, procurar pelo modo
    if (elemento) {
        elemento.classList.add('active');
    } else {
        // Encontrar botão correto pelo onclick ou data-mode
        const botaoCorreto = Array.from(document.querySelectorAll('.modo-btn')).find(btn => 
            btn.textContent.toLowerCase().includes(modo) || btn.onclick?.toString().includes(modo)
        );
        if (botaoCorreto) botaoCorreto.classList.add('active');
    }
    
    // Esconder todos os cards
    document.querySelectorAll('.setor-card').forEach(card => card.style.display = 'none');
    
    // Mostrar card selecionado
    const cardSelecionado = document.getElementById(`card-${modo}`);
    if (cardSelecionado) {
        cardSelecionado.style.display = 'block';
    } else {
        console.error(`❌ Card '${modo}' não encontrado!`);
        return;
    }
    
    modoAtual = modo;
    
    // Se for visão geral, atualizar dados
    if (modo === 'geral') {
        atualizarVisaoGeral();
    }
    
    // Atualizar texto dos botões conforme o modo
    atualizarBotoes(modo);
}

// CÁLCULOS POR SETOR

// === COMPRAS ===
function calcularCompras() {
    console.log('🛒 Calculando Compras...');
    
    const totalContrato = Math.max(0, parseFloat(document.getElementById('compras-total-contrato').value) || 0);
    const compraErrada = Math.max(0, parseFloat(document.getElementById('compras-compra-errada').value) || 0);
    const reqAvulso = Math.max(0, parseFloat(document.getElementById('compras-req-avulso').value) || 0);
    
    // Validações lógicas
    if (compraErrada > totalContrato) {
        document.getElementById('compras-resultado').textContent = 'ERRO: Compra errada > Total';
        return;
    }
    if (reqAvulso > totalContrato) {
        document.getElementById('compras-resultado').textContent = 'ERRO: Req. avulso > Total';
        return;
    }
    if ((compraErrada + reqAvulso) > totalContrato) {
        document.getElementById('compras-resultado').textContent = 'ERRO: Soma dos erros > Total';
        return;
    }
    
    let pontuacao = 0;
    let percErro = 0;
    
    if (totalContrato > 0) {
        percErro = ((compraErrada + reqAvulso) / totalContrato) * 100;
        
        // Tabela de pontuação
        if (percErro <= 5) {
            pontuacao = 100;
        } else if (percErro <= 10) {
            pontuacao = 75;
        } else if (percErro <= 15) {
            pontuacao = 50;
        } else {
            pontuacao = 0;
        }
    }
    
    document.getElementById('compras-resultado').textContent = `${pontuacao} pontos (${percErro.toFixed(1)}% erro)`;
    
    const notaSetor = (pontuacao / 100) * 10;
    notasSetores.compras = notaSetor;
    
    document.getElementById('nota-compras').textContent = notaSetor.toFixed(2);
    document.getElementById('contribuicao-compras').textContent = (notaSetor * configPPA.pesos.compras).toFixed(2);
}

// === ESTOQUE ===
function calcularEstoque() {
    console.log('📦 Calculando Estoque...');
    
    // Estoque Parado
    const totalEstoque = Math.max(0, parseFloat(document.getElementById('estoque-total-estoque').value) || 0);
    const estoqueParado = Math.max(0, parseFloat(document.getElementById('estoque-estoque-parado').value) || 0);
    
    let percEstoqueParado = 0;
    // Validação: estoque parado não pode ser maior que total
    if (estoqueParado > totalEstoque && totalEstoque > 0) {
        document.getElementById('estoque-resultado-parado').textContent = 'ERRO: Parado > Total';
        percEstoqueParado = 0;
    } else {
        percEstoqueParado = totalEstoque > 0 ? ((totalEstoque - estoqueParado) / totalEstoque) * 100 : 0;
        document.getElementById('estoque-resultado-parado').textContent = `${percEstoqueParado.toFixed(1)}%`;
    }
    
    // Ajuste de Saldo
    const totalEstoqueAjuste = Math.max(0, parseFloat(document.getElementById('estoque-total-ajuste').value) || 0);
    const totalAjuste = Math.max(0, parseFloat(document.getElementById('estoque-total-ajuste-valor').value) || 0);
    
    let percAjusteSaldo = 0;
    // Validação: ajuste não pode ser maior que total
    if (totalAjuste > totalEstoqueAjuste && totalEstoqueAjuste > 0) {
        document.getElementById('estoque-resultado-ajuste').textContent = 'ERRO: Ajuste > Total';
        percAjusteSaldo = 0;
    } else {
        percAjusteSaldo = totalEstoqueAjuste > 0 ? ((totalEstoqueAjuste - totalAjuste) / totalEstoqueAjuste) * 100 : 0;
        document.getElementById('estoque-resultado-ajuste').textContent = `${percAjusteSaldo.toFixed(1)}%`;
    }
    
    // Quebra de Diesel
    const totalQuebras = Math.max(0, parseFloat(document.getElementById('estoque-total-quebras').value) || 0);
    const quebrasLimite = Math.max(0, parseFloat(document.getElementById('estoque-quebras-limite').value) || 0);
    
    let percQuebraDiesel = 0;
    // Validação: quebras no limite não pode ser maior que total
    if (quebrasLimite > totalQuebras && totalQuebras > 0) {
        document.getElementById('estoque-resultado-quebra').textContent = 'ERRO: No limite > Total';
        percQuebraDiesel = 0;
    } else {
        percQuebraDiesel = totalQuebras > 0 ? (quebrasLimite / totalQuebras) * 100 : 0;
        document.getElementById('estoque-resultado-quebra').textContent = `${percQuebraDiesel.toFixed(1)}%`;
    }
    
    // Calcular nota do setor (pesos: 25%, 25%, 50%)
    const notaSetor = (
        (percEstoqueParado / 100) * 0.25 +
        (percAjusteSaldo / 100) * 0.25 +
        (percQuebraDiesel / 100) * 0.50
    ) * 10;
    
    notasSetores.estoque = notaSetor;
    
    document.getElementById('nota-estoque').textContent = notaSetor.toFixed(2);
    document.getElementById('contribuicao-estoque').textContent = (notaSetor * configPPA.pesos.estoque).toFixed(2);
}

// === APONTAMENTOS ===
function calcularApontamentos() {
    console.log('📊 Calculando Apontamentos...');
    
    // Notas no Prazo
    const totalNotas = Math.max(0, parseFloat(document.getElementById('apontamentos-total-notas').value) || 0);
    const notasPrazo = Math.max(0, parseFloat(document.getElementById('apontamentos-notas-prazo').value) || 0);
    
    // Validação: notas no prazo não pode ser maior que total
    if (notasPrazo > totalNotas && totalNotas > 0) {
        document.getElementById('apontamentos-resultado-notas').textContent = 'ERRO: No prazo > Total';
        var percNotasPrazo = 0;
    } else {
        var percNotasPrazo = totalNotas > 0 ? (notasPrazo / totalNotas) * 100 : 0;
        document.getElementById('apontamentos-resultado-notas').textContent = `${percNotasPrazo.toFixed(1)}%`;
    }
    
    // Peças Aplicadas
    const totalAplicacoes = Math.max(0, parseFloat(document.getElementById('apontamentos-total-aplicacoes').value) || 0);
    const aplicacoesCorretas = Math.max(0, parseFloat(document.getElementById('apontamentos-aplicacoes-corretas').value) || 0);
    
    // Validação: aplicações corretas não pode ser maior que total
    if (aplicacoesCorretas > totalAplicacoes && totalAplicacoes > 0) {
        document.getElementById('apontamentos-resultado-aplicadas').textContent = 'ERRO: Corretas > Total';
        var percPecasAplicadas = 0;
    } else {
        var percPecasAplicadas = totalAplicacoes > 0 ? (aplicacoesCorretas / totalAplicacoes) * 100 : 0;
        document.getElementById('apontamentos-resultado-aplicadas').textContent = `${percPecasAplicadas.toFixed(1)}%`;
    }
    
    // Peças Retiradas
    const deveriaTrocar = Math.max(0, parseFloat(document.getElementById('apontamentos-deveria-trocar').value) || 0);
    const totalAplicado = Math.max(0, parseFloat(document.getElementById('apontamentos-total-aplicado').value) || 0);
    const aplicadoAbaixo = Math.max(0, parseFloat(document.getElementById('apontamentos-aplicado-abaixo').value) || 0);
    
    let percPecasRetiradas = 0;
    // Validação: aplicado abaixo não pode ser maior que total aplicado
    if (aplicadoAbaixo > totalAplicado && totalAplicado > 0) {
        document.getElementById('apontamentos-resultado-retiradas').textContent = 'ERRO: Abaixo > Aplicado';
        percPecasRetiradas = 0;
    } else if (totalAplicado > 0) {
        if (totalAplicado < deveriaTrocar / 3) {
            percPecasRetiradas = 0; // Zera se aplicação for muito baixa
            document.getElementById('apontamentos-resultado-retiradas').textContent = '0% (Aplicação baixa)';
        } else {
            const aplicadoCorreto = totalAplicado - aplicadoAbaixo;
            percPecasRetiradas = (aplicadoCorreto / totalAplicado) * 100;
            document.getElementById('apontamentos-resultado-retiradas').textContent = `${percPecasRetiradas.toFixed(1)}%`;
        }
    } else {
        document.getElementById('apontamentos-resultado-retiradas').textContent = '0%';
    }
    
    // Pneus
    const totalPosicoes = Math.max(0, parseFloat(document.getElementById('apontamentos-total-posicoes').value) || 0);
    const posicoesMovimentadas = Math.max(0, parseFloat(document.getElementById('apontamentos-posicoes-movimentadas').value) || 0);
    
    // Validação: posições movimentadas não pode ser maior que total
    if (posicoesMovimentadas > totalPosicoes && totalPosicoes > 0) {
        document.getElementById('apontamentos-resultado-pneus').textContent = 'ERRO: Movimentadas > Total';
        var percPneus = 0;
    } else {
        var percPneus = totalPosicoes > 0 ? (posicoesMovimentadas / totalPosicoes) * 100 : 0;
        document.getElementById('apontamentos-resultado-pneus').textContent = `${percPneus.toFixed(1)}%`;
    }
    
    // Frota
    const totalSaidaFrota = Math.max(0, parseFloat(document.getElementById('apontamentos-total-saida-frota').value) || 0);
    const frotaCerta = Math.max(0, parseFloat(document.getElementById('apontamentos-frota-certa').value) || 0);
    
    // Validação: frota certa não pode ser maior que total
    if (frotaCerta > totalSaidaFrota && totalSaidaFrota > 0) {
        document.getElementById('apontamentos-resultado-frota').textContent = 'ERRO: Certa > Total';
        var percFrota = 0;
    } else {
        var percFrota = totalSaidaFrota > 0 ? (frotaCerta / totalSaidaFrota) * 100 : 0;
        document.getElementById('apontamentos-resultado-frota').textContent = `${percFrota.toFixed(1)}%`;
    }
    
    // Calcular nota do setor (pesos: 15%, 30%, 30%, 10%, 15%)
    const notaSetor = (
        (percNotasPrazo / 100) * 0.15 +
        (percPecasAplicadas / 100) * 0.30 +
        (percPecasRetiradas / 100) * 0.30 +
        (percPneus / 100) * 0.10 +
        (percFrota / 100) * 0.15
    ) * 10;
    
    notasSetores.apontamentos = notaSetor;
    
    document.getElementById('nota-apontamentos').textContent = notaSetor.toFixed(2);
    document.getElementById('contribuicao-apontamentos').textContent = (notaSetor * configPPA.pesos.apontamentos).toFixed(2);
}

// === ORÇAMENTO ===
function calcularOrcamento() {
    console.log('💰 Calculando Orçamento...');
    
    const orcado = Math.max(0, parseFloat(document.getElementById('orcamento-orcado').value) || 0);
    const realizado = Math.max(0, parseFloat(document.getElementById('orcamento-realizado').value) || 0);
    
    let percOrcamento = 0;
    if (orcado > 0) {
        if (realizado <= orcado) {
            percOrcamento = 100; // Dentro do orçamento = 100%
        } else {
            percOrcamento = (orcado / realizado) * 100; // Penaliza se ultrapassou
        }
    }
    
    document.getElementById('orcamento-resultado').textContent = `${percOrcamento.toFixed(1)}%`;
    
    const notaSetor = (percOrcamento / 100) * 10;
    notasSetores.orcamento = notaSetor;
    
    document.getElementById('nota-orcamento').textContent = notaSetor.toFixed(2);
    document.getElementById('contribuicao-orcamento').textContent = (notaSetor * configPPA.pesos.orcamento).toFixed(2);
}

// === VISÃO GERAL ===
function atualizarVisaoGeral() {
    console.log('🏆 Atualizando Visão Geral...');
    
    // Atualizar resumo dos grupos
    document.getElementById('resumo-compras').textContent = notasSetores.compras.toFixed(2);
    document.getElementById('resumo-estoque').textContent = notasSetores.estoque.toFixed(2);
    document.getElementById('resumo-apontamentos').textContent = notasSetores.apontamentos.toFixed(2);
    document.getElementById('resumo-orcamento').textContent = notasSetores.orcamento.toFixed(2);
    
    // Calcular contribuições
    const contribCompras = notasSetores.compras * configPPA.pesos.compras;
    const contribEstoque = notasSetores.estoque * configPPA.pesos.estoque;
    const contribApontamentos = notasSetores.apontamentos * configPPA.pesos.apontamentos;
    const contribOrcamento = notasSetores.orcamento * configPPA.pesos.orcamento;
    
    document.getElementById('resumo-contrib-compras').textContent = contribCompras.toFixed(2);
    document.getElementById('resumo-contrib-estoque').textContent = contribEstoque.toFixed(2);
    document.getElementById('resumo-contrib-apontamentos').textContent = contribApontamentos.toFixed(2);
    document.getElementById('resumo-contrib-orcamento').textContent = contribOrcamento.toFixed(2);
    
    // Nota final
    const notaFinal = contribCompras + contribEstoque + contribApontamentos + contribOrcamento;
    document.getElementById('nota-final').textContent = notaFinal.toFixed(2);
    
    // Verificar premiação
    verificarPremiacao(notaFinal);
    
    // Criar gráfico
    criarGraficoGeral();
}

function verificarPremiacao(notaFinal) {
    const premiacaoDiv = document.getElementById('premiacao-geral');
    const statusDiv = document.getElementById('status-premiacao-geral');
    
    premiacaoDiv.classList.remove('premiado', 'nao-premiado');
    
    if (notaFinal >= 8.0) {
        premiacaoDiv.classList.add('premiado');
        
        if (notaFinal >= 9.5) {
            statusDiv.innerHTML = '🥇 <strong>1º LUGAR!</strong><br>Excelente desempenho! Premiação máxima!';
        } else if (notaFinal >= 9.0) {
            statusDiv.innerHTML = '🥈 <strong>2º LUGAR!</strong><br>Ótimo desempenho! Elegível para premiação!';
        } else if (notaFinal >= 8.5) {
            statusDiv.innerHTML = '🥉 <strong>3º LUGAR!</strong><br>Bom desempenho! Elegível para premiação!';
        } else {
            statusDiv.innerHTML = '🏆 <strong>ELEGÍVEL PARA PREMIAÇÃO</strong><br>Pontuação acima de 8.0 - Até 7º lugar!';
        }
    } else {
        premiacaoDiv.classList.add('nao-premiado');
        const pontosNecessarios = (8.0 - notaFinal).toFixed(2);
        statusDiv.innerHTML = `❌ <strong>NÃO ELEGÍVEL</strong><br>Necessário mais ${pontosNecessarios} pontos para premiação`;
    }
}

function criarGraficoGeral() {
    const ctx = document.getElementById('ppaChartGeral').getContext('2d');
    
    if (ppaChart) ppaChart.destroy();
    
    ppaChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Compras (25%)', 'Estoque (25%)', 'Apontamentos (40%)', 'Orçamento (10%)'],
            datasets: [{
                label: 'Pontuação por Setor',
                data: [notasSetores.compras, notasSetores.estoque, notasSetores.apontamentos, notasSetores.orcamento],
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',   // Verde - Compras
                    'rgba(255, 193, 7, 0.8)',   // Amarelo - Estoque
                    'rgba(0, 123, 255, 0.8)',   // Azul - Apontamentos
                    'rgba(220, 53, 69, 0.8)'    // Vermelho - Orçamento
                ],
                borderColor: [
                    'rgba(40, 167, 69, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(0, 123, 255, 1)',
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Pontuação (0-10)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Desempenho PPA por Setor',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

// === FUNÇÕES UTILITÁRIAS ===

function atualizarBotoes(modo) {
    const btnLimpar = document.getElementById('btn-limpar');
    const btnRelatorio = document.getElementById('btn-relatorio');
    
    if (modo === 'geral') {
        if (btnLimpar) btnLimpar.innerHTML = '🗑️ Limpar Tudo';
        if (btnRelatorio) btnRelatorio.innerHTML = '📄 Relatório Completo';
    } else {
        const nomeSetor = {
            'compras': 'Compras',
            'estoque': 'Estoque',
            'apontamentos': 'Apontamentos',
            'orcamento': 'Orçamento'
        }[modo] || 'Setor';
        
        if (btnLimpar) btnLimpar.innerHTML = `🗑️ Limpar ${nomeSetor}`;
        if (btnRelatorio) btnRelatorio.innerHTML = `📄 Relatório ${nomeSetor}`;
    }
}

function limparSetor() {
    console.log(`🗑️ Limpando setor: ${modoAtual}`);
    
    if (modoAtual === 'geral') {
        // Se estiver na visão geral, limpar tudo
        limparTudo();
        return;
    }
    
    // Limpar todos os inputs do setor atual (number e text)
    const inputs = document.querySelectorAll(`#card-${modoAtual} input`);
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Limpar resultados dos indicadores
    const resultados = document.querySelectorAll(`#card-${modoAtual} .resultado-indicador`);
    resultados.forEach(resultado => {
        resultado.textContent = '0%';
    });
    
    // Resetar nota do setor
    notasSetores[modoAtual] = 0;
    
    // Atualizar displays de nota e contribuição
    const notaElement = document.getElementById(`nota-${modoAtual}`);
    if (notaElement) notaElement.textContent = '0.00';
    
    const contribElement = document.getElementById(`contribuicao-${modoAtual}`);
    if (contribElement) contribElement.textContent = '0.00';
    
    // Limpar gráfico se estiver na visão geral
    if (ppaChart) {
        ppaChart.destroy();
        ppaChart = null;
    }
    
    console.log(`✅ Setor ${modoAtual} limpo com sucesso!`);
}

function limparTudo() {
    console.log('🗑️ Limpando TODOS os setores...');
    
    // Limpar todos os inputs de todos os cards
    const todosInputs = document.querySelectorAll('.setor-card input');
    todosInputs.forEach(input => {
        if (input.id !== 'codigo-almoxarifado') { // Manter código do almoxarifado
            input.value = '';
        }
    });
    
    // Limpar todos os resultados
    const todosResultados = document.querySelectorAll('.resultado-indicador');
    todosResultados.forEach(resultado => {
        resultado.textContent = '0%';
    });
    
    // Resetar todas as notas
    notasSetores = {
        compras: 0,
        estoque: 0,
        apontamentos: 0,
        orcamento: 0
    };
    
    // Atualizar todos os displays
    ['compras', 'estoque', 'apontamentos', 'orcamento'].forEach(setor => {
        const notaElement = document.getElementById(`nota-${setor}`);
        if (notaElement) notaElement.textContent = '0.00';
        
        const contribElement = document.getElementById(`contribuicao-${setor}`);
        if (contribElement) contribElement.textContent = '0.00';
    });
    
    // Limpar visão geral
    const notaFinal = document.getElementById('nota-final');
    if (notaFinal) notaFinal.textContent = '0.00';
    
    // Limpar resumos
    ['resumo-compras', 'resumo-estoque', 'resumo-apontamentos', 'resumo-orcamento'].forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = '0.00';
    });
    
    ['resumo-contrib-compras', 'resumo-contrib-estoque', 'resumo-contrib-apontamentos', 'resumo-contrib-orcamento'].forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = '0.00';
    });
    
    // Limpar premiação
    const statusPremiacao = document.getElementById('status-premiacao-geral');
    if (statusPremiacao) statusPremiacao.textContent = 'Preencha os setores para ver o resultado';
    
    const premiacaoDiv = document.getElementById('premiacao-geral');
    if (premiacaoDiv) {
        premiacaoDiv.classList.remove('premiado', 'nao-premiado');
    }
    
    // Destruir gráfico
    if (ppaChart) {
        ppaChart.destroy();
        ppaChart = null;
    }
    
    console.log('✅ TODOS os setores limpos com sucesso!');
}

function gerarRelatorioSetor() {
    const codigo = document.getElementById('codigo-almoxarifado').value || 'Não informado';
    const trimestre = document.getElementById('trimestre').value || '1';
    
    if (modoAtual === 'geral') {
        gerarExcelCompleto(codigo, trimestre);
    } else {
        gerarExcelSetor(codigo, trimestre, modoAtual);
    }
}

function gerarExcelCompleto(codigo, trimestre) {
    console.log('📊 Gerando Excel completo...');
    
    const notaFinal = (notasSetores.compras * configPPA.pesos.compras + 
                      notasSetores.estoque * configPPA.pesos.estoque + 
                      notasSetores.apontamentos * configPPA.pesos.apontamentos + 
                      notasSetores.orcamento * configPPA.pesos.orcamento);
    
    // Criar workbook
    const wb = XLSX.utils.book_new();
    
    // === ABA 1: RESUMO EXECUTIVO ===
    const dadosResumo = [
        // Cabeçalho principal
        ['RELATÓRIO PPA - PROGRAMA DE PREMIAÇÃO DOS ALMOXARIFADOS', '', '', '', ''],
        [''], 
        
        // Seção Dados Gerais
        ['DADOS GERAIS', '', '', '', ''],
        ['Campo', 'Valor', '', '', ''],
        ['Código do Almoxarifado', codigo, '', '', ''],
        ['Trimestre', `${trimestre}º Trimestre 2025`, '', '', ''],
        ['Data do Relatório', new Date().toLocaleDateString('pt-BR'), '', '', ''],
        ['Desenvolvido por', 'Gabriel Marcelino - Estagiário de Compras', '', '', ''],
        [''], 
        
        // Seção Resultado Final
        ['RESULTADO FINAL', '', '', '', ''],
        ['Métrica', 'Valor', 'Status', '', ''],
        ['Pontuação PPA', notaFinal.toFixed(2), notaFinal >= 8.0 ? 'ELEGÍVEL PARA PREMIAÇÃO' : 'NÃO ELEGÍVEL', '', ''],
        ['Meta Premiação', '8.00', notaFinal >= 8.0 ? 'ATINGIDA' : `Faltam ${(8.0 - notaFinal).toFixed(2)} pontos`, '', ''],
        [''], 
        
        // Seção Resumo por Setor
        ['RESUMO POR SETOR', '', '', '', ''],
        ['Setor', 'Nota Individual', 'Peso (%)', 'Contribuição Final', 'Performance'],
        ['Compras', notasSetores.compras.toFixed(2), '25%', (notasSetores.compras * configPPA.pesos.compras).toFixed(2), obterPerformance(notasSetores.compras)],
        ['Estoque', notasSetores.estoque.toFixed(2), '25%', (notasSetores.estoque * configPPA.pesos.estoque).toFixed(2), obterPerformance(notasSetores.estoque)],
        ['Apontamentos', notasSetores.apontamentos.toFixed(2), '40%', (notasSetores.apontamentos * configPPA.pesos.apontamentos).toFixed(2), obterPerformance(notasSetores.apontamentos)],
        ['Orçamento', notasSetores.orcamento.toFixed(2), '10%', (notasSetores.orcamento * configPPA.pesos.orcamento).toFixed(2), obterPerformance(notasSetores.orcamento)],
        [''], 
        
        // Seção Análise
        ['ANÁLISE GERAL', '', '', '', ''],
        ['Categoria', 'Setor', 'Nota', 'Observação', ''],
        ['Melhor Desempenho', obterMelhorSetor().split(' (')[0], obterMelhorSetor().split(' (')[1]?.replace(')', '') || '', 'Manter estratégias atuais', ''],
        ['Necessita Melhoria', obterPiorSetor().split(' (')[0], obterPiorSetor().split(' (')[1]?.replace(')', '') || '', 'Focar esforços de melhoria', ''],
        ['Classificação Geral', obterClassificacao(notaFinal), notaFinal.toFixed(2), obterRecomendacao(notaFinal), '']
    ];
    
    const wsResumo = XLSX.utils.aoa_to_sheet(dadosResumo);
    
    // Formatação do resumo
    wsResumo['!cols'] = [
        { width: 25 },
        { width: 15 },
        { width: 12 },
        { width: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo Executivo');
    
    // === ABA 2: DADOS DETALHADOS ===
    const dadosDetalhados = [
        // Cabeçalho
        ['DETALHAMENTO POR SETOR - TODOS OS INDICADORES', '', '', '', '', ''],
        [''],
        
        // Cabeçalho da tabela principal
        ['Setor', 'Indicador', 'Resultado', 'Peso no Grupo', 'Nota Final Setor', 'Status'],
        
        // COMPRAS
        ['COMPRAS', 'Compras de Contrato', document.getElementById('compras-resultado')?.textContent || '0 pontos', '60%', notasSetores.compras.toFixed(2), obterStatusIndicador(notasSetores.compras)],
        
        // ESTOQUE  
        ['ESTOQUE', 'Estoque Parado +90 dias', document.getElementById('estoque-resultado-parado')?.textContent || '0%', '25%', '', ''],
        ['', 'Ajuste de Saldo', document.getElementById('estoque-resultado-ajuste')?.textContent || '0%', '25%', '', ''],
        ['', 'Quebra de Diesel', document.getElementById('estoque-resultado-quebra')?.textContent || '0%', '50%', notasSetores.estoque.toFixed(2), obterStatusIndicador(notasSetores.estoque)],
        
        // APONTAMENTOS
        ['APONTAMENTOS', 'Notas no Prazo 10 dias', document.getElementById('apontamentos-resultado-notas')?.textContent || '0%', '15%', '', ''],
        ['', 'Peças Aplicadas', document.getElementById('apontamentos-resultado-aplicadas')?.textContent || '0%', '30%', '', ''],
        ['', 'Peças Retiradas 60% Abaixo', document.getElementById('apontamentos-resultado-retiradas')?.textContent || '0%', '30%', '', ''],
        ['', 'Movimentações Pneus', document.getElementById('apontamentos-resultado-pneus')?.textContent || '0%', '10%', '', ''],
        ['', 'Saída Frota Errada', document.getElementById('apontamentos-resultado-frota')?.textContent || '0%', '15%', notasSetores.apontamentos.toFixed(2), obterStatusIndicador(notasSetores.apontamentos)],
        
        // ORÇAMENTO
        ['ORÇAMENTO', 'Orçamento vs Realizado', document.getElementById('orcamento-resultado')?.textContent || '0%', '100%', notasSetores.orcamento.toFixed(2), obterStatusIndicador(notasSetores.orcamento)],
        
        [''],
        
        // Resumo dos pesos
        ['RESUMO DOS PESOS NO PPA FINAL', '', '', '', '', ''],
        ['Setor', 'Peso no PPA', 'Nota Individual', 'Contribuição', 'Meta Individual', 'Status Meta'],
        ['Compras', '25%', notasSetores.compras.toFixed(2), (notasSetores.compras * configPPA.pesos.compras).toFixed(2), '8.00', notasSetores.compras >= 8.0 ? 'ATINGIDA' : 'ABAIXO'],
        ['Estoque', '25%', notasSetores.estoque.toFixed(2), (notasSetores.estoque * configPPA.pesos.estoque).toFixed(2), '8.00', notasSetores.estoque >= 8.0 ? 'ATINGIDA' : 'ABAIXO'],
        ['Apontamentos', '40%', notasSetores.apontamentos.toFixed(2), (notasSetores.apontamentos * configPPA.pesos.apontamentos).toFixed(2), '8.00', notasSetores.apontamentos >= 8.0 ? 'ATINGIDA' : 'ABAIXO'],
        ['Orçamento', '10%', notasSetores.orcamento.toFixed(2), (notasSetores.orcamento * configPPA.pesos.orcamento).toFixed(2), '8.00', notasSetores.orcamento >= 8.0 ? 'ATINGIDA' : 'ABAIXO']
    ];
    
    const wsDetalhado = XLSX.utils.aoa_to_sheet(dadosDetalhados);
    wsDetalhado['!cols'] = [
        { width: 30 },
        { width: 15 },
        { width: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsDetalhado, 'Dados Detalhados');
    
    // === ABA 3: GRÁFICOS E TENDÊNCIAS ===
    const dadosGrafico = [
        ['DADOS PARA GRÁFICOS E ANÁLISE', '', '', '', '', ''],
        [''],
        
        // Tabela principal para gráfico de barras
        ['DESEMPENHO POR SETOR (Gráfico de Barras)', '', '', '', '', ''],
        ['Setor', 'Nota Individual', 'Peso (%)', 'Contribuição Final', 'Meta (8.0)', 'Diferença'],
        ['Compras', notasSetores.compras.toFixed(2), 25, (notasSetores.compras * configPPA.pesos.compras).toFixed(2), 8.0, (notasSetores.compras - 8.0).toFixed(2)],
        ['Estoque', notasSetores.estoque.toFixed(2), 25, (notasSetores.estoque * configPPA.pesos.estoque).toFixed(2), 8.0, (notasSetores.estoque - 8.0).toFixed(2)],
        ['Apontamentos', notasSetores.apontamentos.toFixed(2), 40, (notasSetores.apontamentos * configPPA.pesos.apontamentos).toFixed(2), 8.0, (notasSetores.apontamentos - 8.0).toFixed(2)],
        ['Orçamento', notasSetores.orcamento.toFixed(2), 10, (notasSetores.orcamento * configPPA.pesos.orcamento).toFixed(2), 8.0, (notasSetores.orcamento - 8.0).toFixed(2)],
        [''],
        
        // Histórico trimestral para gráfico de linha
        ['EVOLUÇÃO HISTÓRICA (Gráfico de Linha)', '', '', '', '', ''],
        ['Trimestre', 'Pontuação PPA', 'Meta', 'Status', 'Tendência', 'Observação'],
        ['1º Trim 2024', 7.2, 8.0, 'Abaixo', 'Crescendo', 'Início da melhoria'],
        ['2º Trim 2024', 7.8, 8.0, 'Abaixo', 'Crescendo', 'Evolução positiva'],
        ['3º Trim 2024', 8.1, 8.0, 'Acima', 'Estável', 'Meta atingida'],
        ['4º Trim 2024', 8.3, 8.0, 'Acima', 'Crescendo', 'Consolidação'],
        [`${trimestre}º Trim 2025`, notaFinal.toFixed(2), 8.0, notaFinal >= 8.0 ? 'Acima' : 'Abaixo', obterTendencia(notaFinal), 'Período atual'],
        [''],
        
        // Dados para gráfico pizza (contribuições)
        ['CONTRIBUIÇÃO POR SETOR (Gráfico Pizza)', '', '', '', '', ''],
        ['Setor', 'Contribuição Absoluta', 'Contribuição %', 'Peso Original %', 'Eficiência', 'Classificação'],
        ['Compras', (notasSetores.compras * configPPA.pesos.compras).toFixed(2), ((notasSetores.compras * configPPA.pesos.compras / notaFinal) * 100).toFixed(1) + '%', '25%', ((notasSetores.compras / 10) * 100).toFixed(1) + '%', obterClassificacaoSetor(notasSetores.compras)],
        ['Estoque', (notasSetores.estoque * configPPA.pesos.estoque).toFixed(2), ((notasSetores.estoque * configPPA.pesos.estoque / notaFinal) * 100).toFixed(1) + '%', '25%', ((notasSetores.estoque / 10) * 100).toFixed(1) + '%', obterClassificacaoSetor(notasSetores.estoque)],
        ['Apontamentos', (notasSetores.apontamentos * configPPA.pesos.apontamentos).toFixed(2), ((notasSetores.apontamentos * configPPA.pesos.apontamentos / notaFinal) * 100).toFixed(1) + '%', '40%', ((notasSetores.apontamentos / 10) * 100).toFixed(1) + '%', obterClassificacaoSetor(notasSetores.apontamentos)],
        ['Orçamento', (notasSetores.orcamento * configPPA.pesos.orcamento).toFixed(2), ((notasSetores.orcamento * configPPA.pesos.orcamento / notaFinal) * 100).toFixed(1) + '%', '10%', ((notasSetores.orcamento / 10) * 100).toFixed(1) + '%', obterClassificacaoSetor(notasSetores.orcamento)]
    ];
    
    const wsGrafico = XLSX.utils.aoa_to_sheet(dadosGrafico);
    wsGrafico['!cols'] = [
        { width: 18 },
        { width: 15 },
        { width: 12 },
        { width: 18 },
        { width: 12 },
        { width: 20 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsGrafico, 'Gráficos e Tendências');
    
    // Salvar arquivo
    const nomeArquivo = `Relatorio_PPA_Completo_${codigo}_${trimestre}T2025.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);
    
    console.log('✅ Excel completo gerado:', nomeArquivo);
}

function gerarExcelSetor(codigo, trimestre, setor) {
    console.log(`📊 Gerando Excel do setor: ${setor}`);
    
    const nomeSetor = {
        'compras': 'Compras',
        'estoque': 'Estoque',
        'apontamentos': 'Apontamentos',
        'orcamento': 'Orçamento'
    }[setor];
    
    const wb = XLSX.utils.book_new();
    
    // Dados específicos do setor
    let dadosSetor = [
        [`RELATÓRIO PPA - ${nomeSetor.toUpperCase()}`],
        [''],
        ['DADOS GERAIS'],
        ['Código do Almoxarifado', codigo],
        ['Setor Analisado', nomeSetor],
        ['Trimestre', `${trimestre}º Trimestre 2025`],
        ['Data do Relatório', new Date().toLocaleDateString('pt-BR')],
        [''],
        ['DESEMPENHO DO SETOR'],
        ['Nota Individual', notasSetores[setor].toFixed(2)],
        ['Peso no PPA Final', `${(configPPA.pesos[setor] * 100)}%`],
        ['Contribuição para PPA', (notasSetores[setor] * configPPA.pesos[setor]).toFixed(2)],
        ['']
    ];
    
    // Adicionar indicadores específicos por setor
    if (setor === 'compras') {
        dadosSetor.push(
            ['INDICADORES DETALHADOS'],
            ['Indicador', 'Resultado', 'Peso'],
            ['Compras de Contrato', document.getElementById('compras-resultado')?.textContent || '0%', '60%']
        );
    } else if (setor === 'estoque') {
        dadosSetor.push(
            ['INDICADORES DETALHADOS'],
            ['Indicador', 'Resultado', 'Peso'],
            ['Estoque Parado +90 dias', document.getElementById('estoque-resultado-parado')?.textContent || '0%', '25%'],
            ['Ajuste de Saldo', document.getElementById('estoque-resultado-ajuste')?.textContent || '0%', '25%'],
            ['Quebra de Diesel', document.getElementById('estoque-resultado-quebra')?.textContent || '0%', '50%']
        );
    } else if (setor === 'apontamentos') {
        dadosSetor.push(
            ['INDICADORES DETALHADOS'],
            ['Indicador', 'Resultado', 'Peso'],
            ['Notas no Prazo 10 dias', document.getElementById('apontamentos-resultado-notas')?.textContent || '0%', '15%'],
            ['Peças Aplicadas', document.getElementById('apontamentos-resultado-aplicadas')?.textContent || '0%', '30%'],
            ['Peças Retiradas 60% Abaixo', document.getElementById('apontamentos-resultado-retiradas')?.textContent || '0%', '30%'],
            ['Movimentações Pneus', document.getElementById('apontamentos-resultado-pneus')?.textContent || '0%', '10%'],
            ['Saída Frota Errada', document.getElementById('apontamentos-resultado-frota')?.textContent || '0%', '15%']
        );
    } else if (setor === 'orcamento') {
        dadosSetor.push(
            ['INDICADORES DETALHADOS'],
            ['Indicador', 'Resultado', 'Peso'],
            ['Orçamento vs Realizado', document.getElementById('orcamento-resultado')?.textContent || '0%', '100%']
        );
    }
    
    const ws = XLSX.utils.aoa_to_sheet(dadosSetor);
    ws['!cols'] = [
        { width: 25 },
        { width: 15 },
        { width: 12 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, nomeSetor);
    
    // Salvar arquivo
    const nomeArquivo = `Relatorio_PPA_${nomeSetor}_${codigo}_${trimestre}T2025.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);
    
    console.log(`✅ Excel do setor ${nomeSetor} gerado:`, nomeArquivo);
}

function obterMelhorSetor() {
    const setores = ['compras', 'estoque', 'apontamentos', 'orcamento'];
    const nomes = {
        'compras': 'Compras',
        'estoque': 'Estoque',
        'apontamentos': 'Apontamentos',
        'orcamento': 'Orçamento'
    };
    
    let melhorSetor = setores[0];
    let melhorNota = notasSetores[setores[0]];
    
    setores.forEach(setor => {
        if (notasSetores[setor] > melhorNota) {
            melhorNota = notasSetores[setor];
            melhorSetor = setor;
        }
    });
    
    return `${nomes[melhorSetor]} (${melhorNota.toFixed(2)})`;
}

function obterPiorSetor() {
    const setores = ['compras', 'estoque', 'apontamentos', 'orcamento'];
    const nomes = {
        'compras': 'Compras',
        'estoque': 'Estoque',
        'apontamentos': 'Apontamentos',
        'orcamento': 'Orçamento'
    };
    
    let piorSetor = setores[0];
    let piorNota = notasSetores[setores[0]];
    
    setores.forEach(setor => {
        if (notasSetores[setor] < piorNota) {
            piorNota = notasSetores[setor];
            piorSetor = setor;
        }
    });
    
    return `${nomes[piorSetor]} (${piorNota.toFixed(2)})`;
}

// Funções auxiliares para o Excel
function obterPerformance(nota) {
    if (nota >= 9.0) return 'EXCELENTE';
    if (nota >= 8.0) return 'BOM';
    if (nota >= 7.0) return 'REGULAR';
    if (nota >= 6.0) return 'ABAIXO';
    return 'CRÍTICO';
}

function obterClassificacao(notaFinal) {
    if (notaFinal >= 9.5) return '1º LUGAR';
    if (notaFinal >= 9.0) return '2º LUGAR';
    if (notaFinal >= 8.5) return '3º LUGAR';
    if (notaFinal >= 8.0) return 'PREMIADO';
    return 'NÃO PREMIADO';
}

function obterRecomendacao(notaFinal) {
    if (notaFinal >= 9.0) return 'Manter excelência';
    if (notaFinal >= 8.0) return 'Sustentar performance';
    if (notaFinal >= 7.0) return 'Melhorar para premiação';
    return 'Ação urgente necessária';
}

function obterStatusIndicador(nota) {
    if (nota >= 8.0) return 'META ATINGIDA';
    if (nota >= 7.0) return 'PRÓXIMO DA META';
    if (nota >= 6.0) return 'ABAIXO DA META';
    return 'CRÍTICO';
}

function obterTendencia(notaAtual) {
    // Simulação baseada na nota atual
    if (notaAtual >= 8.5) return 'Crescendo';
    if (notaAtual >= 7.5) return 'Estável';
    if (notaAtual >= 6.5) return 'Oscilando';
    return 'Declinando';
}

function obterClassificacaoSetor(nota) {
    if (nota >= 9.0) return 'DESTAQUE';
    if (nota >= 8.0) return 'ADEQUADO';
    if (nota >= 7.0) return 'ATENÇÃO';
    return 'CRÍTICO';
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Calculadora PPA v2.0 carregada!');
    console.log('📊 Cards independentes por setor ativados!');
    
    // Modo inicial: Compras
    const botaoCompras = document.querySelector('.modo-btn.active');
    trocarModo('compras', botaoCompras);
});

console.log('💡 Calculadora PPA v2.0 - Cards por Setor!');