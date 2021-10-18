import * as React from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import * as Base from '~/_settings';
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import { FETCH_MAP } from '~/stores/category/orgs/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';
import classNames from 'classnames';
import styles from '../_styles.css';

export type Props = Popup.Props & {
  popupType?: string,
};

export const Element = (props: Props) => {
  const selector = useSelector(state => state['orgs']);
  const isShown = useSelector(state => state['base'].popups.orgs.mapPopup.isShown);
  const dispatch = useDispatch();
  const key = React.useRef(0);
  key.current += 1;
  React.useEffect(() => {
    dispatch({ type: FETCH_MAP, popupType: props.popupType })
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
              keys: ['orgs', 'mapPopup', 'isShown'],
              value: false,
            }
          }}
        />
      </Block.Element>
    </Popup.Element >
  )
}

Element.displayName = 'MapPopup';

