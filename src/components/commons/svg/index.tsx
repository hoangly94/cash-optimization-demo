import * as Base from '~/_settings';

export enum Type {
  SOLID = 'solid',
  LIGHT = 'light',
} 

export enum Icon {
  BARS = 'bars',
  CARET = 'caret',
  CHEVRON = 'chevron',
  USER = 'user',
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

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  fill?: string,
  direction?: Direction,
  disabled?: boolean,
  onClick?: React.MouseEventHandler;
}