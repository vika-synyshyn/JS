let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 250;
car1.driver = {
    name: "Viktoriia Synyshyn",
    category: "C",
    "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

car1.drive = function () {
    console.log("I am not driving at night");
};

let car2 = {
    color: "white",
    maxSpeed: 200,
    driver: {
        name: "Viktoriia Synyshyn",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2,
    drive: function () {
        console.log("I can drive anytime");
    }
};

console.log("car1:", car1);
car1.drive();

console.log("car2:", car2);
car2.drive();


function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function () {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let nightText = this.driver.nightDriving
                ? "drives at night"
                : "does not drive at night";

            console.log(
                `Driver ${this.driver.name} ${nightText} and has ${this.driver.experience} years of experience`
            );
        }
    };
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

let truck1 = new Truck("blue", 5000, 90.5, "Volvo", "FH");
let truck2 = new Truck("red", 4500, 85.3, "MAN", "TGX");

truck1.AssignDriver("Viktoriia Synyshyn", true, 5);
truck2.AssignDriver("Oksana Melnyk", false, 3);

console.log("truck1:", truck1);
truck1.trip();

console.log("truck2:", truck2);
truck2.trip();


class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: all 4 sides are equal, all angles are 90 degrees.");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    square() {
        console.log("Area:", this.a * this.a);
    }

    info() {
        console.log("=== Square ===");
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log("Angles:", 90, 90, 90, 90);
        console.log("Perimeter:", 4 * this.a);
        console.log("Area:", this.a * this.a);
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: opposite sides are equal, all angles are 90 degrees.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Area:", this.a * this.b);
    }

    info() {
        console.log("=== Rectangle ===");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles:", 90, 90, 90, 90);
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log("Area:", this.a * this.b);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this._alpha = alpha;
        this._beta = beta;
    }

    static help() {
        console.log("Rhombus: all sides are equal, opposite angles are equal.");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    square() {
        console.log("Area:", this.a * this.a * Math.sin(this._beta * Math.PI / 180));
    }

    info() {
        console.log("=== Rhombus ===");
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log("Angles:", this._alpha, this._beta, this._alpha, this._beta);
        console.log("Perimeter:", 4 * this.a);
        console.log("Area:", this.a * this.a * Math.sin(this._beta * Math.PI / 180));
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }

    get beta() {
        return this._beta;
    }

    set beta(value) {
        this._beta = value;
    }

    get side() {
        return this.a;
    }

    set side(value) {
        this.a = value;
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram: opposite sides are equal, opposite angles are equal.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Area:", this.a * this.b * Math.sin(this.beta * Math.PI / 180));
    }

    info() {
        console.log("=== Parallelogram ===");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log("Area:", this.a * this.b * Math.sin(this.beta * Math.PI / 180));
    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

let square1 = new Square(5);
let rectangle1 = new Rectangle(6, 4);
let rhombus1 = new Rhombus(5, 120, 60);
let parallelogram1 = new Parallelogram(8, 5, 120, 60);

square1.info();
rectangle1.info();
rhombus1.info();
parallelogram1.info();

console.log("Old rhombus side:", rhombus1.side);
rhombus1.side = 7;
rhombus1.alpha = 110;
rhombus1.beta = 70;
rhombus1.info();


function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

let triangle1 = Triangular(6, 8, 10);
let triangle2 = Triangular(5, 5, 5);
let triangle3 = Triangular();

console.log("triangle1:", triangle1);
console.log("triangle2:", triangle2);
console.log("triangle3:", triangle3);


function PiMultiplier(number) {
    return function () {
        return Math.PI * number;
    };
}

let multiplyBy2 = PiMultiplier(2);
let multiplyByTwoThirds = PiMultiplier(2 / 3);
let divideBy2 = PiMultiplier(0.5);

console.log("PI * 2 =", multiplyBy2());
console.log("PI * 2/3 =", multiplyByTwoThirds());
console.log("PI / 2 =", divideBy2());


function Painter(color) {
    return function (obj) {
        if ("type" in obj) {
            console.log(`${color} ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");

let obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

let obj2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

let obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("=== PaintBlue ===");
PaintBlue(obj1);
PaintBlue(obj2);
PaintBlue(obj3);

console.log("=== PaintRed ===");
PaintRed(obj1);
PaintRed(obj2);
PaintRed(obj3);

console.log("=== PaintYellow ===");
PaintYellow(obj1);
PaintYellow(obj2);
PaintYellow(obj3);
