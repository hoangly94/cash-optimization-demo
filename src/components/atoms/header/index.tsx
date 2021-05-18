import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAUL = 'header',
}

type Props = Base.Props & {
  type?: Type,
}

const Element = (props: Props) => {
  const { 
    type = Type.DEFAUL, 
    theme = Base.Theme.DEFAULT, 
    children,
  } = props;

  //create props
  const footerProps = Base.mapProps(props, styles, [type, theme]);

  return (
    <header {...footerProps}>
      {children}
    </header>
  )
}

export {
  Element,
  Type,
  Props,
};
