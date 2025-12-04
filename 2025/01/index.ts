import { getInputText } from "../../utils";

type Direction = "L" | "R";
type Rotation = `${Direction}${number}`;

const input = (await getInputText()).split("\n");

// --------------------

class Dialer1 {
  #target: number;
  #password: number = 0;

  private static readonly TOTAL_POSITION = 100; // 0-99

  constructor(start: number) {
    this.#target = start;
  }

  get target() {
    return this.#target;
  }

  get password() {
    return this.#password;
  }

  dial(rotation: Rotation) {
    const direction = rotation[0];
    const distance = Number(rotation.slice(1));

    if (
      isNaN(distance) ||
      !["L", "R"].includes((direction ?? "") as Direction)
    ) {
      return;
    }

    this.rotate(direction as Direction, distance);

    if (this.#target === 0) {
      this.#password++;
    }
  }

  private rotate(direction: Direction, distance: number) {
    if (direction === "L") {
      this.#target =
        (((this.#target - distance) % Dialer1.TOTAL_POSITION) +
          Dialer1.TOTAL_POSITION) %
        Dialer1.TOTAL_POSITION;
    } else if (direction === "R") {
      this.#target = (this.#target + distance) % Dialer1.TOTAL_POSITION;
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }
  }
}

const dialer1 = new Dialer1(50);
(input as Rotation[]).forEach((r) => dialer1.dial(r));
console.dir({ password1: dialer1.password });

// --------------------

class Dialer2 {
  #target: number;
  #password: number = 0;

  private static readonly TOTAL_POSITION = 100; // 0-99

  constructor(start: number) {
    this.#target = start;
  }

  get target() {
    return this.#target;
  }

  get password() {
    return this.#password;
  }

  dial(rotation: Rotation) {
    const direction = rotation[0];
    const distance = Number(rotation.slice(1));

    if (
      isNaN(distance) ||
      !["L", "R"].includes((direction ?? "") as Direction)
    ) {
      return;
    }

    this.rotate(direction as Direction, distance);
  }

  private rotate(direction: Direction, distance: number) {
    if (direction === "L") {
      const crossings = this.countZeroCrossingsLeft(this.#target, distance);
      this.#password += crossings;

      this.#target =
        (((this.#target - distance) % Dialer2.TOTAL_POSITION) +
          Dialer2.TOTAL_POSITION) %
        Dialer2.TOTAL_POSITION;
    } else if (direction === "R") {
      const crossings = this.countZeroCrossingsRight(this.#target, distance);
      this.#password += crossings;

      this.#target = (this.#target + distance) % Dialer2.TOTAL_POSITION;
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }
  }

  private countZeroCrossingsLeft(start: number, distance: number): number {
    if (distance === 0) return 0;

    const endValue = start - distance;
    const low = endValue;
    const high = start - 1;

    if (high < low) return 0;

    const firstMultiple = Math.ceil(low / Dialer2.TOTAL_POSITION);
    const lastMultiple = Math.floor(high / Dialer2.TOTAL_POSITION);

    return Math.max(0, lastMultiple - firstMultiple + 1);
  }

  private countZeroCrossingsRight(start: number, distance: number): number {
    if (distance === 0) return 0;

    const endValue = start + distance;
    const low = start + 1;
    const high = endValue;

    if (high < low) return 0;

    const firstMultiple = Math.ceil(low / Dialer2.TOTAL_POSITION);
    const lastMultiple = Math.floor(high / Dialer2.TOTAL_POSITION);

    return Math.max(0, lastMultiple - firstMultiple + 1);
  }
}

const dialer2 = new Dialer2(50);
(input as Rotation[]).forEach((r) => dialer2.dial(r));
console.dir({ password2: dialer2.password });
