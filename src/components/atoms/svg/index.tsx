export enum Type {
  SOLID = 'solid',
  LIGHT = 'light',
}

export enum Type {
  DEFAULT = 'svg',
}

export enum Direction {
  DEFAULT = '',
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
}

export enum Size {
  S2 = '8px',
  S1 = '12px',
  S = '15px',
  M = '18px',
  L = '22px',
  L1 = '25px',
  L2 = '28px',
}

export type Props = {
  type?: Type,
  size?: Size,
  color?: string,
  direction?: Direction,
  disabled?: boolean,
}