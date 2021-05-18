import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import { Icon } from '_atoms/icon'
import * as Dropdown from '_molecules/dropdown'
import * as Nav from '_atoms/nav'
import * as Link from '_atoms/link'
import * as List from '_atoms/list'
import * as Li from '_atoms/list/li'
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'menu',
}

enum Align {
  DEFAULT = '',
  LEFT = 'align-left',
  RIGHT = 'align-right',
}

type Props = Base.Props & {
  type?: Type,
  align?: Align,
  $list?: List.Props<Dropdown.Props>,
};

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    align = Align.LEFT,
    $list,
  } = props;

  //create props
  const navProps = {
    ...props,
    classNames:Classnames(
      styles[type],
      styles[align],
  ),
  };

  const listProps = {
    ...$list,
    $lis: $list?.$liList?.map(mapListLi),
  };

  return (
    <Nav.Element {...navProps}>
      <List.Element {...listProps} />
    </Nav.Element>
  )
}

const mapListLi = ($li: Li.Props<Dropdown.Props> = {}) => {
  return {
    ...$li,
    elementType: 'DropDown',
  };
};

export {
  Element,
  Type,
  Align,
  Props,
};
