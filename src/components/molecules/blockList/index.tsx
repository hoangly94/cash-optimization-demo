import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'block-list',
}

type Props = Base.Props & Block.Props & {
  type?: Type,
  children?: React.ReactNode[],
  $blocks: Block.Props[],
};

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $blocks,
    children,
  } = props;

  //create props
  const blockWrapperProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const childrenElement = children?.map(childrenElementMapping($blocks));

  return (
    <Block.Element {...blockWrapperProps}>
      {childrenElement}
    </Block.Element>
  );
}

const childrenElementMapping = ($blocks: Block.Props[]) => {
  return (child: React.ReactNode, elementIndex: number) =>{
    const blockProps = $blocks[elementIndex];
    return <Block.Element {...blockProps}>{child}</Block.Element>;
  }
};

export {
  Element,
  Type,
  Props,
};
