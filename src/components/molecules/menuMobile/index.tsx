import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';
import { Icon } from '_atoms/icon'
import * as DropDown from '_molecules/dropdown'
import * as Link from '_atoms/link'
import * as Item from './item'

enum Type {
  DEFAULT = 'menu',
}
enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Props = Base.Props & {
  type?: string,
  size?: string,
  $itemList?: Item.Props[],
}

const Element = (props: Props) => {
  const { type = Type.DEFAULT, size = Size.MEDIUM, $itemList } = props

  //create props
  const menuMobileProps = Base.mapProps(props, styles, [ type, size]);
  
  // const dropdownMapper = (items: { [key: string]: any; }[]) => {
  //   const result = items.map(item => {
  //     if (item.chilren) {
  //       return (
  //         <Link url={item.url}>
  //           {item.hasIcon ? <Icon src={item.src} /> : ''}
  //           {item.text}
  //         </Link>
  //       )
  //     }
  //     return (
  //       <Link url={item.url}>
  //         {item.hasIcon ? <Icon src={item.src} /> : ''}
  //         {item.text}
  //       </Link>
  //     )
  //   });
  //   return result;
  // }

  return (
    <nav {...menuMobileProps} role="navigation">
      {/* {dropdownMapper(data)} */}
    </nav>
  )
}

export {
  Element,
  Type,
  Size,
  Props,
};
