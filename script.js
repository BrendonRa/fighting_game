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

// Creation
class Sprite {
    constructor ({position, sprite, size, velocity, state, direction, dir, frameAnim}) {
        this.position = position
        this.sprite = sprite
        this.size = size
        this.velocity = velocity
        this.state = state
        this.direction = direction
        this.dir = dir
        this.frameAnim = frameAnim
        this.image = new Image()
    }

    draw() {
        this.image.src = this.sprite[Math.ceil(this.frameAnim / 20)]
        c.save()
        if (this.direction.x != 0) this.dir = this.direction.x
        if (this.dir == -1) c.translate((this.position.x + this.position.x) + this.size.dx / 2, 1)
        c.scale(this.dir, 1)
        c.drawImage(this.image, this.position.x, this.position.y, this.size.dx, this.size.dy)
        c.restore()
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y + this.size.dy - 10 >= canvas.height) {     
            this.velocity.y = 0
        } else this.velocity.y += gravity

        this.velocity.x = 0

        if (this.position.x >= edge.left && this.position.x <= edge.right) {
            this.velocity.x = 3 * this.direction.x
        } else if (this.position.x >= edge.left - player.size.dx / 2 && this.position.x <= edge.right + player.size.dx / 2) {
            this.velocity.x = 3 * (this.dir * -1)
        }

        if (this.velocity.x != 0 && this.state != "jump" && this.state === "idle") this.sprite = samurai.walk
        if (this.velocity.x == 0 && this.state != "jump" && this.state !== "attack") this.sprite = samurai.idle

        this.frameAnim++
        if (this.frameAnim >= (this.sprite.length - 1) * 20) this.frameAnim = 0

        if (this.state === "attack") {
            this.sprite = samurai.attack
            if (Math.ceil(this.frameAnim / 20) == this.sprite.length - 1) this.state = "idle"
        }
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
    dir: -1,
    frameAnim: 0
})

// sides canva
const edge = {
    left: 0,
    right: canvas.width - player.size.dx / 2
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

    if (event.key === "e" && player.state !== "death") {
        player.state = "attack"
    }
    if (event.key === "l" && player2.state !== "death") {
        player2.state = "attack"
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

    /*
    if (collision(player, player2) != false) {
        edge.right = collision(player, player2)
    } else {
        edge.right = canvas.width - player.size.dx / 2
    }
    */

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
animate()

// Collision
function collision(obj1, obj2) {
    // Side left Obj1 and Side Right Obj2
    if (obj1.position.x < obj2.position.x + obj2.size.dx) {
        return obj2.position.x
    }

    // Side Right Obj1 and Side Left Obj2
    if (obj1.position.x + obj1.size.dx > obj2.position.x) {
        return obj1.position.x - obj1.size.dx / 2
    }
    /*
    // Side Up Obj1 and Side Down Obj2
    if (obj1.position.y < obj2.position.y + obj2.size.dy) {
        return obj2.position.y
    }

    // Side Down Obj1 and Side Up Obj2
    if (obj1.position.y + obj1.size.dy > obj2.position.y) {
        return obj1.position.y
    }
    */
    return false
}
