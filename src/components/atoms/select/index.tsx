import * as React from 'react'
import Classnames from 'classnames'
import styles from './styles.css'
import * as Base from '_/_settings';
import * as Option from './option'

enum Type {
  DEFAULT = 'select',
}

type Props = Base.Props & {
  type?: Type,
  $options?: Option.Props[],
  onChange?(event: object):void,
}

const Element = (props: Props): React.ReactElement => {
  const { 
    type = Type.DEFAULT, 
    theme = Base.Theme.DEFAULT,
    $options,
    onChange,
  } = props;

  //create props
  const selectProps = {
    ...Base.mapProps(props, styles, [type, theme]),
    onChange: onChange,
  };

  const childrenElement = $options?.map(childrenElementMapping);

  return (
    <select {...selectProps}>{childrenElement}</select>
  )
}

const childrenElementMapping = ($option: Option.Props = {})=>{
  const optionProps = $option;
  return <Option.Element {...optionProps}/>;
};

export {
  Element,
  Type,
  Props,
};