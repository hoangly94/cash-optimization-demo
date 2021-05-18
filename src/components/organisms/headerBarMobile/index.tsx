import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
import * as Base from '_/_settings';
import * as Block from "_atoms/block";
import * as Logo from "_molecules/logo";
import * as MenuMobile from "_molecules/menuMobile";

enum Type {
  DEFAULT = 'header-bar',
}

type Props = Base.Props & {
  type?: Type,
  $innerSection: Block.Props & {
    $logo?: Logo.Props,
    $menu?: MenuMobile.Props,
  }
};

const Element = (props: Props) => {
  //create props
  const {
    type = Type.DEFAULT,
    theme = Base.Theme.DEFAULT,
    $innerSection,
  } = props;

  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
      styles[theme],
    ),
  }
  const innerSectionProps = {
    flex: Base.Flex.BETWEEN,
    ...$innerSection,
  }

  const logoProps = {
    ...$innerSection.$logo,
  }

  const menuProps = {
    ...$innerSection.$menu,
  }

  return (
    <Block.Element {...blockProps}>
      <Block.Element {...innerSectionProps}>
        <Logo.Element {...logoProps} />
        <MenuMobile.Element {...menuProps} />
      </Block.Element>
    </Block.Element>
  )
}




export {
  Element,
  Type,
  Props,
};
