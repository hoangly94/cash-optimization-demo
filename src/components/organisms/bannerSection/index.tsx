import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "_atoms/block";
import * as Title from "_atoms/title";
import * as Section from "_atoms/section";
import * as Slider from "_molecules/slider";
import * as Base from '_/_settings';
import styles from './styles.css';

export enum Type {
  DEFAULT = 'banner',
}

export type Props = Section.Props & {
  $innerSection: Block.Props & {
    type?: Type,
    $title?: Title.Props,
    $slider: Slider.Props,
  },
}

export const Element = (props: Props) => {
  const {
    $innerSection,
  } = props;

  //create props
  const sectionProps = props;

  const innerSectionProps = {
    ...$innerSection,
    classNames: Classnames(
      styles[$innerSection.type ?? Type.DEFAULT],
    ),
  };

  const sliderProps = {
    ...$innerSection.$slider,
  };

  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSectionProps}>
        <Slider.Element {...sliderProps} />
      </Block.Element>
    </Section.Element>
  )
}

