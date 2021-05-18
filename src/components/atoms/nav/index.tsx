import * as React  from 'react'
import styles from './styles.css'
import * as Base from '_/_settings';

type Props = Base.Props & {
  children?: React.ReactNode,
};

const Element = (props: Props): React.ReactElement => {
  const { 
    theme = Base.Theme.DEFAULT,
    children,
  } = props;

  //create props
  const navProps = Base.mapProps(props, styles, [ theme]);

  return (
    <nav {...navProps} role="navigation">
      {children}
    </nav>
  )
}

export {
  Element,
  Props,
};