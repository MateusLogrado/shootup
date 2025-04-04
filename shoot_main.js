let des = document.getElementById("des").getContext("2d")

let player = new Player(150,250,100,50,"./assets/nave.png")

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
function atualiza(){
    player.move()
    tiros.atual()
}

function desenha(){
    player.des_obj()
    tiros.des()
}

function main(){
    des.clearRect(0,0,1050,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()