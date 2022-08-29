import { ComplexInputMode } from "../../../shared/classes/input-mode";

export class CenterMode extends ComplexInputMode {
  constructor(size: number) {
    super("center", [].constructor(size * size).fill([]));
  }
}
