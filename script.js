
let canvas = document.getElementById("balloons");
let b = canvas.getContext("2d");
let tx = window.innerWidth;
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

let mousex = 0;
let mousey = 0;

addEventListener("mousemove", function () {
    mousex = event.clientX;
    mousey = event.clientY;
});


let grav = 0.99;
b.strokeWidth = 5;
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}

function Balloon() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() / 5;
    this.update = function () {
        b.beginPath();
        b.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);



        b.arc(75, 75, 50, 0, Math.PI * 2, true);
        b.moveTo(110, 75);
        b.arc(75, 75, 35, 0, Math.PI, false);  // рот (по часовой стрелке)
        b.moveTo(65, 65);
        b.arc(60, 65, 5, 0, Math.PI * 2, true);  // Левый глаз
        b.moveTo(95, 65);
        b.arc(90, 65, 5, 0, Math.PI * 2, true);  // Правый глаз


        b.fillStyle = this.color;
        b.fill();
        b.stroke();
        b.strokeStyle = "white";
    };
}

let bal = [];
for (let i = 0; i < 25; i++) {
    bal.push(new Balloon());
}

function animate() {
    if (tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate);
    b.clearRect(0, 0, tx, ty);
    b.fillRect(0, 0, tx, ty);
    b.strokeRect(0, 0, tx, ty);

    // m.clearRect(0, 0, tx, ty);
    for (let i = 0; i < bal.length; i++) {
        bal[i].update();
        bal[i].y += bal[i].dy;
        bal[i].x += bal[i].dx;
        if (bal[i].y + bal[i].radius >= ty) {
            bal[i].dy = -bal[i].dy * grav;
        } else {
            bal[i].dy += bal[i].vel;
        }
        if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0) {
            bal[i].dx = -bal[i].dx;
        }
        if (mousex > bal[i].x - 20 &&
            mousex < bal[i].x + 20 &&
            mousey > bal[i].y - 50 &&
            mousey < bal[i].y + 50 &&
            bal[i].radius < 70) {
            bal[i].radius += 10;
        } else {
            if (bal[i].radius > bal[i].startradius) {
                bal[i].radius += -5;
            }
        }
    }
}

animate();

setInterval(function () {
    bal.push(new Balloon());
    bal.splice(0, 1);
}, 1000);
