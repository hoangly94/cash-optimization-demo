import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "_atoms/block";
import * as Section from "_atoms/section";
import * as TextBlock from "_molecules/textBlock";
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAULT = 'text-section',
}

type Props = Section.Props & {
  $innerSection: Block.Props & {
    type?: Type,
    $text: TextBlock.Props,
  }
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $innerSection,
  } = props;

  //create props
  const sectionProps = props;

  const innerSectionProps = {
    ...$innerSection,
    classNames: Classnames(
      styles[type],
    ),
  };
  const textBlockProps = $innerSection.$text;

  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSectionProps}>
        <TextBlock.Element {...textBlockProps} />
      </Block.Element>
    </Section.Element>
  )
}

Element.defaultProps = {
}

export {
  Element,
  Type,
  Props,
};
