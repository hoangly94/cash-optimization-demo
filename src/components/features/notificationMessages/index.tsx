import React, { useEffect, useLayoutEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";

import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_CODE_FILTER, FETCH_DATA, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_START } from '~stores/routeTracking/constants';
import { ADD_NOTI, HANDLE_POPUP } from '_/stores/_base/constants';
import moment from 'moment';

// global.Buffer = global.Buffer || require('buffer').Buffer;
// var amqp = require('amqplib/callback_api');

import Stomp from 'stompjs'

export type Props = Base.Props;
let dispatch;
export default (props: Props) => {
  dispatch = useDispatch();


  function onConnect() {
    console.log('Connected')
  }

  function onError(e) {
    console.log("STOMP ERROR", e);
  }
  
  return (
    <>
    </>
  )
}


