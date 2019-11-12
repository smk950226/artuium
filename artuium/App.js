import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './redux/configureStore';
import AppContainer from './components/AppContainer';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

const { persistor, store } = configureStore();

class App extends React.Component {
  state = {
    isLoadingComplete: false
  }
  _loadAssetsAsync = async() => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/icon_home.png'),
        require('./assets/images/icon_exhibition.png'),
        require('./assets/images/icon_artwork.png'),
        require('./assets/images/icon_profile.png'),
        require('./assets/images/mona.jpeg'),
        require('./assets/images/recommend.png'),
        require('./assets/images/total.png'),
        require('./assets/images/follow.png'),
        require('./assets/images/notification.png'),
        require('./assets/images/search.png'),
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
        'NotoSansKR-Black': require('./assets/fonts/NotoSansKR-Black.otf'),
        'NotoSansKR-Bold': require('./assets/fonts/NotoSansKR-Bold.otf'),
        'NotoSansKR-Light': require('./assets/fonts/NotoSansKR-Light.otf'),
        'NotoSansKR-Medium': require('./assets/fonts/NotoSansKR-Medium.otf'),
        'NotoSansKR-Regular': require('./assets/fonts/NotoSansKR-Regular.otf'),
        'NotoSansKR-Thin': require('./assets/fonts/NotoSansKR-Thin.otf'),
      })
    ])
  }

  _handleLoadingError = error => {
    console.error(error);
  }

  _handleFinishLoading = async() => {
    this.setState({
      isLoadingComplete: true
    })
  }
  render() {
    const { isLoadingComplete } = this.state;
    if(!isLoadingComplete){
      return (
        <AppLoading  
        startAsync={this._loadAssetsAsync} 
        onError={this._handleLoadingError} 
        onFinish={this._handleFinishLoading} 
        />
      )
    }
    else{
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      );
    }
  }
}

export default App;