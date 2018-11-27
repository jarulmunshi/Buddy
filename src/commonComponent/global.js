import {
    Dimensions,
    Platform
} from 'react-native';
import {WindowsHeight} from './global'

let footerHeight = Platform.OS === 'ios' ? 50 : 78
footerHeight = footerHeight + 50

module.exports = {
    WindowsWidth: Dimensions.get('window').width,
    WindowsHeight: Dimensions.get('window').height,
    DisplayAreaView: Dimensions.get('window').height - footerHeight,
    LatoFont: Platform.OS === 'ios'? 'Lato' : 'Lato_Regular',
    MyriadFont: Platform.OS === 'ios'? 'Myriad Pro' : 'MyriadPro_Regular',
};
