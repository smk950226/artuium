import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, ActivityIndicator, SafeAreaView } from 'react-native';
import styles from '../../styles';
import GeneralContainer from '../../navigation/GeneralNavigation';

class AppContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired
    };

    state = {
        loading: true,
        isLoggedIn: false
    }

    componentDidMount = async() => {
        const { isLoggedIn } = this.props;
        this.setState({
            isLoggedIn,
            loading: false
        })
    }

    render(){
        if(this.state.loading){
            return (
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ActivityIndicator size='small' color='#000000' />
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}>
                <StatusBar hidden={false} />
                    <SafeAreaView style={styles.container}>
                        <GeneralContainer />
                    </SafeAreaView>
                </View>)
        }

    }
};

export default AppContainer;