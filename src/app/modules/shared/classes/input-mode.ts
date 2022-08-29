export interface InputMode {
  title: string;
  value: number[] | number[][] | null[];

  updateValue(id: number, value: number | number[] | null): void;
}

export class SimpleInputMode implements InputMode {
  title: string;
  value: number[] | null[];

  constructor(title: string, value: number[] | null[]) {
    this.title = title;
    this.value = value;
  }

  updateValue(id: number, value: number | null): void {
    this.value[id] = value;
  }
}

export class ComplexInputMode implements InputMode {
  title: string;
  value: number[][];

  constructor(title: string, value: number[][]) {
    this.title = title;
    this.value = value;
  }

  updateValue(id: number, value: number | null): void {
    if (!value) {
      this.value[id] = [];
    } else {
      if (this.value[id].includes(value)) {
        this.value[id] = this.value[id].filter((e: number) => {
          return e !== value;
        });
      } else {
        this.value[id] = [...this.value[id], value];
        this.value[id].sort();
      }
    }
  }
}
