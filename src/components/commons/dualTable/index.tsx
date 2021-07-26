import React, { useState } from 'react';
import Classnames from 'classnames';
import styles from './_styles.css'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import Chevron from '~commons/svg/chevron';
import * as Svg from '~commons/svg';
import * as Block from '~commons/block';
import * as Table from '~commons/table';
import * as Title from '~commons/title';
import * as Button from '~commons/button';
import * as Pagination from '~commons/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { _Array, _Date } from '@utils';

export enum Type {
  DEFAULT = 'dualtable',
  BLOCK = 'dualtableBlock',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
  L2 = 'size-l2',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  title1?: string,
  title2?: string,
  label1?: string,
  label2?: string,
  store: Store,
  cellMapping1?: Function,
  cellMapping2?: Function,
  titleCallback1?: Function,
  titleCallback2?: Function,
  actionButtons?: {
    oneRightToLeft?: {
      text?: string,
      disabled: boolean,
    },
    oneLeftToRight?: {
      text?: string,
      disabled: boolean,
    },
    allRightToLeft?: {
      text?: string,
      disabled: boolean,
    },
    allLeftToRight?: {
      text?: string,
      disabled: boolean,
    },
  },
  pagination?: Pagination.Props,
}

type Store = {
  selector1Keys: string[],
  selector2Keys: string[],
  row1ClickAction: Object,
  row2ClickAction: Object,
  selectRowAction?: Object,
  handleMoveActionType: string,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    title1,
    title2,
    store,
    cellMapping1,
    cellMapping2,
    titleCallback1,
    titleCallback2,
    actionButtons,
    pagination,
  } = props;
  const dispatch = useDispatch();
  const table1DataSelector = store && store.selector1Keys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selector1Keys as string[])) : [];
  const table2DataSelector = store && store.selector2Keys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selector2Keys as string[])) : [];

  const table1Props = {
    ...tableData1(titleCallback1, title1, table1DataSelector?.map(mapResponseToData(cellMapping1, handleRowClick(dispatch, store.row1ClickAction)))),
  }
  const table2Props = {
    ...tableData2(titleCallback2, title2, table2DataSelector?.map(mapResponseToData(cellMapping2, handleRowClick(dispatch, store.row2ClickAction)))),
  }
  const componentProps = {
    classNames: Classnames(
      styles[type],
      // styles[size],
    ),
    ...props,
  }
  const buttonProps = {
    backgroundColor: Base.BackgroundColor.GREEN,
    width: Base.Width.FULL,
    border: Base.Border.NONE,
    color: Base.Color.WHITE,
    margin: Base.MarginBottom.PX_18,
  }

  if (type === Type.BLOCK) {
    const paginationElement = pagination? <Pagination.Element
    {...pagination}
  /> : null;
    return (
      <Block.Element {...componentProps}>
        <Block.Element>
          <Block.Element
            width={Base.Width.FULL}
            style={{
              overflow: 'auto',
            }}
          >
            <Table.Element {...table1Props} />
          </Block.Element>
            
          {paginationElement}
          
          <Block.Element
            flex={Base.Flex.BETWEEN}
            padding={Base.PaddingV.PX_18}
            alignItems={Base.AlignItems.START}
            width={Base.Width.PX_400}
          >
            <Button.Element
              {...buttonProps}
              margin={Base.MarginRight.PX_18}
              style={{
                display: actionButtons?.oneRightToLeft?.disabled ? 'none' : 'block',
              }}
              text={actionButtons?.oneRightToLeft?.text || '>'}
              store={{
                action: { type: store.handleMoveActionType, moveType: 'ONE_LEFT_TO_RIGHT' },
              }}
            />
            <Button.Element
              {...buttonProps}
              margin={Base.MarginRight.PX_18}
              style={{
                display: actionButtons?.allRightToLeft?.disabled ? 'none' : 'block',
              }}
              text={actionButtons?.allRightToLeft?.text || '>>'}
              store={{
                action: { type: store.handleMoveActionType, moveType: 'ALL_LEFT_TO_RIGHT' },
              }}
            />
            <Button.Element
              {...buttonProps}
              margin={Base.MarginRight.PX_18}
              style={{
                display: actionButtons?.allLeftToRight?.disabled ? 'none' : 'block',
              }}
              text={actionButtons?.allLeftToRight?.text || '<<'}
              store={{
                action: { type: store.handleMoveActionType, moveType: 'ALL_RIGHT_TO_LEFT' },
              }}
            />
            <Button.Element
              {...buttonProps}
              margin={Base.MarginRight.PX_18}
              style={{
                display: actionButtons?.oneLeftToRight?.disabled ? 'none' : 'block',
              }}
              text={actionButtons?.oneLeftToRight?.text || '<'}
              store={{
                action: { type: store.handleMoveActionType, moveType: 'ONE_RIGHT_TO_LEFT' },
              }}
            />

          </Block.Element>
          <Block.Element
            width={Base.Width.FULL}
            style={{
              overflow: 'auto',
            }}
          >
            <Table.Element {...table2Props} />
          </Block.Element>
        </Block.Element>
      </Block.Element >
    )
  }
  return (
    <Block.Element {...componentProps}>
      <Block.Element
        flex={Base.Flex.BETWEEN}
        alignItems={Base.AlignItems.START}
      >
        <Block.Element
          width={Base.Width.PER_40}
          style={{
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          <Table.Element {...table1Props} />
        </Block.Element>
        <Block.Element
          width={Base.Width.PER_20}
          padding={Base.PaddingH.PX_8}
          margin={Base.MarginTop.PX_38}
        >
          <Button.Element
            {...buttonProps}
            text='>'
            // text='Select >'
            store={{
              action: { type: store.handleMoveActionType, moveType: 'ONE_LEFT_TO_RIGHT' },
            }}
          />
          <Button.Element
            {...buttonProps}
            text='>>'
            // text='Select ALL >>'
            store={{
              action: { type: store.handleMoveActionType, moveType: 'ALL_LEFT_TO_RIGHT' },
            }}
          />
          <Button.Element
            {...buttonProps}
            text='<<'
            // text='<< Remove ALL'
            store={{
              action: { type: store.handleMoveActionType, moveType: 'ALL_RIGHT_TO_LEFT' },
            }}
          />
          <Button.Element
            {...buttonProps}
            text='<'
            // text='< Remove'
            store={{
              action: { type: store.handleMoveActionType, moveType: 'ONE_RIGHT_TO_LEFT' },
            }}
          />

        </Block.Element>
        <Block.Element
          width={Base.Width.PER_40}
          style={{
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          <Table.Element {...table2Props} />
        </Block.Element>
      </Block.Element>
    </Block.Element >
  )
}

const handleRowClick = (dispatch, action) => (item) => (e) => {
  dispatch({ ...action, data: item });
}

const tableData1 = (titleCallback, title1, queryResult?): Table.Props => ({
  $thead: [
    {
      // style: {
      //   backgroundColor: '#1e3f96',
      // },
      // color: Base.Color.WHITE,
      $cells: titleCallback ? titleCallback() : [
        {
          children: title1,
        },
      ],
    },
  ],
  $rows: queryResult ? queryResult : [],
})
const tableData2 = (titleCallback, title2, queryResult?): Table.Props => ({
  $thead: [
    {
      // style: {
      //   backgroundColor: '#1e3f96',
      // },
      // color: Base.Color.WHITE,
      $cells: titleCallback ? titleCallback() : [
        {
          children: title2,
        },
      ],
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const mapResponseToData = (cellMapping, handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: cellMapping ? cellMapping(item, index) : [
    {
      children: item.name,
    },
  ]
})

Element.displayName = 'DualTable';












