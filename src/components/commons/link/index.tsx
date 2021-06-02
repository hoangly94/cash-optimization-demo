import * as React from 'react'
import { Link } from "react-router-dom";
import * as Base from '_/_settings';
import styles from './styles.css'
import Caret from "~svg/caret";
import * as Svg from "~svg/index";

export enum Type {
  DEFAULT = 'link',
  EXTERNAL = 'link-external',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  url?: string,
  text?: string,
  $icon?: Svg.Props & {
    name?: Svg.Icon
  },
  $caret?: Svg.Props,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    text,
    url = '',
    size = Size.M,
    $icon,
    $caret,
  } = props;

  const href = url ? { href: url } : {};

  //create props
  const linkProps = {
    ...Base.mapProps({
      ...props,
    }, styles, [type, size]),
    ...href,
  };

  const iconProps = {
    margin: Base.MarginRight.PX_8,
    fill: 'white',
    ...$icon,
  };
  const caretProps = {
    ...$caret,
  };

  const iconName = $icon?.name ?? 'user';
  const Icon = require('~svg/' + iconName).default;
  const CaretElement = $caret ? <Caret {...caretProps} /> : '';
  const child = <>{<Icon {...iconProps} />}{text}{CaretElement}</>

  const linkElement = /^http.+$/.test(url) || url === '' ? <a {...linkProps}>{child}</a> : <Link  {...linkProps} to={url}>{child}</Link>;

  return (
    linkElement
  )
}