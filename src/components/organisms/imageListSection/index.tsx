import * as React from 'react'
import Classnames from 'classnames'
import * as Section from "_atoms/section";
import * as Block from "_atoms/block";
import * as ImageText from "_molecules/imageText";
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAULT = 'image-section',
}

type Props = Base.Props & {
  $innerSection: Block.Props & {
    type?: Type,
    $imageTexts: ImageText.Props[],
  },
}

const Element = (props: Props) => {
  const {
    $innerSection,
  } = props;

  //create props
  const sectionProps = props;

  const innerSection = {
    ...$innerSection,
    flex: Base.Flex.BETWEEN,
    classNames: Classnames(
      styles[$innerSection.type ?? Type.DEFAULT],
    ),
  };

  const imageElements = $innerSection ? $innerSection.$imageTexts?.map(mapImageElements) : null;

  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSection}>
        {imageElements}
      </Block.Element>
    </Section.Element>
  )
}

const mapImageElements = ($imageTextBlock: ImageText.Props) => {
  const imageTextBlockProps = $imageTextBlock;

  return (
    <ImageText.Element {...imageTextBlockProps}>
    </ImageText.Element>);
}

export {
  Element,
  Type,
  Props,
};
