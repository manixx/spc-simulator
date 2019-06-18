export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  a: Point;
  b: Point;
}

export class Angle {
  constructor(
    private value: number = 0,
  ) {}

  static fromDegree(value: number) {
    const angle = new this();

    angle.degree = value;
    return angle;
  }

  get degree() {
    return this.value * 180 / Math.PI;
  }

  set degree(value: number) {
    this.value = value * Math.PI / 180;
  }

  get radian() {
    return this.value;
  }

  set radian(value: number) {
    this.value = value;
  }
}

export class Gear {

  currentRotation = 0;
  currentSpeed = 0;

  constructor(
    public readonly origin: Point,
    public readonly diameter: number,
    public parent?: Gear,
    public readonly attached = false,
  ) { }

  get radius() {
    return this.diameter / 2;
  }

  get hand(): Vector {
    return {
      a: this.origin,
      b: { x: this.origin.x, y: this.origin.y + this.radius },
    };
  }

  get labelOrigin(): Point {
    return { 
      x: this.origin.x + this.radius + 10,
      y: this.origin.y,
    };
  }

  static fixedGear(
    origin: Point,
    diameter: number,
  ) {
    return new this(origin, diameter);
  }

  static connectionGear(
    diameter: number,
    parent: Gear,
    connectionAngle: Angle,
  ) {
    const centeredPoint: Point = { x: 0, y: parent.radius + diameter / 2 };

    const childOrigin: Point = {
      x: centeredPoint.x * Math.cos(connectionAngle.radian) - centeredPoint.y * Math.sin(connectionAngle.radian),
      y: centeredPoint.x * Math.sin(connectionAngle.radian) + centeredPoint.y * Math.cos(connectionAngle.radian),
    };

    childOrigin.x += parent.origin.x;
    childOrigin.y += parent.origin.y;

    return new this(childOrigin, diameter, parent);
  }

  static attachedGear(
    diameter: number,
    parent: Gear,
  ) {
    return new this(
      parent.origin,
      diameter,
      parent,
      true
    );
  }

  static constrainedGear(
    parent: Gear,
    constraint: Gear,
    diameter: number,
    flip = false,
  ) {
    const normalizedConstraintOrigin: Point = {
      x: constraint.origin.x - parent.origin.x,
      y: constraint.origin.y - parent.origin.y,
    }
    const alpha = Gear.getAlpha(
      constraint.radius + (diameter / 2),
      parent.radius + (diameter / 2),
      Gear.getLength(normalizedConstraintOrigin),
    );
	  console.log('alpa', alpha.degree)

    const baseAlpha = Gear.getAlpha(
      Gear.getLength({
        x: normalizedConstraintOrigin.x,
        y: normalizedConstraintOrigin.y - parent.radius,
      }),
      Gear.getLength(normalizedConstraintOrigin),
      parent.radius,
    );
	console.log('baseAlpha', baseAlpha.degree)

    let connectionAngle = Angle.fromDegree(alpha.degree - baseAlpha.degree)
	  if (constraint.origin.x < 0) {
	  connectionAngle = Angle.fromDegree(connectionAngle.degree * -1)
      }

      if(parent.origin.x > 0) {
        connectionAngle.degree = connectionAngle.degree * -1 
      }

	  console.log('connectionAngle', connectionAngle.degree)
    const gear = Gear.connectionGear(diameter, parent, connectionAngle);
    constraint.parent = gear;

    return gear;
  }

  static getAlpha(a: number, b: number, c: number) {
    console.log(a, b, c)
    return new Angle(
      Math.acos((- 0.5 * Math.pow(a, 2) + 0.5 * Math.pow(b, 2) + 0.5 * Math.pow(c, 2)) / (b * c))
    );
  }

  static getLength(p: Point) {
    return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2))
  }
}
