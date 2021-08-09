import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import ReactSrcDocIframe from 'react-srcdoc-iframe';
import { FETCH_MAP } from '_/stores/routeManagement/normal/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';
import styles from '../_styles.css'
import classNames from 'classnames';

export type Props = Base.Props;

export const Element = (props: Popup.Props) => {
  const selector = useSelector(state => state['routeManagement']);
  const isShown = useSelector(state => state['base'].popups.routeManagement.mapPopup.isShown);
  const dispatch = useDispatch();
  const key = React.useRef(0);
  key.current += 1;
  React.useEffect(() => {
    dispatch({ type: FETCH_MAP })
  }, [isShown]);

  const mapHtml = React.useMemo(() => {
    if (selector?.mapHtml)
      return selector?.mapHtml && <iframe key={key.current} src={"data:text/html," + encodeURIComponent(selector?.mapHtml)} />
  }, [selector?.mapHtml]);

  return (
    <Popup.Element
      {...props}
      $content={{
        classNames: classNames(
          styles['map'],
        )
      }}
    >
      {mapHtml}
      <Block.Element
        flex={Base.Flex.END}
      >
        <Button.Element
          text='Close'
          width={Base.Width.FULL}
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

