import { ComplexInputMode } from '../../../shared/classes/input-mode';

export class CornerMode extends ComplexInputMode {
  constructor(size: number) {
    super('Corner mode', [].constructor(size * size).fill([]));
  }
}
