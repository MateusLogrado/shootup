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

    colid(objeto) {
        if((this.x < objeto.x + objeto.w)&&
            (this.x + this.w > objeto.x)&&
            (this.y < objeto.y + objeto.h)&&
            (this.y + this.h > objeto.y)){
            return true
        }else{
            return false
        }
    }
}

class Player extends Obj{
    dirY = 0
    dirX = 0
    vida = 5
    pontos = 0

    move(){
        this.x += this.dirX
        this.y += this.dirY
        if(this.x <= +6){
            this.x = 6
        }else if(this.x >= 510){
            this.x = 510
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


