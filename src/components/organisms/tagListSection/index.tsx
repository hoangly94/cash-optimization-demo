import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
import * as Base from '_/_settings';
import * as Section from "_atoms/section";
import * as Block from "_atoms/block";
import * as Title from "_atoms/title";
import * as TagList from "_molecules/tagList";

export enum Type {
  DEFAULT = 'tag-list-section',
}

export type Props = Section.Props & {
  $innerSection: Block.Props & {
    type?: Type,
    $title?: Title.Props,
    $tagList: TagList.Props,
  },
}

export const Element = (props: Props) => {
  const {
    $innerSection,
  } = props;

  //create props
  const sectionProps = props;

  const innerSection = {
    ...$innerSection,
    // flex: Base.Flex.BETWEEN,
    classNames: Classnames(
      styles[$innerSection.type ?? Type.DEFAULT],
    ),
  };

  const tagListProps = {
    ...$innerSection.$tagList,
  };


  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSection}>
        <TagList.Element {...tagListProps} />
      </Block.Element>
    </Section.Element>
  )
}
