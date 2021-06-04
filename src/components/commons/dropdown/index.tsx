import React, { useState, useEffect, useRef } from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~atoms/block";
import * as Text from "~atoms/text";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
import * as Item from "./item";
import styles from './_styles.css';
import { useComponentClickOutside } from '@hocs';

export enum Type {
  DEFAULT = 'dropdown',
}

export type Props = Base.Props & {
  type?: Type,
  $selectorWrapper?: Base.Props & Block.Props & {
    //default text
    defaultText?: string,
  }
  $optionsWrapper?: Base.Props & Block.Props & {
    $options?: Item.Props[],
  },
  disable?: boolean,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $selectorWrapper,
    $optionsWrapper,
    disable = false,
  } = props;

  // const defaultSelectorText = $selectorWrapper?.defaultText ? { text: $selectorWrapper.defaultText } : null;
  // const [isOpenedDropdown, setIsOpenedDropdown] = useState(false);
  // const [activeItem, setActiveItem] = useState(defaultSelectorText ?? getActiveItem($optionsWrapper?.$options));

  const {
    ref,
    clickData,
    setClickData,
  } = useComponentClickOutside();

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
    // onClick: handleDropdownOpenCloseClick(clickData, setClickData),
  };

  const textProps: Text.Props = {
    // text: activeItem?.text,
    text: $selectorWrapper?.defaultText ?? 'Default Text',
  };

  const selectorWrapperProps: Block.Props = {
    classNames: Classnames(
      styles['dropdown-selector'],
    ),
    backgroundColor: Base.BackgroundColor.WHITE,
    padding: Base.Padding.PX_8,
    border: Base.Border.SOLID,
    refs: ref,
    ...$selectorWrapper,
  };

  const display = clickData.isOutside ? { display: 'none' } : { display: 'block' };
  const optionsWrapperProps: Block.Props = {
    classNames: Classnames(
      styles['dropdown-options'],
    ),
    backgroundColor: Base.BackgroundColor.WHITE,
    // padding: Base.PaddingV.PX_5,
    style: {
      ...display,
    },
    ...$optionsWrapper,
  };

  return (
    <Block.Element {...componentWrapperProps}>
      <Block.Element {...selectorWrapperProps}>
        <Text.Element {...textProps} />
        <Caret {...caretProps} />
      </Block.Element>
      <Block.Element {...optionsWrapperProps}>
        {/* {$optionsWrapper?.$options?.map(mapPropsToItemElement(handleItemClick(itemClickedFunction(setActiveItem, clickData, setClickData))))} */}
        {$optionsWrapper?.$options?.map(mapPropsToItemElement(handleItemClick))}
      </Block.Element>
    </Block.Element>
  )
}

const caretProps = {
  size: SVG.Size.S2,
  classNames: styles['caret'],
};


type ActiveItem = {
  value?: string | number,
  text?: string,
}
type DropdownData = {
  value?: string | number,
  text?: string,
  // activeItemList?: ActiveItem[],
}

const handleDropdownOpenCloseClick = (clickData, setClickData: Function) => {
  return (e) => {
  }
}

const handleItemClick = (itemClickedFunction: any,) => {
  return ($item: Item.Props) => {
    return (e) => {
      e.stopPropagation();
      itemClickedFunction($item);
    }
  }
}

// const itemClickedFunction = (setActiveItem: Function, clickData, setClickData: Function) => {
//   return ($item: Item.Props) => {
//     //hide dropdown data list
//     clickData.isOutside = true;
//     setClickData(clickData);

//     const dropdownData: DropdownData = {
//       value: $item.value,
//       text: $item.$children?.text,
//       // activeItemList: [],
//     }
//     setActiveItem(dropdownData);
//   }
// }

// const getActiveItem = ($itemList?: Item.Props[]): DropdownData => {
//   const activeItems = $itemList?.filter($item => $item.active);

//   const activeItem = activeItems?.length
//     ? { value: activeItems[0].value, text: activeItems[0].$children?.text }
//     : { value: '0', text: 'Default Text' };

//   const activeItemList = activeItems?.map(item => ({ value: activeItems[0].value, text: activeItems[0].$children?.text }));
//   return {
//     ...activeItem,
//     // activeItemList: activeItemList ?? [],
//   }
// }

// const mapPropsToItemElement = (handleItemClick?: any) =>
const mapPropsToItemElement = (handleItemClick?: any) =>
  ($item?: Item.Props) => {
    const itemProps = {
      key: $item?.value,
      padding: Base.Padding.PX_8,
      ...$item,
      onClick: (e) => {
        handleItemClick($item ?? {})(e);
        if ($item?.onClick)
          $item.onClick(e);
      },
    }
    return <Item.Element {...itemProps} />
  }

Element.displayName = 'Select'
