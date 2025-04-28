let des = document.getElementById("des").getContext("2d")
let vidaHtml = document.getElementById("vida")
let score = document.getElementById("score")
let Hscore = document.getElementById("hScore")
let bomba = document.getElementById("bomba")

let player = new Player(484,500,70,70,"./assets/nave.png")
let points = new Points()
let textoP = new Texto()
let text1 = new Texto()
let text2 = new Texto()
let emoji = new Obj(800,250,200,200,"./assets/emoji.png")


let enemy01 = new Enemy(250,50,100,100,"./assets/enemy01.png")
let tentaculo1 = new Attack(0,-1200, 80,690, "./assets/tentaculo.PNG")
let tentaculo2 = new Attack(300,-4700, 80,690, "./assets/tentaculo.PNG")
let tentaculo3 = new Attack(400,-6500, 80,690, "./assets/tentaculo.PNG")
let tentaculo4 = new Attack(200,-3300, 80,690, "./assets/tentaculo.PNG")
let background1 = new Bg(0,0,1050,700, "./assets/space.jpg")
let background2 = new Bg(0,-700,1050,700, "./assets/space.jpg")
let background3 = new Bg(0,-1400,1050,700, "./assets/space.jpg")

let enemy02 = new Enemy(250,50,100,100,"./assets/boss2.png")
let a1base = new Obj(0,500,1050,200,"./assets/atq1-base.png")
let a1esquerdo = new Obj(0,0,117,500,"./assets/atq1-esquerdo.png")
let a1direito = new Obj(940,200,117,300,"./assets/atq1-direito.png")
let a1cabeca = new Obj(840,0,217,200,"./assets/atq1-cabeca.png")
let mao1 = new Attack(0, -1200, 200,200, "./assets/mao1.png")
let mao2 = new Attack(200, -1400, 200,200, "./assets/mao2.png")
let mao3 = new Attack(0, -2200, 200,200, "./assets/mao1.png")
let mao4 = new Attack(200, -2400, 200,200, "./assets/mao2.png")

let enemy03 = new Enemy(120,0,860,200,"./assets/bossfinal2.png")
let bracoesq1 = new Obj(0,340,360,350,"./assets/braco1.png")
let bracodir1 = new Obj(690,120,360,350,"./assets/braco2.png")
let bracodir2 = new Obj(690,360,360,350,"./assets/braco2.png")
let espinhos = [];
let spikeCooldown = 0; 
let tempoEspinho = 0;
let ladoEspinho = 'esquerda'; 

let p1 = new Texto()
let vida = new Texto()

let song1 = new Audio("./misc/boss1ST.mp3")
song1.loop = true
song1.Audio = 0.4
let song2 = new Audio("./misc/boss2ST.mp3")
song2.loop = true
song2.Audio = 0.4
let song3 = new Audio("./misc/boss3ST.mp3")
song3.loop = true
song3.Audio = 0.4

document.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    if(e.key === 'ArrowUp'){
        player.dirY = -7
    }else if(e.key === 'ArrowDown'){
        player.dirY = 7
    }
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'ArrowUp'){
        player.dirY = 0
    }else if(e.key === 'ArrowDown'){
        player.dirY = 0
    }
})

document.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    if(e.key === 'ArrowRight'){
        player.dirX = 7
    }else if(e.key === 'ArrowLeft'){
        player.dirX = -7
    }
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'ArrowRight'){
        player.dirX = 0
    }else if(e.key === 'ArrowLeft'){
        player.dirX = 0
    }
})

let podeAtirar = true

document.addEventListener('keydown', (ev)=>{
    if (ev.key === 'x' && podeAtirar === true) {
        grupoTiros.push(new Tiro(player.x - 4 + player.w / 2, player.y, 6, 10, './assets/tiro2.png'))
        podeAtirar = false
        setTimeout(() => { podeAtirar = true }, 200)
    }
})

let podeBombar = true
let bombaU = 3

document.addEventListener('keydown', (ev) => {
    if (ev.key === 'c' && podeBombar && bombaU > 0) {
        grupoBombas.push(new Bomba(
            player.x + player.w/2 - 15,
            player.y,
            30, 30, './assets/c4bangbang.png'
        ))
        bombaU--
        podeBombar = false
        setTimeout(() => podeBombar = true, 2000)
    }
})

let fase = 1

document.addEventListener('keydown', (ev) =>{
    if((ev.key === "r" && player.vida <= 0) || (fase === 4 && ev.key === "r")){
        console.log()
        fase = 1 
        player.fase = 1
        player.vida = 5
        points.pts = 0 
        bombaU = 3
        enemy01.boss1 = 20
        enemy02.boss2 = 25
        enemy03.boss3 = 70
        player.x = 500
        player.y = 350
        tentaculo1.y = -1200
        tentaculo2.y = -4700
        tentaculo3.y = -6500
        tentaculo4.y = -3300
        grupoDiscos.splice(0, grupoDiscos.length)
    }

})

// tiro player, codigo abaixo

let grupoTiros = []
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
        })
    },
    atual(){
        grupoTiros.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y <= -10){
                grupoTiros.splice(grupoTiros.indexOf(tiro),1)
            }
        })
    },

    destroiTiro(){
        grupoTiros.forEach((tiro)=>{
            if(enemy01.boss1 > 0 && fase === 1){
                if(enemy01.colid(tiro) && enemy01.boss1 != 0){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    points.pts +=100
                    console.log(enemy01.boss1)
                    enemy01.boss1 -= 1
                }
            }
            if(enemy02.boss2 > 0 && fase === 2){
                if(enemy02.colid(tiro) && enemy02.boss2 != 0){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    points.pts +=100
                    console.log("asa2")
                    enemy02.boss2 -= 1
                }
            }
            if(enemy03.boss3 > 0 && fase === 3){
                if(enemy03.colid(tiro) && enemy03.boss2 != 0){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    points.pts +=100
                    console.log("asa2")
                    enemy03.boss3 -= 1
                }
            }
        })
    }
}

//tiro do boss, codigo abaixo


let grupoDiscos = []
let discos = {
    time1: 0,
    time2: 0,

    criaDisco(){
        this.time1 += 1
        this.time2 += 1


        let pos_x = (Math.random() * (990 - 2 +1)+2)
        if(this.time1 >=60){
            this.time1 = 0
            grupoDiscos.push(new Attack(pos_x,-200,50,50,'assets/pingu.png'))
        }
        if(this.time1 >=80){
            this.time1 = 0
            grupoDiscos.push(new Attack(pos_x,-440,50,50,'assets/pingu.png'))
        }
    },
    des(){
        grupoDiscos.forEach((disc)=>{
            disc.des_obj()
        })
    },
    destroiDisco(){
        grupoDiscos.forEach((disc)=>{
            if(player.colid(disc) && enemy01.boss1 != 0){
                grupoDiscos.splice(grupoDiscos.indexOf(disc), 1)
                
                player.vida -= 1
            }
        })
    },
    atual(){
        this.criaDisco()
        this.destroiDisco()
        grupoDiscos.forEach((disc)=>{
            disc.mov()
            if(disc.y >= 710){
                grupoDiscos.splice(grupoDiscos.indexOf(disc),1)
            }
        })
    }
}

let grupoBombas = []

function processaBombas() {
    for (let i = grupoBombas.length - 1; i >= 0; i--) {
        const bomba = grupoBombas[i]

        if (!bomba.explosaoAtiva) {
            bomba.mov()
            // Verifica colisão com inimigo
            if (bomba.colid(enemy01) && enemy01.boss1 != 0 && fase === 1) {
                bomba.iniciarExplosao()
            }
            if (bomba.colid(enemy02) && enemy02.boss2 != 0 && fase === 2) {
                bomba.iniciarExplosao()
            }
            if (bomba.colid(enemy03) && enemy02.boss3 != 0 && fase === 3) {
                bomba.iniciarExplosao()
            }
        } else {
            processaExplosao(bomba)
            bomba.tempoExplosao--

            if (bomba.tempoExplosao <= 0) {
                grupoBombas.splice(i, 1)
            }
        }
    }
}

function processaExplosao(bomba) {
    const areaExplosao = new Obj(
        bomba.x,
        bomba.y,
        bomba.w,
        bomba.h,
        ''
    );

    // Aplica dano apenas se a explosão estiver ativa e o dano ainda não foi aplicado
    if (bomba.explosaoAtiva && !bomba.danoAplicado && fase === 1) {
        if (enemy01.colid(areaExplosao) && enemy01.boss1 != 0) {
            const dano = Math.ceil(enemy01.maxVida / 5); // 1/5 da vida máxima
            enemy01.boss1 = Math.max(0, enemy01.boss1 - dano);
            points.pts += 200;
            bomba.danoAplicado = true; // Marca o dano como aplicado
        }
        if (enemy02.colid(areaExplosao) && enemy02.boss2 != 0 && fase === 2) {
            const dano = Math.ceil(enemy02.maxVida2 / 5); // 1/5 da vida máxima
            enemy02.boss2 = Math.max(0, enemy02.maxVida2 - dano);
            points.pts += 200;
            bomba.danoAplicado = true; // Marca o dano como aplicado
        }
        if (enemy03.colid(areaExplosao) && enemy03.boss3 != 0 && fase === 3) {
            const dano = Math.ceil(enemy03.maxVida3 / 5); // 1/5 da vida máxima
            enemy03.boss3 = Math.max(0, enemy03.boss3 - dano);
            console.log(Math.max(0, enemy03.boss3 - dano))
            points.pts += 200;
            bomba.danoAplicado = true; // Marca o dano como aplicado
        }
    }

    // Remove projéteis na área
    for (let i = grupoDiscos.length - 1; i >= 0; i--) {
        if (areaExplosao.colid(grupoDiscos[i])) {
            grupoDiscos.splice(i, 1);
        }
    }
}

let grupoPacmanTiros = []

let pacmanTiros = {
    time: 0,

    criaTiro() {
        this.time += 1;

        // Dispara do lado direito (pacman1) a cada 60 frames
        if (this.time % 60 === 0) {
            this.time = 0;
            grupoPacmanTiros.push(new Attack(
                810, // Sai da borda direita
                300,  // Posição Y fixa (ajuste conforme necessário)
                85, 75, './assets/expelir_pacman.png'
            ));
        }

        // Dispara do lado esquerdo (pacman1b) a cada 80 frames (pode ajustar)
        if (this.time % 80 === 0) {
            grupoPacmanTiros.push(new Attack(
                150, // Sai da borda esquerda
                440, // Posição Y fixa (ajuste conforme necessário)
                85, 75, './assets/expelir_pacman2.png'
            ));
        }
        if (this.time % 60 === 0) {
            this.time = 0;
            grupoPacmanTiros.push(new Attack(
                810, // Sai da borda direita
                550,  // Posição Y fixa (ajuste conforme necessário)
                85, 75, './assets/expelir_pacman.png'
            ));
        }
        
    },

    des() {
        grupoPacmanTiros.forEach((tiro) => {
            tiro.des_obj();
        });
    },

    atual() {
        this.criaTiro();
        grupoPacmanTiros.forEach((tiro) => {
            // Movimentação: pacman1 vai para a esquerda, pacman1b para a direita
            if (tiro.a.includes('pacman.png')) { // Se for o tiro direito
                tiro.x -= 5; // Move para a esquerda
            } else if (tiro.a.includes('pacman2.png')) { // Se for o tiro esquerdo
                tiro.x += 5; // Move para a direita
            }

            // Remove tiros que saíram da tela
            if (tiro.x < -100 || tiro.x > 1150) {
                grupoPacmanTiros.splice(grupoPacmanTiros.indexOf(tiro), 1);
            }

            // Verifica colisão com o jogador
            if (player.colid(tiro)) {
                player.vida -= 1;
                grupoPacmanTiros.splice(grupoPacmanTiros.indexOf(tiro), 1);
            }
        });
    }
};

function criaEspinho() {
    tempoEspinho++;
    
    if (tempoEspinho >= 240 && fase === 3) {
        tempoEspinho = 0;
        ladoEspinho = ladoEspinho === 'esquerda' ? 'direita' : 'esquerda';
        
        espinhos.push({
            x: ladoEspinho === 'esquerda' ? 0 : 525,
            y: 700,
            w: 525,
            h: 0,
            estado: 'aviso',
            timer: 0,
            a: "./assets/satana.png"
        });
    }
}

function atualizaEspinhos() {
    if (spikeCooldown > 0) spikeCooldown--;
    espinhos.forEach((espinho, index) => {
        // Fase de aviso
        if (espinho.estado === 'aviso') {
            espinho.timer++;
            
            // Aviso por 1 segundo (60 frames)
            if (espinho.timer >= 60) {
                espinho.estado = 'crescendo';
                espinho.timer = 0;
            }
        }
        // Fase de crescimento
        else if (espinho.estado === 'crescendo') {
            espinho.h += 15;
            espinho.y = 700 - espinho.h;
            
            // Verifica colisão
            if (player.colid(espinho)) {
                player.vida -= 1;
            }
            
            // Quando chegar no topo
            if (espinho.h >= 700) {
                espinho.estado = 'ativo';
                espinho.timer = 0;
            }
        }
        // Fase ativa (espera antes de desaparecer)
        else if (espinho.estado === 'ativo') {
            espinho.timer++;
            
            // Permanece 2 segundos (120 frames)
            if (espinho.timer >= 120) {
                espinhos.splice(index, 1);
            }
        }
        if (espinho.estado === 'crescendo' || espinho.estado === 'ativo') {
            if (player.colid(espinho) && spikeCooldown <= 0) {
                player.vida -= 1;
                spikeCooldown = 120; // 2 segundos (60fps * 2)
            }
        }
    });
}

function desenhaEspinhos() {
    espinhos.forEach(espinho => {
        if (espinho.estado === 'aviso') {
            textoP.des_text(
                "!",
                espinho.x + 250,
                680,
                "red",
                "40px Arial"
            );
        }
        else {
            let img = new Image();
            img.src = espinho.a;
            des.drawImage(
                img,
                espinho.x,
                espinho.y,
                espinho.w,
                espinho.h
            );
        }
    });
}

function faseUp(){
    if(enemy01.boss1 <= 0 && fase === 1){
        fase = 2
        bombaU = 3
        player.vida = 5
        player.y = 300
        player.x = 500
        player.fase++

    }
    if(enemy02.boss2 <= 0 && fase === 2){
        fase = 3
        bombaU = 3
        player.vida = 5
        player.y = 300
        player.x = 500
        player.fase++
    }

    if(enemy03.boss3 <= 0 && fase === 3){
        fase = 4 
        player.fase++
    }
}

let a1bolcabeca = true
let a1boldireita = true
let a1bolesquerda = true
let a1bolbase = true

function colisao(){
   if(player.colid(tentaculo1) && enemy01.boss1 != 0){
    player.vida -= 1
        tentaculo1.recomeca()
   }else if(player.colid(tentaculo2) && enemy01.boss1 != 0){
    player.vida -= 1
    tentaculo2.recomeca()
   }else if(player.colid(tentaculo3) && enemy01.boss1 != 0){
    player.vida -= 1
    tentaculo3.recomeca()
   }else if(player.colid(tentaculo4) && enemy01.boss1 != 0){
    player.vida -= 1
    tentaculo4.recomeca()
   }
   if(player.colid(a1base) && enemy02.boss2 != 0 && fase === 2 && a1bolbase === true){
    player.vida -= 1
    a1bolbase = false
    setTimeout(()=>{
        a1bolbase = true
    }, 500)
   }else if(player.colid(a1direito) && enemy02.boss2 != 0 && fase === 2 && a1boldireita === true){
    player.vida -= 1
    a1boldireita = false
    setTimeout(()=>{
        a1boldireita = true
    }, 500)
   }else if(player.colid(a1esquerdo) && enemy02.boss2 != 0 && fase === 2 && a1bolesquerda === true){
    player.vida -= 1
    a1bolesquerda = false
    setTimeout(()=>{
        a1bolesquerda = true
    }, 500)
   }else if(player.colid(a1cabeca) && enemy02.boss2 != 0 && fase === 2 && a1bolcabeca === true){
    player.vida -= 1
    a1bolcabeca = false
    setTimeout(()=>{
        a1bolcabeca = true
    }, 500)
   }
   if(player.colid(mao1) && enemy02.boss2 != 0){
    player.vida -= 1
    mao1.recomeca()
   }else if(player.colid(mao2) && enemy02.boss2 != 0){
    player.vida -= 1
    mao2.recomeca()
   }else if(player.colid(mao3) && enemy02.boss2 != 0){
    player.vida -= 1
    mao3.recomeca()
   }else if(player.colid(mao4) && enemy02.boss2 != 0){
    player.vida -= 1
    mao4.recomeca()
   }
   
}

function atualiza(){
    if(player.vida > 0){
        player.move()
        tiros.atual()
        points.atual()
        processaBombas()
    }else{
        textoP.des_text("Recomece apertando com R", 300, 350, "red", "40px Times")
    }
    if(fase === 1){
        enemy01.mov()
        tentaculo1.attackColuna()
        tentaculo2.attackColuna()
        tentaculo3.attackColuna()
        tentaculo4.attackColuna()
        discos.atual()
    }else if(fase === 2){
        enemy02.mov()
        mao1.attackColuna2()
        mao2.attackColuna2()
        mao3.attackColuna2()
        mao4.attackColuna2()
    }else if(fase === 3){
        pacmanTiros.atual()
        criaEspinho()
        atualizaEspinhos()
    }

    background1.mov()
    background2.mov()
    background3.mov()
    tiros.destroiTiro()
    faseUp()
    colisao()
}

function desenha(){
    background1.des_obj()
    background2.des_obj()
    background3.des_obj()
    vidaHtml.innerHTML = `Vida: ${player.vida}`
    if(player.vida > 0){
        player.des_obj()
        tiros.des()
        grupoBombas.forEach(bomba => bomba.des_bomba())
    }

    if(fase === 1){
        song1.play()
        enemy01.des_obj()
        tentaculo1.des_obj()
        tentaculo2.des_obj()
        tentaculo3.des_obj()
        tentaculo4.des_obj()
        discos.des()
    }else if(fase === 2){
        song1.pause()
        song2.play()
        enemy02.des_obj()
        a1base.des_obj()
        a1esquerdo.des_obj()
        a1direito.des_obj()
        a1cabeca.des_obj()
        mao1.des_obj()
        mao2.des_obj()
        mao3.des_obj()
        mao4.des_obj()
    }else if(fase === 3){
        song2.pause()
        song3.play()
        enemy03.des_obj()
        bracoesq1.des_obj()
        bracodir1.des_obj()
        bracodir2.des_obj()
        pacmanTiros.des()
        desenhaEspinhos()
    }else if(fase == 4){
        song3.pause()
        text1.des_text("Vitoria", 450, 280, "red", "40px Times")
        text2.des_text("Pra recomeçar aperte R", 330, 350, "red", "40px Times")
        emoji.des_obj()

    }

    vidaHtml.innerHTML = `Vida: ${player.vida}`
    score.innerHTML = `Score: ${points.pts}`
    Hscore.innerHTML = `H.Score: ${points.hpts}`
    bomba.innerHTML = `Bombas: ${bombaU}`

}

function main(){
    des.clearRect(0,0,1050,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()