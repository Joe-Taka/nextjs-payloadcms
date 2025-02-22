import * as migration_20250222_211811_first from './20250222_211811_first';

export const migrations = [
  {
    up: migration_20250222_211811_first.up,
    down: migration_20250222_211811_first.down,
    name: '20250222_211811_first'
  },
];
