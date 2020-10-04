// Declaracao de variaveis
let timer, tempo1, tempo2, tempo_m, tempo_bola;
let vermelho, azul, amarelo, verde;
let tentativa;
let tamanho_bola;
let cores;
let cor;
let p_x, p_y;
let acertos;
let score;
let resposta;
let jogo_ativo;
let start;

// gera uma nova cor aleatoria para a bola a cada 2 segundos
function gerar_nova_cor(tempo_bola) {
    if (frameCount % tempo_bola == 0) {
        // gera a cor aleataria 
        cor = random(cores);
        // gera a posicao em que a bola ira aparecer de forma randomica
        p_x = round(random(200, width - 200));
        p_y = round(random(380, height - 380));
        tamanho_bola = random(50, 140);
        // tentativa ok
        tentativa = true;
        // tempo de apareceimento de um nova bola
        tempo_bola = random([120, 150, 180, 210]);
        // console.log(tempo_bola);
        // tempo que a bola apareceu
        tempo1 = millis();
    }
    // define a cor da bola
    fill(cor);
    // desenha a bola
    circle(p_x, p_y, tamanho_bola)
}

// Cronometro
function count_down_timer() {
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }
}

// funcao de inicializacao
function setup() {
    // variaveis boleanas que controlam o inicio do jogo e liberacao das teclas
    start = false;
    jogo_ativo = false;
    // Tentativa 
    tentativa = false;
    // variaveis de tempo
    timer = 5;
    tempo1 = 0;
    tempo2 = 0;
    tempo_m = 0;
    tempo_bola = 60;
    score = 0;
    // tamanho da bola
    tamanho_bola = random(50, 140);
    // Resposta certa ou errada do usuario
    resposta = '';
    // Numero de acertos
    acertos = 0;
    // cores
    vermelho = color(255, 0, 0);
    azul = color(0, 0, 255);
    amarelo = color(255, 255, 0);
    verde = color(0, 255, 0);
    // arrey com as cores
    cores = [vermelho, azul, amarelo, verde];
    // Sortei de uma cor inicial
    cor = random(cores);
    // Posicoes iniciais da bola de forma aleatoria
    p_x = round(random(200, width - 200));
    p_y = round(random(380, height - 380));
    // criacao da tela do jogo
    createCanvas(720, 720);
    // Definicao do framerate do jogo
    frameRate(60);
}

function draw() {
    // Limpa a tela
    clear();
    // Define a cor da tela
    background(220);
    // Tamanho do texto
    textSize(100);
    // Identacao do texto ao centro
    textAlign(CENTER, CENTER);
    // Cor dos elementos desenhados como preto
    fill(0);
    // Verificaco para iniciar o jogo
    if (start == false) {
        textSize(50);
        text('START', ((width / 2)), 300);
        // Verificacao se foi clicado no texto
        if (mouseIsPressed) {
            if ((mouseX >= ((width / 2) - 80) && mouseX <= ((width / 2) + 80)) && (mouseY >= (270) && mouseY <= 320)) {
                start = true;
            }
        }
    } else {
        // Aparecimento do cronometro para o inicio do jogo
        text(timer, width / 2, height / 2);
        count_down_timer();
        if (timer == 0) {
            // Enquanto o jogador nao 'ganhou'
            if (score < 10) {
                background(220);
                jogo_ativo = true;
                // Gerando uma bola com uma nova cor e posicao
                gerar_nova_cor(tempo_bola);
                fill(0);
                textSize(20);
                text("Restart", 50, 60);
                // Verificacao se foi clicado no texto
                if (mouseIsPressed) {
                    if ((mouseX >= (15) && mouseX <= (90)) && (mouseY >= (50) && mouseY <= 70)) {
                        setup();
                    }
                }
                text('Tempo de resposta: ' + round(tempo2, 2), 300, 50);
                text('Tempo de resposta media: ' + round(tempo_m / acertos, 2), 300, 80);
                text(resposta, 600, 50);
                text(score, width - 50, 50);
                // console.log(tempo2);
            } else {
                // Quando o jogador termina "ganha"
                background(220);
                // console.log(tempo2);
                jogo_ativo = false;
                textSize(50);
                text('Resultado', ((width / 2)), 300);
                textSize(20);
                text('Tempo de resposta media: ' + round(tempo_m / acertos, 2) + 'ms', ((width / 2)), 350);
                text('Score: ' + score, ((width / 2)), 380);
                textSize(40);
                text("Restart", ((width / 2)), 450);
                // Verificacao se foi clicado no texto
                if (mouseIsPressed) {
                    if ((mouseX >= ((width / 2) - 70) && mouseX <= ((width / 2) + 70)) && (mouseY >= (430) && mouseY <= 470)) {
                        setup();
                    }
                }
            }
        }
    }
}
//Funcao que verifica se uma respectiva tecla foi precionada
function keyPressed() {
    // Verifica se o jogo esta em execucao
    if (jogo_ativo == true && tentativa == true) {
        // Verifica se a tecla de seta para esquerda foi ativada e a bola atual e da cor vermelha
        if ((keyCode === LEFT_ARROW) && (cor === vermelho)) {
            // calcula o tempo entre o surgimento da bola e a respota do usuario
            tempo2 = millis() - tempo1;
            // acumula o tempo de resposta
            tempo_m = tempo_m + tempo2;
            // incrementa o score
            score = score + 1;
            // Resposta correta
            resposta = 'ACERTO';
            // incrementa o numero de acertos
            acertos = acertos + 1;
            // desabilita tentativa 
            tentativa = false;
            // Verifica se a tecla de seta para cima foi ativada e a bola atual e da cor azul
        } else if ((keyCode === UP_ARROW) && (cor === azul)) {
            // calcula o tempo entre o surgimento da bola e a respota do usuario
            tempo2 = millis() - tempo1;
            // acumula o tempo de resposta
            tempo_m = tempo_m + tempo2;
            // incrementa o score
            score = score + 1;
            // Resposta correta
            resposta = 'ACERTO';
            // incrementa o numero de acertos
            acertos = acertos + 1;
            // desabilita tentativa 
            tentativa = false;
            // Verifica se a tecla de seta para direita foi ativada e a bola atual e da cor amarelo
        } else if ((keyCode === RIGHT_ARROW) && (cor === amarelo)) {
            // calcula o tempo entre o surgimento da bola e a respota do usuario
            tempo2 = millis() - tempo1;
            // acumula o tempo de resposta
            tempo_m = tempo_m + tempo2;
            // incrementa o score
            score = score + 1;
            // Resposta correta
            resposta = 'ACERTO';
            // incrementa o numero de acertos
            acertos = acertos + 1;
            // desabilita tentativa 
            tentativa = false;
            // Verifica se a tecla de seta para baixo foi ativada e a bola atual e da cor verde
        } else if ((keyCode === DOWN_ARROW) && (cor === verde)) {
            // calcula o tempo entre o surgimento da bola e a respota do usuario
            tempo2 = millis() - tempo1;
            // acumula o tempo de resposta
            tempo_m = tempo_m + tempo2;
            // incrementa o score
            score = score + 1;
            // Resposta correta
            resposta = 'ACERTO';
            // incrementa o numero de acertos
            acertos = acertos + 1;
            // desabilita tentativa 
            tentativa = false;
            // Verifica se uma tecla foi ativada e nao corresponde a nenhuma combinacao acima
        } else {
            // calcula o tempo entre o surgimento da bola e a respota do usuario
            tempo2 = tempo2 = millis() - tempo1;
            // Decrementa o score
            score = score - 1;
            // Resposta errada
            resposta = 'ERRO';
            // desabilita tentativa 
            tentativa = false;
        }
    }
}