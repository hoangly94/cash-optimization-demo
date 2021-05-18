import * as React  from 'react'
import Classnames from 'classnames'
import styles from './styles.css'

import baseStyles from '../../_settings/_base.css'
import * as Base from '_/_settings'


const Type = {
  DEFAULT: '',
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
}

const Theme = {
  DEFAULT: '',
}

type Props = {
  type: string,
  theme: string,
  width: string,
  height: string,
  children: React.ReactNode[],
  className: string,
}

const Element = (props: Props): React.ReactElement => {
  const { type, children, theme, width, height, className } = props;

  //create props
  const classProps: string = Classnames(
    styles[type],
    // width ? baseStyles.width[width] : '',
    // height ? baseStyles.height[height] : '',
    className
  );

  return (
    <ul className={classProps}>{children}</ul>
  )
}

Element.defaultProps = {
  type: Type.DEFAULT,
  theme: Theme.DEFAULT,
  // width: Width.NONE,
  // height: Height.NONE,
  className: [],
  children: [],
}

export {
  Element as List,
  Type as ListType,
  Theme as ListTheme,
};