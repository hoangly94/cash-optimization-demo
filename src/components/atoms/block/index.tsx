import * as React  from 'react'
import styles from './styles.css'
import * as Base from '_/_settings';

export type Props = Base.Props & {
  children?: React.ReactNode,
};

export const Element = (props: Props): React.ReactElement => {
  const { 
    theme = Base.Theme.DEFAULT,
    children,
  } = props;

  //create props
  const blockProps = Base.mapProps(props, styles, [ theme]);

  return (
    <div {...blockProps}>{children}</div>
  )
}
