import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';


enum Type {
  DEFAULT = 'option',
}

type Props = Base.Props & {
  type?: Type,
  text?: string,
  value?: string,
}

const Element = (props: Props): React.ReactElement => {
  const { 
    type = Type.DEFAULT, 
    theme = Base.Theme.DEFAULT,
    text,
    value,
  } = props;

  //create props
  const optionProps = {
    ...Base.mapProps(props, styles, [type, theme]),
    value: value,
  };

  return (
    <option {...optionProps}>{text}</option>
  )
}

export {
  Element,
  Type,
  Props,
};