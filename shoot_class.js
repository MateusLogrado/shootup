class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    des_obj(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
            (this.x + this.w > objeto.x)&&
            (this.y < objeto.y + objeto.h)&&
            (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
}

class Bg extends Obj{
    mov(){
        this.y +=5
        if(this.y >= 700){
            this.y = -700
        }
    }
}

class Player extends Obj{
    dirY = 0
    dirX = 0
    vida = 5
    pts = 0
    Bomba = 3
    move(){
        this.x += this.dirX
        this.y += this.dirY
        if(this.x <= +6){
            this.x = 6
        }else if(this.x >= 1000){
            this.x = 1000
        }

        if(this.y <= +6){
            this.y = 6
        }else if(this.y >= 650){
            this.y = 650
        }
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
            (this.x + this.w > objeto.x)&&
            (this.y < objeto.y + objeto.h)&&
            (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
}

class Points{
    pts = 0
    hpts = 0
    atual(){
        if(this.pts > this.hpts){
            this.hpts = this.pts
        }
    }
}

class Enemy extends Obj{
    boss1 = 25
    boss2 = 30
    boss3 = 35
    direita = true
    maxVida = 25
    maxVida2 = 30
    maxvida3 = 35

            mov(){
                if(this.direita == true){
                    this.x += 10
                }else if(this.direita == false){
                    this.x -= 10
                }

                if(this.x === 990){
                    this.direita = false
                }else if(this.x === 10){
                    this.direita = true
                }
            }
}

class Tiro extends Obj{
    des_tiro(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    mov(){
        this.y -= 10
    }
}

class Bomba extends Obj {
    explosaoAtiva = false;
    tempoExplosao = 0;
    danoAplicado = false; // Controle de dano único



    mov() {
        if (!this.explosaoAtiva) {
            this.y -= 7;
            // Ativa explosão ao chegar no topo ou colidir
            if (this.y <= -50) this.iniciarExplosao();
        }
    }

    iniciarExplosao() {
        this.explosaoAtiva = true;
        this.tempoExplosao = 15;
        this.w = 200;
        this.h = 200;
        this.x -= 85;
        this.y -= 85;
    }

    des_bomba() {
        if (!this.explosaoAtiva) {
            des.fillStyle = this.a
            des.beginPath()
            des.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, Math.PI * 2)
            des.fill()
        } else {
            des.fillStyle = 'rgba(255, 50, 50, 0.5)'
            des.beginPath()
            des.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, Math.PI * 2)
            des.fill()
        }
    }
}

class Attack extends Obj{
    attackColuna(){
        this.y += 10
        if(this.y == 0){
            this.y = -1000
            this.x = Math.floor(Math.random() * ((900 - 2 + 1) + 2))
        }
    }

    attackColuna2(){
        this.y += 10
        if(this.y == 500){
            this.y = -1000
            this.x = Math.floor(Math.random() * ((900 - 2 + 1) + 2))
        }
    }

    recomeca(){
        this.y = -1000
        this.x = Math.floor(Math.random() * ((900 - 2 + 1) + 2))
    }

    mov(){
        this.y += 5
    }
}

class Texto{

    des_text(texto,x,y,cor,font){
        des.font = font
        des.lineWidth = '5'
        des.fillStyle = cor
        des.fillText(texto,x,y)
    }
}