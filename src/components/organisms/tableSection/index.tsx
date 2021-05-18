import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
import * as Section from "_atoms/section";
import * as Table from "_molecules/table";
import * as Block from "_atoms/block";
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'table',
}

enum Theme {
  DEFAULT = '',
}

type Props = Base.Props & {
  $innerSection:  Block.Props & {
    type?: Type,
    title?: string,
    $table: Table.Props,
  },
}

const Element = (props: Props) => {
  const { 
    $innerSection,
  } = props;

  //create props
  const sectionProps = {
    ...props,
    classNames: Classnames(
      styles[$innerSection.type ?? Type.DEFAULT],
    ),
  }

  const innerSectionProps = {
    ...$innerSection,
  }

  const tableProps = {
    ...$innerSection.$table,
    // className: Classnames(
    //   className
    // ),
  }

  return (
    <Section.Element {...sectionProps}>
      <Block.Element {...innerSectionProps}>
        <Table.Element {...tableProps} />
      </Block.Element>
    </Section.Element>
  )
}

Element.defaultProps = {
  type: Type.DEFAULT,
  theme: Theme.DEFAULT,
}

export {
  Element,
  Type,
  Props,
};
