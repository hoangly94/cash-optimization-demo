import * as React  from 'react'
import Classnames from 'classnames'
import styles from './styles.css';


const Type = {
  DEFAULT: '',
}

type Props = {
  type: string,
  children: React.ReactNode,
  className: string,
}

const Element = (props: Props): React.ReactElement => {
  const { type, children, className } = props;

  //create props
  const classProps: string = Classnames(
    styles[type],
    className
  );

  return (
    <select className={classProps}>{children}</select>
  )
}

Element.defaultProps = {
  type: Type.DEFAULT,
  className: [],
  children: '',
}

export {
  Element as SelectItem,
  Type as SelectItemType,
};