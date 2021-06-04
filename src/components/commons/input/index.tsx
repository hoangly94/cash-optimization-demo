import * as React  from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
// import baseCss from '../../_settings/_base.css'

const Type = {
  DEFAULT: 'input',
  RESET: 'reset',
  SUBMIT: 'submit',
}

const Theme = {
  DEFAULT: 'default',
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
  onClick(): void,
  onChange(): void,
  placeholder: string,
  className: string,
  disabled: boolean,
}

const Element = (props: Props) => {
  const { type, onClick, onChange, theme, size, placeholder, className, disabled } = props

  //create props
  const classProps: string = Classnames(
    styles[type],
    theme ? styles[theme] : '',
    size ? styles[size] : '',
    {
      [styles.disabled]: disabled,
    },
    className
  )

  return (
    <input onClick={onClick} onChange={onChange} disabled={disabled} placeholder={placeholder} className={classProps}/>
  )
}

Element.defaultProps = {
  type: Type.DEFAULT,
  theme: Theme.DEFAULT,
  size: Size.MEDIUM,
  onClick: null,
  onChange: null,
  disabled: false,
  placeholder: '',
  className: [],
}

export {
  Element as Input,
  Type as InputType,
  Theme as InputTheme,
  Size as InputSize
};

Element.displayName = 'Input'
