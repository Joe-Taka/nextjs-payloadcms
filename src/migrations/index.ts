import * as migration_20250222_211811_first from './20250222_211811_first';
import * as migration_20250311_105245_second from './20250311_105245_second';

export const migrations = [
  {
    up: migration_20250222_211811_first.up,
    down: migration_20250222_211811_first.down,
    name: '20250222_211811_first',
  },
  {
    up: migration_20250311_105245_second.up,
    down: migration_20250311_105245_second.down,
    name: '20250311_105245_second'
  },
];
