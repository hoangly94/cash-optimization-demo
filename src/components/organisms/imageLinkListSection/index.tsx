import * as React from 'react'
import Classnames from 'classnames'
import * as Section from "_atoms/section";
import * as Block from "_atoms/block";
import * as ImageLinkList from "_molecules/imageLinkList";
import * as Base from '_/_settings';
import styles from './styles.css';

enum Type {
  DEFAULT = 'image-link-list-section',
}

type Props = Base.Props & {
  $innerSection: Block.Props & {
    type?: Type,
    $imageLinkList: ImageLinkList.Props[],
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

  const imageLinkListElements = $innerSection ? $innerSection.$imageLinkList?.map(mapImageElementMapping) : null;

  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSection}>
        {imageLinkListElements}
      </Block.Element>
    </Section.Element>
  )
}

const mapImageElementMapping = ($imageTextBlock: ImageLinkList.Props) => {
  const imageTextBlockProps = $imageTextBlock;

  return (
    <ImageLinkList.Element {...imageTextBlockProps}>
    </ImageLinkList.Element>);
}

export {
  Element,
  Type,
  Props,
};
