import { SimpleInputMode } from '../../../shared/classes/input-mode';

export class ValueMode extends SimpleInputMode {
  constructor(size: number) {
    super('Value mode', [].constructor(size * size).fill(null));
  }
}
