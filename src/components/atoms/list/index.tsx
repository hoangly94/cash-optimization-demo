import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';
import * as Li from './li'
import * as Link from "_atoms/link";
import * as Button from "_atoms/button";
import * as Dropdown from '_molecules/dropdown'



export enum Type {
  VERTICAL = 'list-vertical',
  HORIZONTAL = 'list-horizontal',
}

export type Props<T> = Base.Props & {
  type?: Type,
  $liList?: Li.Props<T>[],
}

export const Element = <T extends Link.Props | Button.Props | Dropdown.Props>(props: Props<T>): React.ReactElement => {
  const {
    type = Type.HORIZONTAL,
    theme = Base.Theme.DEFAULT,
    $liList,
  } = props;

  //create props
  const listProps = Base.mapProps(props, styles, [type, theme]);

  const childrenElement = $liList?.map(mapChildrenElement);

  return (
    <ul {...listProps}>{childrenElement}</ul>
  )
}

const mapChildrenElement = <T extends Link.Props | Button.Props | Dropdown.Props>($li: Li.Props<T>, index: number) => {
  const liProps = {
    key: index,
    ...$li,
  };
  return <Li.Element {...liProps} />
}

export const ItemChildrenType = Li.ChildrenType;