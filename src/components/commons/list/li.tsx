import * as React from 'react'
import styles from './styles.css'
import * as Base from '~/_settings';
import * as Text from "~commons/text";
import * as Link from "~commons/link";
import * as Button from "~commons/button";
import * as DropDown from '~commons/dropdown'

export enum Type {
  DEFAULT = 'li',
}
export enum ChildrenType {
  Text = 'Text',
  Link = 'Link',
  Button = 'Button',
  DropDown = 'DropDown',
}

export type Props<T> = Base.Props & {
  type?: Type,
  childrenType?: ChildrenType,
  $children?: T,
}

export const Element = <T extends Text.Props | Link.Props | Button.Props | DropDown.Props>(props: Props<T>): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    $children = {},
    childrenType = ChildrenType.Text,
  } = props;

  //create props
  const liProps = Base.mapProps(props, styles, [type, theme]);

  const childrenElement = convertElement($children, childrenType);
  return (
    <li {...liProps}>{childrenElement}</li>
  )
}

function convertElement<T extends Text.Props | Link.Props | Button.Props | DropDown.Props>($children: T, childrenType: ChildrenType) {
  switch (childrenType) {
    case ChildrenType.Text:
      return <Text.Element {...($children as Text.Props)} />;
      case ChildrenType.Link:
        return <Link.Element {...($children as Link.Props)} />;
    case ChildrenType.Button:
      return <Button.Element {...($children as Button.Props)} />;
    case ChildrenType.DropDown:
      return <DropDown.Element {...($children as DropDown.Props)} />;
    default:
      return <Text.Element {...($children as Text.Props)} />;
  }
}

Element.displayName = 'Li'
