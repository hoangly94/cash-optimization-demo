import * as React from 'react'
import * as Base from '~/_settings';

export type Props = Base.Props & {
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler,
};

export const Element = (props: Props): React.ReactElement => {
  const {
    children,
    onClick,
    refs,
  } = props;

  //create props
  const blockProps = {
    ...Base.mapProps(props),
    onClick: onClick,
  };

  return (
    <div {...blockProps} ref={refs}>{children}</div>
  )
}

Element.displayName = 'Block'
