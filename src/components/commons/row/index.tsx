import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Cell from "_atoms/cell";
import * as Base from '_/_settings';


enum Type {
  DEFAULT = 'row',
}

type Props = Base.Props & {
  type?: Type,
  cells?: Cell.Props[],
  children?: React.ReactNode,
}

const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    children,
  } = props;

  //create props
  const rowProps = Base.mapProps(props, styles, [type, theme]);

  return (
    <div {...rowProps}>{children}</div>
  )
}

export {
  Element,
  Type,
  Props,
};