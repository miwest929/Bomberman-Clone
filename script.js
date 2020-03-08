console.log('running')
window.onload = () => {
    const startGame = () => {
        console.log('start function');
        context = canvas.getContext("2d");
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const renderMap = () => {
        let gridWidth = canvas.width/map[0].length
        let gridHeigth = canvas.height/map.length
        for (let i = 0; i < map.length; i += 1) {
            for (let j = 0; j < map[0].length; j += 1) {
                if (map[i][j] === 1) {
                    context.fillStyle = 'gray';
                    context.fillRect(j * gridWidth, i * gridHeigth, gridWidth, gridHeigth)
                }
            }
        }
    }

    let myGameArea = {
        canvas: document.getElementById("canvas"),
        frames: 0,
    }

    const clear = () => {
        console.log('clear');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const updateGameArea = () => {
        clear();
        renderMap()
        newPlayer.newPos();
        newPlayer.update();
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    class Player {
        constructor() {
            this.lives = 10;
            this.x = 60;
            this.y = 60;
            this.speed = 2.5;
            this.speedX = 0;
            this.speedY = 0;
        }

        update() {
            context.fillStyle = 'blue';
            context.fillRect(this.x, this.y, 30, 30)
        }

        newPos() {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        left() {
            return this.x;
        }
        right() {
            if (this.x + 50 < canvas.width) {
                console.log('bateu')
                return this.x + this.width;
            } else {
                console.log('nao bateu')
                return this.x;
            }
        }
        top() {
            return this.y;
        }
        bottom() {
            return this.y + this.height;
        }
        dropBomb(x, y) {
            console.log('dropBomb')

            context.fillRect(x, y, 50, 50)
        }

    }

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 65: // a
            case 37: // left arrow
                newPlayer.speedX = newPlayer.speed * -1;
                break;
            case 87: // w
            case 38: // arrow up
                newPlayer.speedY = newPlayer.speed * -1;
                break;
            case 68: // d
            case 39: // right arrow
                newPlayer.speedX = newPlayer.speed;
                break;
            case 83: // s
            case 40: // arrow down
                newPlayer.speedY = newPlayer.speed;
                break;
            case 32: // spacebar
                newPlayer.dropBomb(newPlayer.x, newPlayer.y);
                break;
        }
    }

    document.onkeyup = function (e) {
        newPlayer.speedX = 0;
        newPlayer.speedY = 0;
    }

    startGame();

    let newPlayer = new Player()

}