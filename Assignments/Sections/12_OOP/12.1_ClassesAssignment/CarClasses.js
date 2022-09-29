
class Vehicle {
  constructor(Model,make,year) {
    this.model = Model;
    this.make = make;
    this.year = year;
  }

  honk() {
    console.log("beep"); //how would i actually play a sound
  }

  toString() {
    console.log(`This ${this.constructor.name} is a ${this.model} ${this.make} from ${this.year}`); 
  }
}

class Car extends Vehicle {
  constructor(Model,make,year) {
    super(Model,make,year); 
    this.numWheels = 4; // do i even need to put this in a contructor method 
  }
}

class Motorcycle extends Vehicle {
  constructor(Model,make,year) {
    super(Model,make,year);
    this.numWheels = 2; 
  }

  revEngine() {
    console.log("VROOM!");
  }
}


class Garage {
  constructor(capacity) {
    this.vehicles = []
    this.capacity = capacity;
    this.currentNumOfVehicles = 0;
  }

  add(newVehicle) {
    console.log(this.addFunctionality(newVehicle));
  }

  addFunctionality(newVehicle) {
    if(newVehicle instanceof Vehicle) {
      if(this.currnentNumOfVehicles < capacity) {
        this.vehicles.push(newVehicle);
        return "Vehicle Added!!"
      }
      return "Sorry, we're full";
    }
    return "Only Vehicles are allowed in here!"
  }
}

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
