import * as React from 'react'
import styles from './styles.css'
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'inner-block',
};

type Props = Base.Props & {
  type?: Type,
  children?: React.ReactNode,
};

const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    children,
  } = props;

  //create props
  const blockProps = Base.mapProps(props, styles, [type, theme]);

  return (
    <div {...blockProps}>{children}</div>
  )
}

export {
  Element,
  Props,
};