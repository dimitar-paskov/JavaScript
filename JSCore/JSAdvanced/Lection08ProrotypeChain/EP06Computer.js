function createComputerHierarchy() {
    class Component {
        constructor(manifacturer) {
            if (new.target === Component) {
                throw new Error('Cannot instantiate directly.');
            }
            if (this.constructor === Component) {
                throw new Error("Abstract class cannot be instantiated directly");
            }
            this.manufacturer = manifacturer;
        }
    }

    class Keyboard extends Component {
        constructor(manufacturer, responseTime) {
            super(manufacturer)
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Component {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Component {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends Component {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            super(manufacturer);
            if (new.target === Computer) {
                throw new Error('Cannot instantiate directly.');
            }
            if (this.constructor === Computer) {
                throw new Error("Abstract class cannot be instantiated directly");
            }

            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;

        }

        get battery(){
            return this._battery;
        }
        set battery(battery){
            if (battery.constructor.name === 'Battery'){
                this._battery = battery;
            }else{
                throw new TypeError(`New TypeError:${battery.toString()}`);
            }
        }
    }

    class Desktop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }
        get keyboard(){
            return this._keyboard;
        }
        set keyboard(keyboard){
            if (keyboard.constructor.name === 'Keyboard'){
                this._keyboard = keyboard;
            }else{
                throw new TypeError(`New TypeError:${keyboard.toString()}`);
            }
        }

        get monitor(){
            return this._monitor;
        }
        set monitor(monitor){
            if (monitor.constructor.name === 'Monitor'){
                this._monitor = monitor;
            }else{
                throw new TypeError(`New TypeError:${monitor.toString()}`);
            }
        }

    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}