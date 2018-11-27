/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import Home from './src/component/Home';
import Admin from './src/component/Admin'
import {name as appName} from './app.json';
import Stack from './src/helper/navigation/Stack'

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Stack);
