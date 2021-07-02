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
import { useDispatch, useSelector } from 'react-redux';
import { _Array, _Date } from '@utils';
import { useComponentClickOutside } from '@hooks';
import { HANDLE_DUALTABLE_MOVE, SELECT_AUTHORITY_CONTENT_ROW } from '_/stores/authority/registration/constants';

export enum Type {
  DEFAULT = 'dualtable',
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
  $title1?: Title.Props,
  $title2?: Title.Props,
  label1?: string,
  label2?: string,
  store: Store,
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
    store
  } = props;
  const dispatch = useDispatch();
  const table1DataSelector = store && store.selector1Keys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selector1Keys as string[])) : [];
  const table2DataSelector = store && store.selector2Keys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selector2Keys as string[])) : [];

  const table1Props = {
    ...tableData(table1DataSelector?.map(mapResponseToData(handleRowClick(dispatch, store.row1ClickAction)))),
  }
  const table2Props = {
    ...tableData(table2DataSelector?.map(mapResponseToData(handleRowClick(dispatch, store.row2ClickAction)))),
  }

  const componentProps = {
    classNames: Classnames(
      // styles[type],
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

const tableData = (queryResult?): Table.Props => ({
  $rows: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          children: 'Nội dung ủy quyền',
        },
      ],
    },
    ...(queryResult ? queryResult : []),
  ],
})

const mapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: item.name,
    },
  ]
})

Element.displayName = 'DualTable';












