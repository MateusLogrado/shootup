let des = document.getElementById("des").getContext("2d")
let vidaHtml = document.getElementById("vida")
let score = document.getElementById("score")
let Hscore = document.getElementById("hScore")

let player = new Player(484,500,50,50,"./assets/nave.png")
let points = new Points()
let enemy01 = new Enemy(250,50,100,100,"./assets/enemy01.png")
let tentaculo1 = new Attack(0,-1200, 80,690, "./assets/tentaculo.PNG")
let tentaculo2 = new Attack(300,-4700, 80,690, "./assets/tentaculo.PNG")
let tentaculo3 = new Attack(400,-6500, 80,690, "./assets/tentaculo.PNG")
let tentaculo4 = new Attack(200,-3300, 80,690, "./assets/tentaculo.PNG")
let background1 = new Bg(0,0,1050,700, "./assets/space.jpg")
let background2 = new Bg(0,-700,1050,700, "./assets/space.jpg")
let background3 = new Bg(0,-1400,1050,700, "./assets/space.jpg")

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
        console.log(grupoTiros)
        podeAtirar = false
        setTimeout(() => { podeAtirar = true }, 200)
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
                grupoTiros.splice(tiro[0],1)
            }
        })
    },

    destroiTiro(){
        grupoTiros.forEach((tiro)=>{
            if(enemy01.boss1 > 0){
                if(enemy01.colid(tiro)){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    points.pts +=100
                    enemy01.boss1 -= 1
                    console.log(enemy01.boss1)
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
            console.log(grupoDiscos)
        }
        if(this.time1 >=80){
            this.time1 = 0
            grupoDiscos.push(new Attack(pos_x,-440,50,50,'assets/pingu.png'))
            console.log(grupoDiscos)
        }
    },
    des(){
        grupoDiscos.forEach((disc)=>{
            disc.des_obj()
        })
    },
    destroiDisco(){
        grupoDiscos.forEach((disc)=>{
            if(player.colid(disc)){
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

//function pontos(){
    //if(player.pts(---)){
     //   player.pts +=100
   // }
//}

function colisao(){
   if(player.colid(tentaculo1)){
    player.vida -= 1
       tentaculo1.recomeca()
   }else if(player.colid(tentaculo2)){
    player.vida -= 1
    tentaculo2.recomeca()
   }else if(player.colid(tentaculo3)){
    player.vida -= 1
    tentaculo3.recomeca()
   }else if(player.colid(tentaculo4)){
    player.vida -= 1
    tentaculo4.recomeca()
   }
}

function atualiza(){
    if(player.vida > 0){
        player.move()
        tiros.atual()
        points.atual()
    }
    if(enemy01.boss1 > 0){
        enemy01.mov()
        tentaculo1.attcakColuna()
        tentaculo2.attcakColuna()
        tentaculo3.attcakColuna()
        tentaculo4.attcakColuna()
        discos.atual()
    }

    background1.mov()
    console.log(background1.y)
    console.log(background2.y)
    console.log(background3.y)
    background2.mov()
    background3.mov()
    tiros.destroiTiro()
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
    }

    if(enemy01.boss1 > 0){
        enemy01.des_obj()
        tentaculo1.des_obj()
        tentaculo2.des_obj()
        tentaculo3.des_obj()
        tentaculo4.des_obj()
        discos.des()
    }

    vidaHtml.innerHTML = `Vida: ${player.vida}`
    score.innerHTML = `Score: ${points.pts}`
    Hscore.innerHTML = `H.Score: ${points.hpts}`

}

function main(){
    des.clearRect(0,0,1050,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()