let des = document.getElementById("des").getContext("2d")
let vidaHtml = document.getElementById("vida")
let score = document.getElementById("score")
let Hscore = document.getElementById("hScore")
let bomba = document.getElementById("bomba")

let player = new Player(484,500,50,50,"./assets/nave.png")
let points = new Points()
let textoP = new Texto()

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

let p1 = new Texto()
let vida = new Texto()

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
        grupoTiros.push(new Tiro(player.x - 4 + player.w / 2, player.y, 8, 16, 'red'))
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
            30, 30, 'purple'
        ))
        bombaU--
        podeBombar = false
        setTimeout(() => podeBombar = true, 2000)
    }
})

let fase = 1

document.addEventListener('keydown', (ev) =>{
    if(ev.key === "r" && player.vida <= 0){
        fase = 1 
        player.vida = 5
        points.pts = 0 
        bombaU = 3
        enemy01.boss1 = 25
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
            if (bomba.colid(enemy01) && enemy01.boss1 != 0) {
                bomba.iniciarExplosao()
            }
            if (bomba.colid(enemy02) && enemy02.boss2 != 0) {
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
    if (bomba.explosaoAtiva && !bomba.danoAplicado) {
        if (enemy01.colid(areaExplosao) && enemy01.boss1 != 0) {
            const dano = Math.ceil(enemy01.maxVida / 5); // 1/5 da vida máxima
            enemy01.boss1 = Math.max(0, enemy01.boss1 - dano);
            points.pts += 200;
            bomba.danoAplicado = true; // Marca o dano como aplicado
        }
        if (enemy02.colid(areaExplosao) && enemy02.boss2 != 0) {
            const dano = Math.ceil(enemy01.maxVida2 / 5); // 1/5 da vida máxima
            enemy02.boss2 = Math.max(0, enemy02.boss2 - dano);
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

function faseUp(){
    if(enemy01.boss1 <= 0 && fase === 1){
        fase = 2
        bombaU = 3
        player.vida = 5
        player.y = 300
        player.x = 500

    }
    if(enemy02.boss2 <= 0 && fase === 2){
        fase = 3
        bombaU = 3
        player.vida = 5
        player.y = 300
        player.x = 500
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
        enemy01.des_obj()
        tentaculo1.des_obj()
        tentaculo2.des_obj()
        tentaculo3.des_obj()
        tentaculo4.des_obj()
        discos.des()
    }else if(fase === 2){
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