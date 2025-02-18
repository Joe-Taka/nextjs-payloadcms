import * as migration_20250218_195900 from './20250218_195900';

export const migrations = [
  {
    up: migration_20250218_195900.up,
    down: migration_20250218_195900.down,
    name: '20250218_195900'
  },
];
