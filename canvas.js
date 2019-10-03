const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

//Rectangle
// c.fillRect(x, y, width, height)
// c.fillStyle = 'rgba(255, 0, 0, 0.3)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 80, 125, 0.3)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(100, 125, 200, 0.3)';
// c.fillRect(100, 400, 100, 100);

//Line
// c.beginPath();
// c.moveTo(50,250);
// c.lineTo(100,100);
// c.strokeStyle = 'blue';
// c.stroke();

//Arc
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'red';
// c.stroke();

// for(let i=0;i<3000;i++){
//     let x = Math.random()* window.innerWidth;
//     let y = Math.random()* window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgba(${Math.random()* 255}, ${Math.random()* 255}, ${Math.random()* 255}, 0.3)`;
//     c.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined
}
const MAX_RADIUS = 40;
// const MIN_RADIUS = 2;

let colorArray = ['red', 'green', 'blue', 'yellow', 'black', 'orange', 'pink'];

document.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('resize', (event) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, radius, dx, dy ){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.MIN_RADIUS = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
}
Circle.prototype.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = 'red';
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
}
Circle.prototype.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
        this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;


    //Interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if(this. radius < MAX_RADIUS){
            this.radius += 1;
        }
    } else if(this.radius > this.MIN_RADIUS){
        this.radius -= 1;
    }


    this.draw();
}

// let circle = new Circle(200, 200, 30, 4, 4);

let cirleArray = [];

function init(){
    cirleArray = [];
    for(let i=0; i<100; i++){
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2);
        let dx = (Math.random()-0.5) * 3;
        let dy = (Math.random()-0.5) * 3;
        let circle = new Circle(x, y, radius, dx, dy);
        cirleArray.push(circle);
    }
    //console.log(cirleArray);
}
// circle.draw();

function animate(circle){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    // circle.draw();
    // circle.update();

    cirleArray.forEach((circleObject) => {
        circleObject.update();
    })

    // c.beginPath();
    // c.arc(x, y, radius, 0, Math.PI * 2, false);
    // c.strokeStyle = 'red';
    // c.stroke();

}
init();
animate();