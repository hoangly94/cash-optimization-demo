import React from "react";

import {hydrate} from "react-dom";

import Home from '../components/pages/home'

hydrate(<Home />, document.getElementById("root"));
