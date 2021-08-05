import React, { useState, useEffect, useRef } from 'react'
import * as Block from '~commons/block'
import * as Title from '~commons/title'
import * as Button from '~commons/button'
import * as Popup from '~commons/popup'
import * as Base from '~/_settings';
import { Width } from '_/_settings'

export type Props = {
  title?: string,
  description?: string,
  onConfirmClick?: React.MouseEventHandler,
  onDismissClick?: React.MouseEventHandler,
  isShown?: boolean,
}
const useConfirmationDialog = ({
  // title,
  // description,
  // onConfirmClick,
  // onDismissClick,
  // isShown = false,
}: Props) => {

  const [props, setProps] = useState({
  });

  return [(
    props['isShown'] &&
    <Popup.Element
      $content={{
        width: Base.Width.PX_600,
        padding: Base.Padding.PX_38,
        style: {
          padding: '0px',
          borderRadius: '3px',
          height: 'auto',
          overflow: 'hidden',
        }
      }}
      isShown={props['isShown']}
      closePopUpCallback={() => {
        setProps({
          ...props,
          isShown: false,
        });
      }}
    >
      {
        props['title'] && <Title.Element
          text={props['title']}
          style={{
            padding: '38px 28px 18px 28px',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        />
      }
      {
        props['description'] && <Title.Element
          text={props['description']}
          style={{
            padding: '0px 28px',
            marginBottom: '20px',
          }}
        />
      }
      <Block.Element
        style={{
          padding: '18px 38px',
          background: '#efefef',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button.Element
          text='YES'
          style={{
            width: '50%',
            borderRadius: '3px',
            background: '#008800',
            color: 'white',
            marginRight: '8px',
          }}
          onClick={() => {
            props['onConfirmClick']();
            setProps({
              ...props,
              isShown: false,
            });
          }}
        />
        <Button.Element
          text='NO'
          style={{
            width: '50%',
            borderRadius: '3px',
            background: '#d84545',
            color: 'white',
            marginLeft: '8px',
          }}
          onClick={() => {
            props['onDismissClick']();
            setProps({
              ...props,
              isShown: false,
            });
          }}
        />
      </Block.Element>
    </Popup.Element >
  ), setProps];
}
export default useConfirmationDialog