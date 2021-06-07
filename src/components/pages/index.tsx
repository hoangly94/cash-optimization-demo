import React from "react";
import { Provider } from 'react-redux';
import store from '~stores/dashboard.store';
import * as Dasboard from "~templates/dashboard";

const dashboardProps: Dasboard.Props = {
}

export default () => (
    <Provider store={store}>
      <Dasboard.Element {...dashboardProps} />
    </Provider>
);