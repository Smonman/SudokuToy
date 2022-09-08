import { SimpleInputMode } from '../../../shared/classes/input-mode';

export class ValueMode extends SimpleInputMode {
  constructor(size: number) {
    super('value', [].constructor(size * size).fill(null));
  }
}
