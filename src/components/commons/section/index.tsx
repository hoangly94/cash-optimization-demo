import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css';
import * as Base from '~/_settings';

export enum Type {
  DEFAULT = 'section',
}

export type Props = Base.Props & {
  type?: Type,
  children?: React.ReactNode,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    children,
    padding = Base.Padding.PX_18,
    theme = Base.Theme.DEFAULT,
  } = props;

  //create props
  const sectionProps = Base.mapProps({
    ...props,
    padding: padding,
  }, styles, [type, theme]);

  return (
    <section {...sectionProps}>{children}</section>
  )
}

Element.displayName = 'Section'
