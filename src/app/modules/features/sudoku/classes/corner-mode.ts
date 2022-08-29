import { ComplexInputMode } from "../../../shared/classes/input-mode";

export class CornerMode extends ComplexInputMode {
  constructor(size: number) {
    super("corner", [].constructor(size * size).fill([]));
  }
}
