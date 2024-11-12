class Line{
    constructor(x0, y0, x1, y1){
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
    drawLine(weight=3, color=[0,0,255]){
        strokeWeight(weight);
        stroke(color[0],color[1],color[2]);
        line(this.x0, this.y0, this.x1, this.y1);
    }
}

let lines = [];
let intersection;
let rays;
let points;

function setup() {
    createCanvas(500, 500);
    line1 = new Line(75,60,344,60);
    line2 = new Line(75,450,444,450);
    line3 = new Line(370,80,370,370);
    line4 = new Line(70,266,255,143);
    line5 = new Line(444,330,98,425);
    line6 = new Line(280,320,400,425);
    lines.push(line1);
    lines.push(line2);
    lines.push(line3);
    lines.push(line4);
    lines.push(line5);
    lines.push(line6);
}

function draw() {
    background(220);

    // draw lines
    for (let i = 0; i < lines.length; i++){
        lines[i].drawLine();
    }

    // create ray from mouse pos
    rays = [];
    for (let i = 0; i < 360; i+=5){
        rayi = new Line(mouseX, mouseY, mouseX + Math.cos(i*2)*100, mouseY + Math.sin(i*2)*100);
        rays.push(rayi);
    }

    // draw ray from mouse pos
    for (let i = 0; i < rays.length; i++){
        strokeWeight(1);
        stroke(255,0,0);
        rays[i].drawLine();
    }

    // intersections from mouse to walls in lines variable
    points = [];
    for (let i = 0; i < rays.length; i++){
        for (j = 0; j < lines.length; j++){
            intersection = intersectionPointBetween(rays[i].x0, rays[i].y0, rays[i].x1, rays[i].y1, lines[j].x0, lines[j].y0, lines[j].x1, lines[j].y1);
            points.push(intersection);
        }
    }

    // draw intersections
    for (let i = 0; i < points.length; i++){
        ellipse(points[i][0], points[i][1],5,5);
    }
}

function intersectionPointBetween(x1,y1,x2,y2,x3,y3,x4,y4){
    let num, den, px, py;
    num = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4));
    den = ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    den != 0 ? px = num/den : px = -100;

    num = ((x1*y2-y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4));
    den = ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    den != 0 ? py = num/den : py = -100;

    return [px,py];
}

function mousePressed(){
    if (mouseButton === LEFT){
        null;
    }
}