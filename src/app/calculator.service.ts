import { Injectable } from '@angular/core';
import { Gear } from './gear';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  gears: Gear[];

  constructor() { }
}
