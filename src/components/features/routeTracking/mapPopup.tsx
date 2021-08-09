import * as React from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import * as Base from '~/_settings';
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import { FETCH_MAP, FETCH_MAP_DRIVER } from '_/stores/routeTracking/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';
import classNames from 'classnames';
import styles from './_styles.css';
import { useForceRender } from '_/hooks';

export type Props = Base.Props;

export const Element = (props: Popup.Props) => {
  const selector = useSelector(state => state['routeTracking']);
  const isShown = useSelector(state => state['base'].popups.routeTracking.mapPopup.isShown);
  const userSelector = useSelector(state => state['auth'].user);
  const dispatch = useDispatch();
  const key = React.useRef(0);
  key.current += 1;
  React.useEffect(() => {
    const perLXE = selector.route?.routeDetailVehicle?.filter(item => item.categoryVehicle?.driverCode === userSelector.persCode);
    if (perLXE?.length)
      dispatch({ type: FETCH_MAP_DRIVER })
    if (!perLXE?.length)
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
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.ULTIMATE_GRAY}
          flexGrow={Base.FlexGrow.G1}
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: false,
            }
          }}
        />
      </Block.Element>
    </Popup.Element >
  )
}

Element.displayName = 'MapPopup';

