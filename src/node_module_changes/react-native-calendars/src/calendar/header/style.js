import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../style';

const STYLESHEET_ID = 'stylesheet.calendar.header';

export default function(theme={}) {
    const appStyle = {...defaultStyle, ...theme};
    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            //paddingLeft: 10,
            //paddingRight: 10,
            alignItems: 'center',
            backgroundColor:'#333333',
            height:100
        },
        monthText: {
            fontSize: appStyle.textMonthFontSize,
            fontFamily: appStyle.textMonthFontFamily,
            fontWeight: appStyle.textMonthFontWeight,
            color: appStyle.monthTextColor,
            flexWrap:'wrap',
            // textTransform: 'uppercase'

        },
        arrow: {
            padding: 30,
        },
        arrowImage: {
            ...Platform.select({
                ios: {
                    tintColor: appStyle.arrowColor
                },
                android: {
                    tintColor: appStyle.arrowColor
                }
            })
        },
        week: {
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        dayHeader: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            fontSize: appStyle.textDayHeaderFontSize,
            fontFamily: appStyle.textDayHeaderFontFamily,
            color: appStyle.textSectionTitleColor
        },
        ...(theme[STYLESHEET_ID] || {})
    });
}
