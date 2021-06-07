import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '~/_settings';
import * as Li from './li'
import * as Text from "~commons/text";
import * as Link from "~commons/link";
import * as Button from "~commons/button";
import * as Dropdown from '~commons/dropdown'



export enum Type {
  VERTICAL = 'list-vertical',
  HORIZONTAL = 'list-horizontal',
}

export type Props<T> = Base.Props & {
  type?: Type,
  $liList?: Li.Props<T>[],
}

export const Element = <T extends Text.Props | Link.Props | Button.Props | Dropdown.Props>(props: Props<T>): React.ReactElement => {
  const {
    type = Type.HORIZONTAL,
    theme = Base.Theme.DEFAULT,
    $liList,
  } = props;

  //create props
  // const listProps = Base.mapProps(props, styles, [type, theme]);

  // const childrenElement = $liList?.map(mapChildrenElement);

  // return (
  //   <ul {...listProps}>{childrenElement}</ul>
  // )

  return (<div></div>)
}

// const mapChildrenElement = <T extends Text.Props | Link.Props | Button.Props | Dropdown.Props>($li: Li.Props<T>, index: number) => {
//   const liProps = {
//     key: index,
//     ...$li,
//   };
//   return <Li.Element {...liProps} />
// }

export const ItemChildrenType = Li.ChildrenType;

Element.displayName = 'List'