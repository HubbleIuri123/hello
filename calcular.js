// Função para calcular a medida média
function medida() {
    // Seleciona os valores dos inputs e converte para números
    let frente = parseFloat(document.querySelector(".textbox.top").value);
    let fundo = parseFloat(document.querySelector(".textbox.bottom").value);
    let direita = parseFloat(document.querySelector(".textbox.right").value);
    let esquerda = parseFloat(document.querySelector(".textbox.left").value);

    // Verifica se os valores são números válidos
    if (isNaN(frente) || isNaN(fundo) || isNaN(direita) || isNaN(esquerda)) {
        alert("⚠️ ALERTA!\nPor favor, insira todos os valores corretamente.");
        return null;
    }

    // Calcula a média entre as medidas dos lados
    let resultado = ((esquerda + direita) / 2) * ((frente + fundo) / 2);
    return resultado;
}

function metro(a) {
    let litros = a/605;
    return litros;
}

function LitrosdeBraca(a) {
    let litros = a/125;
    return litros;
}

function converteBracaEmMetro(a){
    return a*2.2;
}

function LitrosParaLinhas(a){
    let litros = a/5;
    return litros;
}

function LinhasParaAlqueire(a){
    let alqueire = a/80;
    return alqueire;
}

// Função geral para calcular com base no tipo (metro ou braça)
function calcular(tipo) {
    let area = medida(); // Calcula a área
    if (area === null) return; // Verifica se a medida foi calculada corretamente

    let alqueire;
    let converte;
    let resultado;
    let valorAlqueire = parseFloat(document.querySelector(".valorAlqueire").value);

    if (isNaN(valorAlqueire)) {
        alert("⚠️ ALERTA!\nPor favor, insira todos os valores corretamente.");
        return null;
    }
    
    let infoDiv = document.querySelector(".info");

    if (tipo === 'metro') {
        resultado = metro(area);
        converte = LitrosParaLinhas(resultado);
        alqueire = LinhasParaAlqueire(resultado);

        infoDiv.innerHTML = `<b>MEDIDAS EM METRO<br></b>`;
        infoDiv.innerHTML += `<br>Área: ${area.toFixed(2)}m²`;
        infoDiv.innerHTML += `<br><br>Alqueires: ${Math.trunc(alqueire).toFixed(2)}`;
        infoDiv.innerHTML += `<br>Linhas: ${Math.trunc(converte).toFixed(2)-Math.trunc(alqueire)*16}`;
        infoDiv.innerHTML += `<br>Litros: ${(resultado-((Math.trunc(alqueire)*16+(Math.trunc(converte).toFixed(2)-Math.trunc(alqueire)*16))*5)).toFixed(2)}`;
        infoDiv.innerHTML += `<br><br>Total em reais é: ${(alqueire*valorAlqueire).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}`;

    } else if (tipo === 'braca') {
        /*
        let frente = parseFloat(document.querySelector(".textbox.top").value);
        let fundo = parseFloat(document.querySelector(".textbox.bottom").value);
        let direita = parseFloat(document.querySelector(".textbox.right").value);
        let esquerda = parseFloat(document.querySelector(".textbox.left").value);

        let metrosParaBraca = ((frente*2.2 + fundo*2.2)/2) *((direita*2.2 + esquerda*2.2)/2);
        */
        resultado = LitrosdeBraca(area);
        converte = LitrosParaLinhas(resultado);
        alqueire = LinhasParaAlqueire(resultado);

        infoDiv.innerHTML = `<b>MEDIDAS EM BRAÇA<br></b>`;
        infoDiv.innerHTML += `<br>Área: ${area.toFixed(2)}m²`;
        infoDiv.innerHTML += `<br><br>Alqueires: ${Math.trunc(alqueire).toFixed(2)}`;
        infoDiv.innerHTML += `<br>Linhas: ${Math.trunc(converte).toFixed(2)-Math.trunc(alqueire)*16}`;
        infoDiv.innerHTML += `<br>Litros: ${(resultado-((Math.trunc(alqueire)*16+(Math.trunc(converte).toFixed(2)-Math.trunc(alqueire)*16))*5)).toFixed(2)}`;
        infoDiv.innerHTML += `<br><br>Total em reais é: ${(alqueire*valorAlqueire).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}`;
    }
}

function limpar(){
        // Limpa os campos de entrada específicos
        document.querySelector(".textbox.top").value = '';
        document.querySelector(".textbox.bottom").value = '';
        document.querySelector(".textbox.right").value = '';
        document.querySelector(".textbox.left").value = '';
        document.querySelector(".info").innerHTML = '';
        document.querySelector(".valorAlqueire").value='';
}

document.querySelectorAll('.textbox, .valorAlqueire').forEach((input, index, inputs) => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previne a ação padrão de enviar o formulário (se estiver dentro de um form)
            if (index < inputs.length - 1) {
                inputs[index + 1].focus(); // Move o foco para o próximo input
            }
        }
    });
});