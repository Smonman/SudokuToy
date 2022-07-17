export interface InputMode {
  title: string;
  value: number | number[] | null;

  updateValue(value: number | number[] | null): void;
}

export class SimpleInputMode implements InputMode {
  title: string;
  value: number | null;

  constructor(title: string, value: number | null) {
    this.title = title;
    this.value = value;
  }

  updateValue(value: number | null): void {
    this.value = value;
  }
}

export class ComplexInputMode implements InputMode {
  title: string;
  value: number[];

  constructor(title: string, value: number[]) {
    this.title = title;
    this.value = value;
  }

  updateValue(value: number | null): void {
    if (!value) {
      this.value = [];
    } else {
      if (this.value.includes(value)) {
        this.value = this.value.filter((e: number) => {
          return e !== value;
        });
      } else {
        this.value.push(value);
        this.value.sort();
      }
    }
  }
}
