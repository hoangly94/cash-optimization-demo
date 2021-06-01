import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~atoms/block";
import * as Text from "~atoms/text";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
import * as Item from "./item";
import styles from './styles.css';

export enum Type {
  DEFAULT = 'dropdown',
}

export type Props = Base.Props & {
  type?: Type,
  //default text
  text?: string,
  $itemList?: Item.Props[],
  disable?: boolean,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    text,
    $itemList,
    disable = false,
  } = props;

  const [activeItem, setActiveItem] = React.useState(getActiveItem($itemList));

  //create props
  const blockWrapperProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
    border: Base.Border.SOLID,
  };

  const textProps: Text.Props = {
    text: activeItem?.text,
  };

  const caretProps = {
    size: SVG.Size.S1,
    classNames: styles['caret'],
  };

  const itemListProps: Block.Props = {
    classNames: Classnames(
      styles['dropdown-itemList'],
    ),
  };
  return (
    <Block.Element {...blockWrapperProps}>
      <Text.Element {...textProps} />
      <Caret {...caretProps} />
      <Block.Element {...itemListProps}>
        {$itemList?.map(mapPropsToItemElement(handleItemClick(itemClickedFunction)))}
      </Block.Element>
    </Block.Element>
  )
}

type ActiveItem = {
  value?: string | number,
  text?: string,
}
type DropdownData = {
  value?: string | number,
  text?: string,
  activeItemList: ActiveItem[],
}

const handleItemClick = (itemClickedFunction: () => void) => {

  return (e) => {
    itemClickedFunction();
  }
}
const itemClickedFunction = () => {
}

const getActiveItem = ($itemList?: Item.Props[]): DropdownData => {
  const activeItems = $itemList?.filter($item => $item.active);

  const activeItem = activeItems
    ? { value: activeItems[0].value, text: activeItems[0].$children?.text }
    : { value: '0', text: 'Default Text' };

  const activeItemList = activeItems?.map(item => ({ value: activeItems[0].value, text: activeItems[0].$children?.text }));
  return {
    ...activeItem,
    activeItemList: activeItemList ?? [],
  }
}

const mapPropsToItemElement = (handleItemClick?: React.MouseEventHandler<Element>) => {
  return ($item?: Item.Props) =>
    <Item.Element {...$item} key={$item?.value} onClick={handleItemClick} />
}


