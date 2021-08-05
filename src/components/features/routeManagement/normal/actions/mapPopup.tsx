import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import ReactSrcDocIframe from 'react-srcdoc-iframe';
import { FETCH_MAP } from '_/stores/routeManagement/normal/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';

export type Props = Base.Props;

export const Element = (props: Popup.Props) => {
  const selector = useSelector(state => state['routeManagement']);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: FETCH_MAP })
  }, [selector?.organizingPopup?.id]);
  return (
    <Popup.Element
      {...props}
    >
      {selector?.mapHtml && <ReactSrcDocIframe srcDoc={selector?.mapHtml} style={{ width: '100%', height: '500px', boxSizing: 'border-box' }} />}
      <Block.Element
        flex={Base.Flex.END}
      >
        <Button.Element
          text='Close'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
          flexGrow={Base.FlexGrow.G1}
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeManagement', 'mapPopup', 'isShown'],
              value: false,
            }
          }}
        />
      </Block.Element>
    </Popup.Element >
  )
}

Element.displayName = 'MapPopup';

