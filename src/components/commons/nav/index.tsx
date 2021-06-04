import * as React from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';

export type Props = Base.Props & {
  children?: React.ReactNode,
};

export const Element = (props: Props): React.ReactElement => {
  const {
    children,
    refs,
  } = props;

  //create props
  const blockProps = {
    ...Base.mapProps(props, styles, []),
    ref: { refs },
  };

  return (
    <nav {...blockProps} ref={refs} role="navigation">{children}</nav>
  )
}

Element.displayName = 'Nav'
