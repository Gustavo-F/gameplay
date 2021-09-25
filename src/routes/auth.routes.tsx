import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";
import { AppointmentCreate } from "../screens/AppointmentCreate";
import { AppointmentDetails } from "../screens/AppointmentDetail";

import { theme } from "../global/styles/theme";
import { styles } from "../components/Background/styles";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    const {secondary80, secondary100} = theme.colors

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                cardOverlayEnabled: true,
                cardOverlay: () => (
                    <LinearGradient
                        // Background Linear Gradient
                        style={styles.container}
                        colors={[secondary80, secondary100]}
                    />
                ),
                cardStyle: {
                    backgroundColor: 'transparent',
                },
            }}
        >
            <Screen
                name='SignIn'
                component={SignIn}
            />
            <Screen
                name='Home'
                component={Home}
            />

            <Screen 
                name='AppointmentDetails'
                component={AppointmentDetails}
            />

            <Screen 
                name='AppointmentCreate'
                component={AppointmentCreate}
            />
        </Navigator>
    )
}