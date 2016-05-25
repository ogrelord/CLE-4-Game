var Game = (function () {
    function Game() {
        this.Healthys = new Array();
        this.Apples = new Array();
        this.frameCounter = 0;
        this.spawnFrequency = 360;
        this.player = new Player;
        this.utils = new Utils();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.spawnObject = function () {
        this.Healthys.push(new Healthy());
    };
    Game.prototype.gameLoop = function () {
        this.frameCounter++;
        if (this.frameCounter > this.spawnFrequency) {
            this.spawnObject();
            this.frameCounter = 0;
            console.log(this.frameCounter);
        }
        this.player.move();
        for (var i = 0; i < this.Healthys.length; i++) {
            this.Healthys[i].update();
        }
        for (var i = 0; i < this.Apples.length; i++) {
            this.Apples[i].update();
        }
        this.updateElements();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.updateElements = function () {
        for (var _i = 0, _a = this.Healthys; _i < _a.length; _i++) {
            var h = _a[_i];
            if (this.utils.hasOverlap(h, this.player))
                h.hit();
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.hasOverlap = function (c1, c2) {
        return !(c2.posX > c1.posX + c1.width || c2.posX + c2.width < c1.posX || c2.posY > c1.posY + c1.height || c2.posY + c2.height < c1.posY);
    };
    return Utils;
}());
var Healthy = (function () {
    function Healthy() {
        this.rightkey = 37;
        this.leftkey = 39;
        this.count = 0;
        this.div = document.createElement("healthy");
        document.body.appendChild(this.div);
        this.startPosition();
    }
    Healthy.prototype.startPosition = function () {
        this.posX = 500;
        this.posY = -50;
        this.width = 50;
        this.height = 50;
        this.posX = (Math.random() * window.innerWidth);
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Healthy.prototype.hit = function () {
        console.log("hit");
        this.count++;
    };
    Healthy.prototype.update = function () {
        this.posY += 5;
        if (this.count == 1) {
            document.body.removeChild(this.div);
        }
        if (this.count == 0) {
            if (this.posY == window.innerHeight + 200) {
                console.log("ben je er?");
                document.body.removeChild(this.div);
            }
        }
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    return Healthy;
}());
var apple = (function () {
    function apple() {
        this.rightkey = 37;
        this.leftkey = 39;
        this.count = 0;
        this.div = document.createElement("apple");
        document.body.appendChild(this.div);
        this.startPosition();
    }
    apple.prototype.startPosition = function () {
        this.posX = 500;
        this.posY = -50;
        this.width = 50;
        this.height = 50;
        this.posX = (Math.random() * window.innerWidth);
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    apple.prototype.hit = function () {
        console.log("hit");
        this.count++;
        if (this.count == 1) {
            document.body.removeChild(this.div);
        }
    };
    apple.prototype.update = function () {
        this.posY += 2;
        if (this.posY == window.innerHeight + 200) {
            console.log("posY waarde --> " + this.posY);
            document.body.removeChild(this.div);
            console.log("tesjes");
        }
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    return apple;
}());
var Player = (function () {
    function Player() {
        this.rightkey = 37;
        this.leftkey = 39;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.startPosition();
    }
    Player.prototype.startPosition = function () {
        this.posX = window.innerWidth - 130;
        this.posY = window.innerHeight - 100;
        this.width = 130;
        this.height = 110;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.rightkey:
                this.upSpeed = 5;
                break;
            case this.leftkey:
                this.downSpeed = 5;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.rightkey:
                this.upSpeed = 0;
                break;
            case this.leftkey:
                this.downSpeed = 0;
                break;
        }
    };
    Player.prototype.move = function () {
        this.posX = this.posX - this.upSpeed + this.downSpeed;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) scaleX(-1)";
    };
    return Player;
}());
//# sourceMappingURL=main.js.map