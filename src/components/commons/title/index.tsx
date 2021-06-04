import * as React from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'title',
}

export enum TagType {
  DEFAULT = '',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
}

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  tagType?: TagType,
  text?: string,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    text,
    size = Size.MEDIUM,
    tagType = TagType.DEFAULT,
  } = props;

  //create props
  const titleProps = Base.mapProps(props, styles, [type, size]);

  if (tagType === TagType.H3) {
    return (
      <h3 {...titleProps}>
        {text}
      </h3>
    )
  }

  if (tagType === TagType.H2) {
    return (
      <h2 {...titleProps}>
        {text}
      </h2>
    )
  }

  if (tagType === TagType.H1) {
    return (
      <h1 {...titleProps}>
        {text}
      </h1>
    )
  }

  return (
    <div {...titleProps}>
      {text}
    </div>
  )
}

Element.displayName = 'Title'


