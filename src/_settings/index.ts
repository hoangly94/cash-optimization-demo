import * as config from './config';
import styles from './_base.css';
import Classnames from 'classnames'
import {_Object} from '@utils'

export enum Theme {
    DEFAULT = 'light-theme',
    LIGHT = 'light-theme',
    DARK = 'dark-theme',
}

export enum Position {
    NONE = '',
    RELATIVE = 'position-relative',
    ABSOLUTE = 'position-absolute',
    ABSOLUTE_CENTER = 'position-absolute-center',
    FIXED_CENTER = 'position-fixed-center',
}


export enum Width {
    NONE = '',
    FULL = 'width-full',
    S2 = 'width-s2',
    S1 = 'width-s1',
    S = 'width-s',
    M = 'width-m',
    L = 'width-l',
    L1 = 'width-l1',
    L2 = 'width-l2',
    PX_40 = 'width-40px',
    PX_50 = 'width-50px',
    PX_80 = 'width-80px',
    PX_100 = 'width-100px',
    PX_150 = 'width-150px',
    PX_200 = 'width-200px',
    PX_300 = 'width-300px',
    PX_400 = 'width-400px',
    PX_500 = 'width-500px',
    PX_600 = 'width-600px',
    PX_700 = 'width-700px',
    PX_800 = 'width-800px',
    PX_900 = 'width-900px',
    PX_1000 = 'width-1000px',
    PX_1100 = 'width-1100px',
    PX_1200 = 'width-1200px',
    PER_20 = 'width-20per',
    PER_30 = 'width-30per',
    PER_40 = 'width-40per',
    PER_50 = 'width-50per',
    PER_60 = 'width-60per',
    PER_70 = 'width-70per',
    PER_80 = 'width-80per',
}

export enum Height {
    NONE = '',
    FIT_SCREEN = 'height-fit-screen',
    PX_30 = 'height-30px',
    PX_40 = 'height-40px',
    PX_50 = 'height-50px',
    PX_100 = 'height-100px',
    PX_150 = 'height-150px',
    PX_200 = 'height-200px',
    PX_300 = 'height-300px',
    PX_400 = 'height-400px',
    PX_500 = 'height-500px',
    PX_600 = 'height-600px',
}

export enum Padding {
    NONE = '',
    PX_3 = 'padding-3',
    PX_5 = 'padding-5',
    PX_8 = 'padding-8',
    PX_10 = 'padding-10',
    PX_12 = 'padding-12',
    PX_15 = 'padding-15',
    PX_18 = 'padding-18',
    PX_28 = 'padding-28',
    PX_38 = 'padding-38',
    PX_68 = 'padding-68',
}

export enum PaddingV {
    NONE = '',
    PX_3 = 'padding-v-3',
    PX_5 = 'padding-v-5',
    PX_8 = 'padding-v-8',
    PX_10 = 'padding-v-10',
    PX_12 = 'padding-v-12',
    PX_15 = 'padding-v-15',
    PX_18 = 'padding-v-18',
    PX_28 = 'padding-v-28',
    PX_38 = 'padding-v-38',
}

export enum PaddingH {
    NONE = '',
    PX_3 = 'padding-h-3',
    PX_5 = 'padding-h-5',
    PX_8 = 'padding-h-8',
    PX_10 = 'padding-h-10',
    PX_12 = 'padding-h-12',
    PX_15 = 'padding-h-15',
    PX_18 = 'padding-h-18',
    PX_28 = 'padding-h-28',
    PX_38 = 'padding-h-38',
}

export enum Margin {
    NONE = '',
    AUTO = 'margin-auto',
    PX_3 = 'margin-3',
    PX_5 = 'margin-5',
    PX_8 = 'margin-8',
    PX_10 = 'margin-10',
    PX_12 = 'margin-12',
    PX_15 = 'margin-15',
    PX_18 = 'margin-18',
    PX_28 = 'margin-28',
    PX_38 = 'margin-38',
}

export enum MarginTop {
    NONE = '',
    PX_3 = 'margin-top-3',
    PX_5 = 'margin-top-5',
    PX_8 = 'margin-top-8',
    PX_10 = 'margin-top-10',
    PX_12 = 'margin-top-12',
    PX_15 = 'margin-top-15',
    PX_18 = 'margin-top-18',
    PX_28 = 'margin-top-28',
    PX_38 = 'margin-top-38',
}

export enum MarginRight {
    NONE = '',
    PX_3 = 'margin-right-3',
    PX_5 = 'margin-right-5',
    PX_8 = 'margin-right-8',
    PX_10 = 'margin-right-10',
    PX_12 = 'margin-right-12',
    PX_15 = 'margin-right-15',
    PX_18 = 'margin-right-18',
    PX_28 = 'margin-right-28',
    PX_38 = 'margin-right-38',
}

export enum MarginBottom {
    NONE = '',
    PX_3 = 'margin-bottom-3',
    PX_5 = 'margin-bottom-5',
    PX_8 = 'margin-bottom-8',
    PX_10 = 'margin-bottom-10',
    PX_12 = 'margin-bottom-12',
    PX_15 = 'margin-bottom-15',
    PX_18 = 'margin-bottom-18',
    PX_28 = 'margin-bottom-28',
    PX_38 = 'margin-bottom-38',
}

export enum MarginLeft {
    NONE = '',
    PX_3 = 'margin-left-3',
    PX_5 = 'margin-left-5',
    PX_8 = 'margin-left-8',
    PX_10 = 'margin-left-10',
    PX_12 = 'margin-left-12',
    PX_15 = 'margin-left-15',
    PX_18 = 'margin-left-18',
    PX_28 = 'margin-left-28',
    PX_38 = 'margin-left-38',
}

export enum Flex {
    NONE = '',
    START = 'flex-start',
    END = 'flex-end',
    CENTER = 'flex-center',
    BETWEEN = 'flex-between',
    AROUND = 'flex-around',
    EVENLY = 'flex-evenly',
}
export enum FlexGrow {
    NONE = '',
    G1 = 'flex-grow-1',
    G2 = 'flex-grow-2',
    G3 = 'flex-grow-3',
}
export enum AlignItems {
    NONE = '',
    STRETCH = 'align-items-stretch',
    CENTER = 'align-items-center',
    START = 'align-items-start',
    END = 'align-items-end',
    BASELINE = 'align-items-baseline',
}

export enum Visibility {
    NONE = '',
    VISIBLE = 'visible',
    HIDDEN = 'hidden',
    DISABLE = 'disable',
}

export enum TextAlign {
    NONE = '',
    LEFT = 'text-align-left',
    CENTER = 'text-align-center',
    RIGHT = 'text-align-right',
}

export enum LineHeight {
    NONE = '',
    S1 = 'lineheight-s1',
    S = 'lineheight-s',
    M = 'lineheight-m',
    L = 'lineheight-l',
    L1 = 'lineheight-l1',
}

export enum Color {
    NONE = '',
    WHITE = 'color-white',
    BLACK = 'color-black',
    BLUE = 'color-blue',
    YELLOW = 'color-yellow',
    GREEN = 'color-green',
    RED = 'color-red',
}

export enum BackgroundColor {
    NONE = '',
    WHITE = 'backgroundColor-white',
    BLACK = 'backgroundColor-black',
    BLUE = 'backgroundColor-blue',
    YELLOW = 'backgroundColor-yellow',
    GREEN = 'backgroundColor-green',
    RED = 'backgroundColor-red',
    CLASSIC_BLUE = 'backgroundColor-classic-blue',
    TIGERLILY = 'backgroundColor-tigerlily',
    ULTIMATE_GRAY = 'backgroundColor-ultimate-gray',
    BRIGHT_GRAY = 'backgroundColor-bright-gray',
}

export enum FontStyle {
    NONE = '',
    BOLD = 'bold',
    ITALIC = 'italic',
    BOLD_ITALIC = 'bold-italic',
}

export enum Border {
    DEFAULT = '',
    NONE = 'border-none',
    SOLID = 'border-solid',
}

export enum BorderRadius {
    NONE = '',
    PX_2 = 'border-radius-px-2',
    PX_3 = 'border-radius-px-3',
    PX_5 = 'border-radius-px-5',
    PX_8 = 'border-radius-px-8',
    PX_100 = 'border-radius-px-100',
    PER_ = 'border-radius-per-50',
}

export enum WhiteSpace {
    NONE = '',
    NOWRAP = 'whitespace-nowrap',
    NOWRAP_ELLIPSIS = 'whitespace-nowrap-ellipsis',
}

export type Props = {
    theme?: Theme,
    position?: Position,
    width?: Width,
    height?: Height,
    padding?: Padding | PaddingV | PaddingH,
    margin?: Margin | MarginTop | MarginRight | MarginBottom | MarginLeft,
    flex?: Flex,
    flexGrow?: FlexGrow,
    alignItems?: AlignItems,
    visibility?: Visibility,
    textAlign?: TextAlign,
    color?: Color,
    backgroundColor?: BackgroundColor,
    fontStyle?: FontStyle,
    border?: Border,
    borderRadius?:BorderRadius,
    lineHeight?: LineHeight,
    whiteSpace?: WhiteSpace,

    children?: React.ReactNode,
    classNames?: string,
    style?: { [key: string]: any; },

    refs?:React.MutableRefObject<null>,
}

export const mapProps = (
    props: Props = {},
    elementStyles: { [key: string]: any } = {},
    elementClasses: string[] = [],
) => {
    const {
        position = Position.NONE,
        width = Width.NONE,
        height = Height.NONE,
        padding = Padding.NONE,
        margin = Margin.NONE,
        flex = Flex.NONE,
        flexGrow = FlexGrow.NONE,
        alignItems = AlignItems.NONE,
        visibility = Visibility.NONE,
        textAlign = TextAlign.NONE,
        color = Color.NONE,
        backgroundColor = BackgroundColor.NONE,
        fontStyle = FontStyle.NONE,
        border = Border.DEFAULT,
        borderRadius = BorderRadius.NONE,
        lineHeight = LineHeight.NONE,
        whiteSpace = WhiteSpace.NONE,

        classNames,
        style,
    } = props;
    
    const elementClassNames = elementClasses.map(elementClass => elementStyles[elementClass]);
    
    const classProps = {
        className: Classnames(
            styles[position],
            styles[width],
            styles[height],
            styles[padding],
            styles[margin],
            styles[flex],
            styles[flexGrow],
            styles[alignItems],
            styles[visibility],
            styles[textAlign],
            styles[color],
            styles[backgroundColor],
            styles[fontStyle],
            styles[border],
            styles[borderRadius],
            styles[lineHeight],
            styles[whiteSpace],
            ...elementClassNames,
            classNames,
        ),
        style: style,
    };
    
    return _Object.removeEmptyValue(classProps);;
}

export const Config = config;