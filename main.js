class Line {
    constructor(x0, y0, x1, y1) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
    drawLine(weight = 3, color = [0, 0, 255]) {
        strokeWeight(weight);
        stroke(color[0], color[1], color[2]);
        line(this.x0, this.y0, this.x1, this.y1);
    }
}

let width = 500;
let height = 500;
let walls = [];
let rays = [];

// Function to calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function setup() {
    createCanvas(width, height);
    frameRate(60);

    // Create walls
    walls.push(new Line(0, 0, width, 0));      // Top border
    walls.push(new Line(0, height, width, height));  // Bottom border
    walls.push(new Line(0, 0, 0, height));     // Left border
    walls.push(new Line(width, 0, width, height));   // Right border
    walls.push(new Line(75, 60, 344, 60));
    walls.push(new Line(75, 450, 444, 450));
    walls.push(new Line(370, 80, 370, 370));
    walls.push(new Line(70, 266, 255, 143));
    walls.push(new Line(444, 330, 98, 425));
    walls.push(new Line(280, 320, 400, 425));
}

function draw() {
    background(220);

    // Draw walls
    for (let wall of walls) {
        wall.drawLine();
    }

    // Create rays from mouse position to all directions
    rays = [];
    for (let i = 0; i < 360; i += 5) {
        let dx = cos(radians(i));
        let dy = sin(radians(i));
        rays.push(new Line(mouseX, mouseY, mouseX + dx * 1000, mouseY + dy * 1000));  // Extending rays outwards
    }

    // Find the closest intersection for each ray
    for (let ray of rays) {
        let closestPoint = null;
        let minDist = Infinity;

        for (let wall of walls) {
            let intersection = cast(ray.x0, ray.y0, ray.x1, ray.y1, wall.x0, wall.y0, wall.x1, wall.y1);
            if (intersection) {
                let dist = calculateDistance(ray.x0, ray.y0, intersection[0], intersection[1]);
                if (dist < minDist) {
                    minDist = dist;
                    closestPoint = intersection;
                }
            }
        }

        // Draw the ray up to the closest intersection
        if (closestPoint) {
            stroke(255, 0, 0);
            strokeWeight(1);
            line(ray.x0, ray.y0, closestPoint[0], closestPoint[1]);
        }
    }
}

// Calculate intersection between lines
function cast(x1, y1, x2, y2, x3, y3, x4, y4) {
    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return null; // Lines are parallel or coincident

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t >= 0 && t <= 1 && u >= 0) {
        let px = x1 + t * (x2 - x1);
        let py = y1 + t * (y2 - y1);
        return [px, py];
    }
    return null;
}
