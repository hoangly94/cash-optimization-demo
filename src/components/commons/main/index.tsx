import * as React  from 'react'
import styles from './styles.css'
import * as Base from '~/_settings';

export type Props = Base.Props & {
  children?: React.ReactNode,
};

export const Element = (props: Props): React.ReactElement => {
  const { 
    children,
  } = props;

  //create props
  const mainProps = Base.mapProps(props, styles, [ ]);

  return (
    <main {...mainProps}>{children}</main>
  )
}

Element.displayName = 'Main'
