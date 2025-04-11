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

class Player extends Obj{
    dirY = 0
    dirX = 0
    vida = 5
    pts = 0

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

class Enemy extends Obj{
    boss1 = 50
    direita = true

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

class Attack extends Obj{
    attcakColuna(){
        this.y += 10
        if(this.y == 0){
            this.y = -1000
            this.x = Math.floor(Math.random() * ((900 - 2 + 1) + 2))
        }
    }

    recomeca(){
        this.y = -1000
        this.x = Math.floor(Math.random() * ((900 - 2 + 1) + 2))
    }
}

class Texto{

    des_text(texto,x,y,cor,font){
        des.font = font
        des.fillStyle = cor
        des.fillText(texto,x,y)
    }
}

