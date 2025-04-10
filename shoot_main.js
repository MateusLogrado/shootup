let des = document.getElementById("des").getContext("2d")
let vidaHtml = document.getElementById("vida")

let player = new Player(484,500,50,50,"./assets/nave.png")
let enemy01 = new Enemy(250,50,100,100,"./assets/enemy01.png")
let tentaculo1 = new Attack(0,-1200, 80,690, "./assets/tentaculo.PNG")
let tentaculo2 = new Attack(300,-4700, 80,690, "./assets/tentaculo.PNG")
let tentaculo3 = new Attack(400,-6500, 80,690, "./assets/tentaculo.PNG")
let tentaculo4 = new Attack(200,-3300, 80,690, "./assets/tentaculo.PNG")

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

document.addEventListener('keypress', (ev)=>{
    if (ev.key === 'x') {
        grupoTiros.push(new Tiro(player.x - 4 + player.w / 2, player.y, 8, 16, 'red'))
        console.log(grupoTiros)
    }
})

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
                    player.pts +=100
                    enemy01.boss1 -= 1
                    console.log(enemy01.boss1)
                }
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
    }
    if(enemy01.boss1 > 0){
        enemy01.mov()
        tentaculo1.attcakColuna()
        tentaculo2.attcakColuna()
        tentaculo3.attcakColuna()
        tentaculo4.attcakColuna()
    }

    tiros.destroiTiro()
    colisao()
}

function desenha(){
    p1.des_text(`Pontos: ${player.pts}`,600,50,'black','26px Times')
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
    }

    vidaHtml.innerHTML = `Vida: ${player.vida}`

}

function main(){
    des.clearRect(0,0,1050,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()