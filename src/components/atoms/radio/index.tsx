import * as React  from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
// import baseCss from '../../_settings/_base.css'

const Type = {
  DEFAULT: 'radio',
}

const Size = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

type Props = {
  type: string,
  theme: string,
  size: string,
  name: string,
  value: string,
  checked: boolean,
  onChange(): void,
  disabled: boolean,
  className: string,
}

const Element = (props: Props) => {
  const { type, onChange, name, value, checked, size, className, disabled } = props

  //create props
  const classProps: string = Classnames(
    styles[type],
    size ? styles[size] : '',
    {
      [styles.disabled]: disabled,
    },
    className
  )

  return (
    <input type="radio" onChange={onChange} name={name} checked={checked} value={value} disabled={disabled} className={classProps} />
  )
}

Element.defaultProps = {
  type: Type.DEFAULT,
  size: Size.MEDIUM,
  name: '',
  value: '',
  checked: false,
  onChange: null,
  disabled: false,
  className: [],
}

export {
  Element as Radio,
  Type as RadioType,
  Size as RadioSize
};
