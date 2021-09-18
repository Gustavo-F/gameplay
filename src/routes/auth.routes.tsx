import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../components/Background/styles";
import { theme } from "../global/styles/theme";

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
        </Navigator>
    )
}