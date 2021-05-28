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
  S2 = 's2',
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
  L2 = 'l2',
}

export type Props = {
  type?: Type,
  size?: Size,
  color?: string,
  direction?: Direction,
  disabled?: boolean,
}