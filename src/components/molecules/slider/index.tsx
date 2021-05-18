import * as React from 'react'
import Classnames from 'classnames'
import * as Title from "_atoms/title";
import { Icon, IconSize, IconType, ChevronLeft, ChevronRight } from "_atoms/icon";
import * as Block from "_atoms/block";
import * as List from "_atoms/list";
import * as Item from "./item";
import * as Dot from "./dot";
import styles from './styles.css';
import * as Base from '_/_settings';

enum Type {
  DEFAULT = 'slider',
}

enum ArrowButtonType {
  DEFAULT = 'arrow',
  CIRCLE = 'arrow-circle',
}

enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Props = Block.Props & {
  type?: string,
  size?: string,
  $innerSlider: Block.Props & {
    $items: Item.Props[],
  },
  arrowButtonType?: ArrowButtonType,
  title?: string,
  dot?: Dot.Props,
  infinity?: boolean,
  repeat?: boolean,
  autoRepeat?: boolean,
  repeatTime?: number,
}

const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    arrowButtonType,
    size = Size.MEDIUM,
    height,
    infinity = true,
    repeatTime = 0.2,
    $innerSlider, dot,
    title,
    autoRepeat = true,
    repeat = true
  } = props;

  //create state

  const [slideIndexState, setSlideIndexState] = React.useState(0);
  const [prevButtonDisplayState, setPrevButtonDisplayState] = React.useState(infinity ? Base.Visibility.VISIBLE : Base.Visibility.DISABLE);
  const [nextButtonDisplayState, setNextButtonDisplayState] = React.useState(Base.Visibility.VISIBLE);

  const dotListStateInit = [true, ...Array($innerSlider.$items.length - 1).fill(false)];
  const [dotListState, setDotListState] = React.useState(dotListStateInit);

  const handleArrowButtonClickFunction = handleArrowButtonClick($innerSlider.$items.length, infinity, setNextButtonDisplayState, setPrevButtonDisplayState, setSlideIndexState, setDotListState);


  const iconButtonType = (() => {
    switch (arrowButtonType) {
      case ArrowButtonType.CIRCLE:
        return IconType.CIRCLE;
      default:
        return IconType.DEFAULT;
    }
  })();

  const innerSliderClassName = 'slider-inner';
  const prevButtonClassName = 'prev';
  const nextButtonClassName = 'next';

  //create props
  const sliderProps = {
    ...props,
    classNames: Classnames(
      styles[type],
      styles[size],
    ),
    height: height,
  };

  const innerSliderProps = {
    ...$innerSlider,
    classNames: Classnames(
      styles[innerSliderClassName],
    ),
    style: {
      // left: `-100%`,
      left: `-${slideIndexState * 100}%`,
      transition: `left ${repeatTime}s linear`,
      // transform: `translateX(${transformXCssState})%`,
    },
  };

  const dotListProps = {
    style: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
    }
  };

  const prevButtonProps = {
    type: iconButtonType,
    size: IconSize.LARGE,
    onClick: () => handleArrowButtonClickFunction(slideIndexState - 1),
    src: ChevronLeft,
    visibility: prevButtonDisplayState,
    className: styles[prevButtonClassName],
  };

  const nextButtonProps = {
    type: iconButtonType,
    size: IconSize.LARGE,
    onClick: () => handleArrowButtonClickFunction(slideIndexState + 1),
    src: ChevronRight,
    visibility: nextButtonDisplayState,
    className: styles[nextButtonClassName],
  }

  const imageList = $innerSlider.$items.map((item, index) => {
    const itemProps = {
      ...item,
      index: index,
      key: index,
      height: height,
    }
    return (<Item.Element {...itemProps} />);
  });

  const titleTag = title ? <Title.Element>{title}</Title.Element> : '';

  const dotListElement = mapDotList(dot, $innerSlider.$items.length, dotListState, handleArrowButtonClickFunction);

  return (
    <Block.Element {...sliderProps}>
      {titleTag}
      <Block.Element {...innerSliderProps}>
        {imageList}
      </Block.Element>
      <Icon {...prevButtonProps} />
      <Icon {...nextButtonProps} />
      <List.Element {...dotListProps}>
        {dotListElement}
      </List.Element>
    </Block.Element>
  );
}


const handleArrowButtonClick = (
  itemsSize: number,
  infinity: boolean,
  setNextButtonDisplayState: React.Dispatch<React.SetStateAction<Base.Visibility>>,
  setPrevButtonDisplayState: React.Dispatch<React.SetStateAction<Base.Visibility>>,
  setSlideIndexState: React.Dispatch<React.SetStateAction<number>>,
  setDotListState: React.Dispatch<React.SetStateAction<boolean[]>>,
) => {
  if (infinity) {
    return (slideIndexState: number) => {
      const newSlideIndexState = (slideIndexState + itemsSize) % itemsSize;
      setSlideIndexState(newSlideIndexState);
      setDotListState(mapNewDotListState(itemsSize, newSlideIndexState));
    }
  }
  return (slideIndexState: number) => {
    if (slideIndexState < 0 || slideIndexState >= itemsSize)
      return;
    if (slideIndexState === 0) {
      setPrevButtonDisplayState(Base.Visibility.DISABLE);
      setNextButtonDisplayState(Base.Visibility.VISIBLE);
    }

    if (slideIndexState === itemsSize - 1) {
      setPrevButtonDisplayState(Base.Visibility.VISIBLE);
      setNextButtonDisplayState(Base.Visibility.DISABLE);
    }

    if (![0, itemsSize - 1].includes(slideIndexState)) {
      setPrevButtonDisplayState(Base.Visibility.VISIBLE);
      setNextButtonDisplayState(Base.Visibility.VISIBLE);
    }

    setSlideIndexState(slideIndexState);
    setDotListState(mapNewDotListState(itemsSize, slideIndexState));
  }
}

const mapNewDotListState = (itemsSize: number, dotIndex: number) => {
  return Array(itemsSize).fill(false).map((_, index) => {
    if (dotIndex === index)
      return true;
    return false;
  });
}

const mapDotList = (dot: Dot.Props = {}, amount: number, dotListState: boolean[], handleArrowButtonClickFunction: (index: number) => void) => {

  return Array.from({ length: amount }, (_, index) => {
    const dotProps = {
      ...dot,
      key: index,
      onClick: () => handleArrowButtonClickFunction(index),
      isActive: dotListState[index],
    };
    return <Dot.Element {...dotProps} />
  });
}

export {
  Element,
  Type,
  Size,
  Props,
};
