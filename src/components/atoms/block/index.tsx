import * as React from 'react'
import styles from './styles.css'
import * as Base from '_/_settings';

export type Props = Base.Props & {
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler,
};

export const Element = (props: Props): React.ReactElement => {
  const {
    theme = Base.Theme.DEFAULT,
    children,
    onClick,
    refs,
  } = props;

  //create props
  const blockProps = {
    ...Base.mapProps(props, styles, [theme]),
    onClick: onClick,
  };

  return (
    <div {...blockProps} ref={refs}>{children}</div>
  )
}

Element.displayName = 'Block'

