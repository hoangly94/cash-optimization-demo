import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';


enum Type {
  DEFAULT = 'cell',
  TITLE = 'cell-title',
  LINK = 'link',
}

type Props = Base.Props & {
  type?: Type,
  url?: string,
  children: React.ReactNode,
}

const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    children,
  } = props;
  //create props
  
  const cellProps = Base.mapProps(props, styles, [type, theme]);

  return (
    <div {...cellProps}>{children}</div>
  )
}

export {
  Element,
  Type,
  Props,
};

Element.displayName = 'DashboardMenu'