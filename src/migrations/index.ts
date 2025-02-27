import * as migration_20250222_211811_first from './20250222_211811_first';
import * as migration_20250227_205902_eventos from './20250227_205902_eventos';

export const migrations = [
  {
    up: migration_20250222_211811_first.up,
    down: migration_20250222_211811_first.down,
    name: '20250222_211811_first',
  },
  {
    up: migration_20250227_205902_eventos.up,
    down: migration_20250227_205902_eventos.down,
    name: '20250227_205902_eventos'
  },
];
