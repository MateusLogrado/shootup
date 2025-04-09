let des = document.getElementById("des").getContext("2d")

let player = new Player(484,500,50,50,"./assets/nave.png")
let enemy01 = new Enemy(250,50,100,100,"./assets/enemy01.png")

let p1 = new Texto()

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
    }
}
//function pontos(){
    //if(player.pts(---)){
     //   player.pts +=100
   // }
//}

//function colisao(){
  //  if(player.colid(---)){
   //     player.vida -= 1
   // }
//}

function atualiza(){
    player.move()
    tiros.atual()
    enemy01.mov()
}

function desenha(){
    p1.des_text(`Pontos: ${player.pts}`,600,50,'black','26px Times')
    player.des_obj()
    tiros.des()
    enemy01.des_obj()
}

function main(){
    des.clearRect(0,0,1050,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()