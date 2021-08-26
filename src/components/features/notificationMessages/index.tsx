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

global.Buffer = global.Buffer || require('buffer').Buffer;
var amqp = require('amqplib/callback_api');

export type Props = Base.Props;
let dispatch;
export default (props: Props) => {
  dispatch = useDispatch();
  // const selector = useSelector(state => state['routeTracking']);
  // useEffect(() => {
  //   amqp.connect('amqp://34.126.185.230:8672', function (error0, connection) {
  //     if (error0) {
  //       throw error0;
  //     }
      
  //     console.log("==============START================");
  //     connection.createChannel(function (error1, channel) {
  //       if (error1) {
  //         throw error1;
  //       }
  //       var queue = 'hello';

  //       channel.assertQueue(queue, {
  //         durable: false
  //       });
  //       console.log("==============================");
  //       console.log("==============================");
  //       console.log("==============================");
  //       console.log("==============================");
  //       console.log("==============================");
  //       console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  //       channel.consume(queue, function (msg) {
  //         console.log("==============================1");
  //         console.log("==============================1");
  //         console.log("==============================1"); 
  //         console.log("==============================1");
  //         console.log("==============================1");
  //         console.log(" [x] Received %s", msg.content.toString());
  //       }, {
  //         noAck: true
  //       });
  //     });
  //   });

  // }, []);

  return (
    <>
    </>
  )
}


