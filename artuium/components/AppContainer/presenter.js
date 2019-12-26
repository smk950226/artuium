import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, ActivityIndicator, Animated } from 'react-native';
import styles from '../../styles';
import GeneralContainer from '../../navigation/GeneralNavigation';
import LoggedOutContainer from '../../navigation/LoggedOutNavigation';

class AppContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        initApp: PropTypes.func.isRequired
    };

    state = {
        loading: true,
        scrollY: new Animated.Value(0),
        fetchedProfile: false,
        fetchClear: false
    }

    componentDidMount = async() => {
        const { isLoggedIn, initApp } = this.props;
        if(isLoggedIn){
            await initApp()
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
            let update = {}
            if((nextProps.profile)){
                update.fetchedProfile = true
            }
            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true
            })
        }
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
                    <View style={styles.container}>
                        {this.props.isLoggedIn ? (
                            <GeneralContainer
                                screenProps={{
                                    scrollY: this.state.scrollY,
                                }}
                            />
                        ) : (
                            <LoggedOutContainer />
                        )}
                    </View>
                </View>)
        }

    }
};

export default AppContainer;