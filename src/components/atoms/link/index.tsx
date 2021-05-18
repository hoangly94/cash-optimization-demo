import * as React from 'react'
import Classnames from 'classnames'
import {
  Link,
} from "react-router-dom";
import * as Base from '_/_settings';
import styles from './styles.css'

enum Type {
  DEFAULT = 'link',
  EXTERNAL = 'link-external',
}

enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

type Props = Base.Props & {
  type?: Type,
  size?: Size,
  url?: string,
  text?: string,
}

const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    text,
    url = '',
    size = Size.M,
  } = props;

  const href = url ? { href: url } : {};

  //create props
  const linkProps = {
    ...Base.mapProps({
      ...props,
    }, styles, [type, size, theme]),
    ...href,
  };

  const linkElement = /^http.+$/.test(url) || url === '' ?  <a {...linkProps}>{text}</a> : <Link  {...linkProps} to={url}>{text}</Link>;
  
  return (
    linkElement
  )
}

export {
  Element,
  Type,
  Size,
  Props,
};