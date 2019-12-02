import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import styles from '../../styles';

const iosStatusBarHeight = getStatusBarHeight()
const { width, height } = Dimensions.get('window')

const FirstRoute = () => (
    <ScrollView contentContainerStyle={[styles.alignItemsCenter]} bounces={false} style={[styles.container, { backgroundColor: '#ff4081' }]}>
        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView contentContainerStyle={[styles.alignItemsCenter]} bounces={false} style={[styles.container, { backgroundColor: '#673ab7' }]}>
        <Image source={{uri: 'https://i.pinimg.com/564x/48/62/37/486237812ede6eb5b0735fac6d62c1fa.jpg'}} style={{width: 400, height: 700}} />
        <Image source={{uri: 'https://i.pinimg.com/564x/48/62/37/486237812ede6eb5b0735fac6d62c1fa.jpg'}} style={{width: 400, height: 700}} />
        <Image source={{uri: 'https://i.pinimg.com/564x/48/62/37/486237812ede6eb5b0735fac6d62c1fa.jpg'}} style={{width: 400, height: 700}} />
    </ScrollView>
);

const ThirdRoute = () => (
    <ScrollView contentContainerStyle={[styles.alignItemsCenter]} bounces={false} style={[styles.container, { backgroundColor: '#ff4081' }]}>
        <Image source={{uri: 'http://nimage.globaleconomic.co.kr/phpwas/restmb_allidxmake.php?idx=5&simg=2019111315302604184c4c55f9b3d591019584.jpg'}} style={{width: 400, height: 700}} />
        <Image source={{uri: 'http://nimage.globaleconomic.co.kr/phpwas/restmb_allidxmake.php?idx=5&simg=2019111315302604184c4c55f9b3d591019584.jpg'}} style={{width: 400, height: 700}} />
        <Image source={{uri: 'http://nimage.globaleconomic.co.kr/phpwas/restmb_allidxmake.php?idx=5&simg=2019111315302604184c4c55f9b3d591019584.jpg'}} style={{width: 400, height: 700}} />
    </ScrollView>
);

class LikeListScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '전시' },
                { key: 'second', title: '작품' },
                { key: 'third', title: '감상' },
            ],
        }
    }

    render(){
        return(
            <View style={[styles.container]}>
                <TabView
                    navigationState={this.state}
                    onIndexChange={index => this.setState({ index })}
                    renderScene={SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                        third: ThirdRoute,
                    })}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            activeColor = {'#1162d0'}
                            inactiveColor = {'#d1d1d1'}
                            labelStyle = {[styles.font15, styles.fontMedium]}
                            bounces={false}
                            indicatorStyle={{ backgroundColor: '#1162d0', height: 3 }}
                            style={{ backgroundColor: 'white' }}
                        />
                    }
                />
            </View>
        )
    }
}

LikeListScreen.propTypes = {

}

export default LikeListScreen;