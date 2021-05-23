import * as config from './config';
import styles from './_base.css';
import Classnames from 'classnames'
import {_Object} from '~utilities/util'

export enum Theme {
    DEFAULT = 'white-theme',
    DARK = 'dark-theme',
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
}

export enum Height {
    NONE = '',
    FIT_SCREEN = 'height-fit-screen',
    PX_100 = 'height-100',
    PX_150 = 'height-150',
    PX_200 = 'height-200',
    PX_300 = 'height-300',
    PX_400 = 'height-400',
    PX_500 = 'height-500',
    PX_600 = 'height-600',
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
}

export enum Margin {
    NONE = '',
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
    WHITE = 'background-color-white',
    BLACK = 'background-color-black',
    BLUE = 'background-color-blue',
    YELLOW = 'background-color-yellow',
    GREEN = 'background-color-green',
    RED = 'background-color-red',
}

export enum FontStyle {
    NONE = '',
    BOLD = 'bold',
    ITALIC = 'italic',
    BOLD_ITALIC = 'bold-italic',
}

export enum BorderStyle {
    NONE = '',
    SOLID = 'border-solid',
}

export type Props = {
    theme?: Theme,
    width?: Width,
    height?: Height,
    padding?: Padding,
    margin?: Margin | MarginTop | MarginRight | MarginBottom | MarginLeft,
    flex?: Flex,
    visibility?: Visibility,
    textAlign?: TextAlign,
    color?: Color,
    backgroundColor?: BackgroundColor,
    fontStyle?: FontStyle,
    borderStyle?: BorderStyle,

    children?: React.ReactNode,
    classNames?: string,
    style?: { [key: string]: any; },
}

export const mapProps = (
    props: Props = {},
    elementStyles: { [key: string]: any } = {},
    elementClasses: string[] = [],
) => {
    const {
        width = Width.NONE,
        height = Height.NONE,
        padding = Padding.NONE,
        margin = Margin.NONE,
        flex = Flex.NONE,
        visibility = Visibility.NONE,
        textAlign = TextAlign.NONE,
        color = Color.NONE,
        backgroundColor = BackgroundColor.NONE,
        fontStyle = FontStyle.NONE,
        borderStyle = BorderStyle.SOLID,

        classNames,
        style,
    } = props;

    const elementClassNames = elementClasses.map(elementClass => elementStyles[elementClass]);
    const classProps = {
        className: Classnames(
            styles[width],
            styles[height],
            styles[padding],
            styles[margin],
            styles[flex],
            styles[visibility],
            styles[textAlign],
            styles[color],
            styles[backgroundColor],
            styles[fontStyle],
            styles[borderStyle],
            ...elementClassNames,
            classNames,
        ),
        style: style,
    };
    
    return _Object.removeEmptyValue(classProps);;
}

export const Config = config;