// Variables
const canvas = document.querySelector("#canvas")

canvas.width = 1024
canvas.height = 576

const c = canvas.getContext("2d")

c.fillRect(0,0,canvas.width, canvas.height)

const spriteP = "img/characters/samurai/idle/idle1.png"
const spriteE = "img/characters/samurai/idle/idle1.png"

const scene = new Image()
scene.src = "img/scenes/forest/background_forest.png"

let temp
const gravity = 0.2

// Creation
class Sprite {
    constructor ({position, color, size, velocity, state}) {
        this.position = position
        this.color = color
        this.image = new Image()
        this.image.src = this.color
        this.size = size
        this.velocity = velocity
        this.state = state
    }

    draw() {
        if (this.state == "idle") {
            c.drawImage(this.image, this.position.x, this.position.y, this.size.dx, this.size.dy)
        }
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y + this.size.dy - 10 >= canvas.height) {     
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

// Characters

const samurai = {
    idle: [],
    walk: [],
    attack: [],
    death: []
}

const player = new Sprite({
    position: {
        x: canvas.width / 6,
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
    },
    state: "idle"
})

const player2 = new Sprite({
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
    },
    state: "idle"
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
    if (event.key === "ArrowUp" && player2.velocity.y === 0) {
        player2.velocity.y = -6
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
    
    c.drawImage(scene, 0, 0, canvas.width, canvas.height)
    
    player.update()
    player2.update()

    player.velocity.x = 0
    player2.velocity.x = 0

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
        if (player2.position.x >= edge.left) {
            player2.velocity.x = -3
        }
    }

    if (keys.rightE.pressed) {
        if (player2.position.x <= edge.right) {
            player2.velocity.x = 3
        }
    }
    
    if (keys.jumpP.pressed && player.velocity.y <= 0) {
        player.velocity.y = -6
    }

    if (keys.jumpE.pressed && player2.velocity.y <= 0) {
        player2.velocity.y = -6
    }
}
animate()