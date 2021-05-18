import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
import * as Base from '_/_settings';
import * as Block from "_atoms/block";
import * as List from "_atoms/list";
import * as Button from "_atoms/button";
import * as Title from "_atoms/title";

export enum Type {
  DEFAULT = 'tag-list',
}

export type Props = Base.Props & {
  type?: Type,
  // $title?: Title.Props,
  $list: List.Props<Button.Props>,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    // $title,
    $list,
  } = props;

  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };
  // const titleProps = {
  //   ...$title,
  // };
  const listProps = {
    ...$list,
  };
  return (
    <Block.Element {...blockProps}>
      {/* <Title.Element {...titleProps} /> */}
      <List.Element {...listProps} />
    </Block.Element>
  )
}