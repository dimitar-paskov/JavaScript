class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    set diameter(diameter) {
        this.radius = diameter / 2;
    }

    get diameter() {
        return 2 * this.radius;
    }

    get area() {
        return Math.PI * this.radius * this.radius;
    }
}