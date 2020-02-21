import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Gear, Point, Angle } from './gear';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  gears: Gear[] = [];

  interval: any;
  stepSize = 25;
  initialSpeed = 20;
  stepSizeInMinutes = this.stepSize / 60000;

  @ViewChild('svg')
  svgBox: ElementRef<SVGElement>

  ngOnInit() {
    const handLocation: Point = { x: 0, y: 700 };
    const secondHandIndex = 6
    const minuteHandIndex = 11
    const hourHandIndex = 14

    // fixed gears
    this.gears = [
      Gear.fixedGear({ x: 0, y: 0 }, 20),
      Gear.fixedGear(handLocation, 40), // second
      Gear.fixedGear(handLocation, 30), // minute
      Gear.fixedGear(handLocation, 40), // hour

    ];

    // translation
    this.gears.push(Gear.connectionGear(200, this.gears[0], Angle.fromDegree(0)))
    this.gears.push(Gear.attachedGear(20, this.gears[4]))
    this.gears.push(Gear.connectionGear(40, this.gears[5], Angle.fromDegree(0)))
    this.gears.push(Gear.attachedGear(20, this.gears[6]))
    this.gears.push(Gear.connectionGear(200, this.gears[7], Angle.fromDegree(0)))
    this.gears.push(Gear.attachedGear(30, this.gears[8]))
    this.gears.push(Gear.connectionGear(180, this.gears[9], Angle.fromDegree(0)))
    this.gears.push(Gear.attachedGear(30, this.gears[10]))
    this.gears.push(Gear.connectionGear(180, this.gears[11], Angle.fromDegree(20)))
    this.gears.push(Gear.attachedGear(20, this.gears[12]))
    this.gears.push(Gear.connectionGear(170, this.gears[13], Angle.fromDegree(-22)))

    // bridge second
    this.gears.push(Gear.connectionGear(220, this.gears[secondHandIndex], Angle.fromDegree(75)))
    this.gears.push(Gear.connectionGear(220, this.gears[15], Angle.fromDegree(25)))
    this.gears.push(Gear.connectionGear(180, this.gears[16], Angle.fromDegree(-15)))
    this.gears.push(Gear.constrainedGear(this.gears[17], this.gears[1], 120))

    // bridge minute
    this.gears.push(Gear.connectionGear(200, this.gears[minuteHandIndex], Angle.fromDegree(-115)))
    this.gears.push(Gear.connectionGear(100, this.gears[19], Angle.fromDegree(-5)))
    this.gears.push(Gear.connectionGear(30, this.gears[20], Angle.fromDegree(30)))
    this.gears.push(Gear.connectionGear(100, this.gears[21], Angle.fromDegree(15)))
    this.gears.push(Gear.constrainedGear(this.gears[22], this.gears[2], 110))

    // bridge hour
    this.gears.push(Gear.constrainedGear(this.gears[hourHandIndex], this.gears[3], 60))

    this.gears.push(Gear.fixedGear({ x: 110, y: 110 }, 20)) // engine normal

    this.gears.push(Gear.connectionGear(70, this.gears[14], Angle.fromDegree(-90)))
    this.gears.push(Gear.connectionGear(20, this.gears[26], Angle.fromDegree(-90))) // engine sync

    this.gears.push(Gear.fixedGear({ x: 218, y: 325.87509568318256 }, 20))
    this.gears.push(Gear.connectionGear(170, this.gears[28], Angle.fromDegree(0)))
    this.gears.push(Gear.connectionGear(170, this.gears[28], Angle.fromDegree(180)))

  }

  buildSmallClockwork() {
    const handLocation: Point = { x: 0, y: 300 };
    const secondHandIndex = 7
    const minuteHandIndex = 11
    const hourHandIndex = 13
    // fixed gears
    this.gears = [
      Gear.fixedGear({ x: 0, y: 0 }, 10),
      Gear.fixedGear(handLocation, 10), // second
      Gear.fixedGear(handLocation, 10), // minute
      Gear.fixedGear(handLocation, 10), // hour
    ];

    // translation
    this.gears.push(Gear.connectionGear(100, this.gears[0], Angle.fromDegree(0)));
    this.gears.push(Gear.attachedGear(10, this.gears[4]));
    this.gears.push(Gear.connectionGear(20, this.gears[5], Angle.fromDegree(0)));
    this.gears.push(Gear.attachedGear(10, this.gears[6]));
    this.gears.push(Gear.connectionGear(100, this.gears[7], Angle.fromDegree(0)));
    this.gears.push(Gear.attachedGear(10, this.gears[8]));
    this.gears.push(Gear.connectionGear(60, this.gears[9], Angle.fromDegree(0)));
    this.gears.push(Gear.attachedGear(10, this.gears[10]));
    this.gears.push(Gear.connectionGear(120, this.gears[11], Angle.fromDegree(0)));
    this.gears.push(Gear.attachedGear(10, this.gears[12]))

    // bridge - second
    this.gears.push(Gear.connectionGear(120, this.gears[secondHandIndex], Angle.fromDegree(45)))
    this.gears.push(Gear.connectionGear(80, this.gears[14], Angle.fromDegree(0)))
    this.gears.push(Gear.constrainedGear(this.gears[15], this.gears[1], 55))

    // bridge - minute
    this.gears.push(Gear.connectionGear(60, this.gears[minuteHandIndex], Angle.fromDegree(-45)))
    this.gears.push(Gear.connectionGear(60, this.gears[17], Angle.fromDegree(-30)))
    this.gears.push(Gear.constrainedGear(this.gears[18], this.gears[2], 50))

    // bridge - hour
    this.gears.push(Gear.connectionGear(30, this.gears[hourHandIndex], Angle.fromDegree(45)))
    this.gears.push(Gear.constrainedGear(this.gears[20], this.gears[3], 45))

  }

  toggleSimulation() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.gears.forEach(g => g.currentRotation = 0);
    } else {
      const rootGears = this.gears.filter(g => !g.parent);
      this.interval = setInterval(() => this.setStep(rootGears), this.stepSize);
    }
  }

  setStep(
    gears: Gear[],
    speed = this.initialSpeed,
    parent?: Gear,
    clockwise = true,
  ) {
    gears.forEach(gear => {
      let rotationSpeed = speed;
      const children = this.gears.filter(g => g.parent === gear)

      if (parent && !gear.attached) {
        rotationSpeed = speed * parent.diameter / gear.diameter;
      }

      if (gear.attached) {
        clockwise = !clockwise;
      }

      const nextDegree = rotationSpeed * this.stepSizeInMinutes * 380;
      if (clockwise) {
        gear.currentRotation += nextDegree;
      } else {
        gear.currentRotation -= nextDegree;
      }

      gear.currentSpeed = rotationSpeed

      if (children.length) {
        this.setStep(children, rotationSpeed, gear, !clockwise);
      }
    });
  }

  getRotation(gear: Gear) {
    return `rotate(${gear.currentRotation} ${gear.origin.x} ${gear.origin.y})`;
  }

  export() {
    const data = this.svgBox.nativeElement.innerHTML
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
