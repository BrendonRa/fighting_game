// Variables
const canvas = document.querySelector("#canvas")

let fundoPosicaoX
let fundoPosicaoY

const background = document.body.style

canvas.width = 1024
canvas.height = 576

const c = canvas.getContext("2d")

c.fillRect(0,0,canvas.width, canvas.height)

const spriteP = "img/personas/mino/idle/mino_idle_anim.png"
const spriteE = "img/personas/mino/idle/mino_idle_anim.png"

const scenario = new Image()
scenario.src = "img/cenarito/cenario.jpg"

let temp
const gravity = 0.2

// Creation
class Sprite {
    constructor ({position, color, size, velocity}) {
        this.position = position
        this.color = color
        this.image = new Image()
        this.image.src = this.color
        this.size = size
        this.velocity = velocity
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.size.dx, this.size.dy)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y + this.size.dy + 30 >= canvas.height) {     
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

// Characters
const player = new Sprite({
    position: {
        x: canvas.width / 3,
        y: 100
    },
    color: spriteP,
    size: {
        dx: 192,
        dy: 192
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: (canvas.width / 3) * 2,
        y: 100
    },
    color: spriteE,
    size: {
        dx: 192,
        dy: 192
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// sides canva
const edge = {
    left: 0,
    right: canvas.width - player.size.dx
}

// imputs
const keys = {
    leftP: {
        pressed: false
    },
    rightP: {
        pressed: false
    },
    jumpP: {
        pressed: false
    },
    leftE: {
        pressed: false
    },
    rightE: {
        pressed: false
    },
    jumpE: {
        pressed: false
    },
}

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "d":
            keys.rightP.pressed = true
            break
        case "a":
            keys.leftP.pressed = true
            break
        case "ArrowLeft":
            keys.leftE.pressed = true
            break
        case "ArrowRight":
            keys.rightE.pressed = true
            break
    }

    if (event.key === "w" && player.velocity.y === 0) {
        player.velocity.y = -6
    }
    if (event.key === "ArrowUp" && enemy.velocity.y === 0) {
        enemy.velocity.y = -6
    }
})

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "d":
            keys.rightP.pressed = false
            break
        case "a":
            keys.leftP.pressed = false
            break
        case "ArrowLeft":
            keys.leftE.pressed = false
            break
        case "ArrowRight":
            keys.rightE.pressed = false
            break
    }
})

// Animation
function animate() {
    window.requestAnimationFrame(animate)
    
    c.drawImage(scenario, 0, 0, canvas.width, canvas.height)
    
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    if (keys.leftP.pressed) {
        if (player.position.x >= edge.left) {
            player.velocity.x = -3
        }
    }
    
    if (keys.rightP.pressed) {
        if (player.position.x <= edge.right) {
            player.velocity.x = 3
        }
    }

    if (keys.leftE.pressed) {
        if (enemy.position.x >= edge.left) {
            enemy.velocity.x = -3
        }
    }

    if (keys.rightE.pressed) {
        if (enemy.position.x <= edge.right) {
            enemy.velocity.x = 3
        }
    }
    
    if (keys.jumpP.pressed && player.velocity.y <= 0) {
        player.velocity.y = -6
    }

    if (keys.jumpE.pressed && enemy.velocity.y <= 0) {
        enemy.velocity.y = -6
    }

    fundoPosicaoX = player.position.x
    fundoPosicaoY = player.position.y

    background.backgroundPositionX = fundoPosicaoX
    background.backgroundPositionY = fundoPosicaoY
}
animate()