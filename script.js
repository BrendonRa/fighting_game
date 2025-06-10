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

const gravity = 0.2
let anim

// Creation
class Sprite {
    constructor ({position, sprite, size, velocity, state, direction, frameAnim}) {
        this.position = position
        this.sprite = sprite
        this.size = size
        this.velocity = velocity
        this.state = state
        this.direction = direction
        this.frameAnim = frameAnim
    }

    draw() {
        this.image = new Image()
        this.image.src = this.sprite[Math.ceil(this.frameAnim / 20)]
        c.drawImage(this.image, this.position.x, this.position.y, this.size.dx, this.size.dy)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y + this.size.dy - 10 >= canvas.height) {     
            this.velocity.y = 0
        } else this.velocity.y += gravity

        this.velocity.x = 0

        if (this.position.x >= edge.left) {
            this.velocity.x = 3 * this.direction.x
        }
        
        if (this.position.x <= edge.right) {
            this.velocity.x = 3 * this.direction.x
        }

        /*if (keys.jumpP.pressed && this.velocity.y <= 0) {
            this.velocity.y = -6 * this.direction.y
        }*/

        if (this.velocity.x != 0 && this.state != "jump" && this.state == "idle") this.sprite = samurai.walk
        if (this.velocity.x == 0 && this.state != "jump") this.sprite = samurai.idle

        this.frameAnim++
        if (this.frameAnim >= (this.sprite.length - 1) * 20) this.frameAnim = 0

        console.log(this.frameAnim)
    }
}



// Characters

const samurai = {
    idle: ["img/characters/samurai/idle/idle1.png", 
        "img/characters/samurai/idle/idle2.png", 
        "img/characters/samurai/idle/idle3.png", 
        "img/characters/samurai/idle/idle4.png", 
        "img/characters/samurai/idle/idle5.png", 
        "img/characters/samurai/idle/idle6.png"
    ],
    walk: ["img/characters/samurai/walk/walk1.png", 
        "img/characters/samurai/walk/walk2.png", 
        "img/characters/samurai/walk/walk3.png", 
        "img/characters/samurai/walk/walk4.png", 
        "img/characters/samurai/walk/walk5.png", 
        "img/characters/samurai/walk/walk6.png", 
        "img/characters/samurai/walk/walk7.png", 
        "img/characters/samurai/walk/walk8.png", 
        "img/characters/samurai/walk/walk9.png"
    ],
    attack: ["img/characters/samurai/attack/attack1.png",
        "img/characters/samurai/attack/attack2.png",
        "img/characters/samurai/attack/attack3.png",
        "img/characters/samurai/attack/attack4.png"
    ],
    death: ["img/characters/samurai/dead/dead1.png",
        "img/characters/samurai/dead/dead2.png",
        "img/characters/samurai/dead/dead3.png",
        "img/characters/samurai/dead/dead4.png",
        "img/characters/samurai/dead/dead5.png",
        "img/characters/samurai/dead/dead6.png"
    ]
}

const player = new Sprite({
    position: {
        x: canvas.width / 6,
        y: 100
    },
    sprite: samurai.idle,
    size: {
        dx: 192,
        dy: 192
    },
    velocity: {
        x: 0,
        y: 0
    },
    state: "idle",
    direction: {
        x: 0,
        y: 0
    },
    frameAnim: 0
})

const player2 = new Sprite({
    position: {
        x: (canvas.width / 3) * 2,
        y: 100
    },
    sprite: samurai.idle,
    size: {
        dx: 192,
        dy: 192
    },
    velocity: {
        x: 0,
        y: 0
    },
    state: "idle",
    direction: {
        x: 0,
        y: 0
    },
    frameAnim: 0
})

// sides canva
const edge = {
    left: 0,
    right: canvas.width - player.size.dx
}

// imputs
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "d":
            player.direction.x = 1
            break
        case "a":
            player.direction.x = -1
            break
        case "ArrowLeft":
            player2.direction.x = -1
            break
        case "ArrowRight":
            player2.direction.x = 1
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
            player.direction.x = 0
            break
        case "a":
            player.direction.x = 0
            break
        case "ArrowLeft":
            player2.direction.x = 0
            break
        case "ArrowRight":
            player2.direction.x = 0
            break
    }
})

// Animation
function animate() {
    window.requestAnimationFrame(animate)
    
    c.drawImage(scene, 0, 0, canvas.width, canvas.height)
    
    player.update()
    player2.update()
}
animate()
