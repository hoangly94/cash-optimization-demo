import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';
import * as Li from './li'
import * as Link from "_atoms/link";
import * as Button from "_atoms/button";
import * as DropDown from '_molecules/dropdown'

export enum Type {
  DEFAULT = 'li',
}
export enum ChildrenType {
  Link = 'Link',
  Button = 'Button',
  DropDown = 'DropDown',
}

export type Props<T> = Base.Props & {
  type?: Type,
  childrenType?: ChildrenType,
  $children?: T,
}

export const Element = <T extends Link.Props | Button.Props | DropDown.Props>(props: Props<T>): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    $children = {},
    childrenType = ChildrenType.Link,
  } = props;

  //create props
  const liProps = Base.mapProps(props, styles, [type, theme]);

  const childrenElement = convertElement($children, childrenType);

  return (
    <li {...liProps}>{childrenElement}</li>
  )
}

function convertElement<T extends Link.Props | Button.Props | DropDown.Props>($children: T, childrenType: ChildrenType) {
  switch (childrenType) {
    case ChildrenType.Link:
      return <Link.Element {...($children as Link.Props)} />;
    case ChildrenType.Button:
      return <Button.Element {...($children as Button.Props)} />;
    case ChildrenType.DropDown:
      return <DropDown.Element {...($children as DropDown.Props)} />;
    default:
      return <Link.Element {...($children as Link.Props)} />;
  }
}
