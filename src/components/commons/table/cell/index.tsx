import * as React from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'cell',
  TITLE = 'cell-title',
  LINK = 'link',
}

export type Props = Base.Props & {
  type?: Type,
  url?: string,
  children: React.ReactNode,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    children,
  } = props;

  //create props
  const componentProps = Base.mapProps(props, styles, [type]);

  return (
    <div {...componentProps}>{children}</div>
  )
}
