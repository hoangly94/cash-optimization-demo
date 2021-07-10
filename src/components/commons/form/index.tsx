import React, { useRef } from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Block from '~commons/block';
import * as Label from '~commons/label';
import * as Input from '~commons/input';
import * as Button from '~commons/button';
import { _Date, getCurrentDate } from '@utils';

export enum Type {
  DEFAULT = 'form',
}

export type Props = Base.Props & {
  type?: Type,
  $contents: Content[],
  $buttons?: Button.Props[],
};

type Content = Block.Props & {
  $elements: ContentElement[],
}
type ContentElement = Input.Props | Label.Props | React.ReactNode;

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    $contents,
    $buttons,
  } = props;

  const inputRefList = useRef({});

  //create props
  const componentProps = {
    ...Base.mapProps(props, styles, [type]),
  };

  return (
    <div {...componentProps} >
      {$contents.map(mapPropsToContentElements(inputRefList))}
    </div>
  )
}

const mapPropsToContentElements = (inputRefList) => (props: Content, index: number) => {
  return <Block.Element key={index} {...props}>
    {props.$elements.map(mapPropsToContentElements2(inputRefList))}
  </Block.Element>

}

const mapPropsToContentElements2 = (inputRefList) => (element: ContentElement, index: number) => {
  if(!element || !element['type']){
    return element;
  }
  if (element['type'] === Label.Type.DEFAULT) {
    return mapPropsToLabelElement(element as Label.Props, index);
  }
  if (element['type'] === Input.Type.DEFAULT) {
    return mapPropsToInputElement(inputRefList)(element as Input.Props, index);
  }
  return null;
}

const mapPropsToLabelElement = ($label: Label.Props, index: number) => {
  return <Label.Element key={index} {...$label} />;
}

const mapPropsToInputElement = (inputRefList) => ($input: Input.Props, index: number) => {
  const ref = useRef(null);
  inputRefList = {
    ...inputRefList,
    [$input.name ?? '']: ref,
  };

  const inputElement = <Input.Element key={index} refs={ref} {...$input} />;
  if (ref.current)
    (ref as any).current.value = $input.defaultValue;
  return inputElement;
}

Element.displayName = 'Form';
