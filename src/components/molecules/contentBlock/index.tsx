import * as React from 'react'
import Classnames from 'classnames'
import * as Button from "_atoms/button";
import * as Title from "_atoms/title";
import * as Text from "_atoms/text";
import * as Block from "_atoms/block";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'content-block',
  SLIDER = 'slider-content-block',
}

enum Size {
  SMALL = 'item-small',
  MEDIUM = 'item-medium',
  LARGE = 'item-large',
}

type Props = Base.Props & Block.Props & {
  type?: Type,
  size?: Size,
  $title?: Title.Props,
  $description?: Text.Props,
  $button?: Button.Props,
};

const titleElement = (title: Title.Props = {}, theme: Base.Theme) => {
  if (!title)
    return null;

  const titleProps = {
    ...title,
    theme: theme,
  }

  return <Title.Element {...titleProps} />;
}

const descriptionElement = ($description: Text.Props = {}, theme: Base.Theme) => {
  if (!$description)
    return null;

  const descriptionProps = {
    ...$description,
    theme: theme,
  }

  return <Text.Element {...descriptionProps} />;
}

const buttonElement = ($button: Button.Props = {}, theme: Base.Theme) => {
  if (!$button)
    return null;

  const buttonProps = {
    type: Button.Type.DEFAULT,
    style: {
      marginTop: '8px',
    },
    ...$button,
    theme: theme,
  }

  return <Button.Element {...buttonProps} />;
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.MEDIUM,
    theme = Base.Theme.DEFAULT,
    $title,
    $description,
    $button,
  } = props;

  //create props
  const blockProps = {
    ...props,
    classNames: Classnames(
      styles[type],
      styles[size],
    ),
  };

  return (
    <Block.Element {...blockProps}>
      {titleElement($title, theme)}
      {descriptionElement($description, theme)}
      {buttonElement($button, theme)}
    </Block.Element>
  );
}

export {
  Element,
  Type,
  Size,
  Props,
};
