import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles';
import { useAuth } from "../../hooks/auth";
import { ButtonICon } from "../../components/ButtonIcon";
import IllustrationImg from '../../assets/illustration.png'; 


export function SignIn() {
    const navigation = useNavigation();
    const { user } = useAuth();

    function handleSignIn() {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>            
            <Image 
                source={ IllustrationImg } 
                style={styles.image} 
                resizeMode='contain'
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Conecte-se {'\n'} 
                    e organize suas
                    jogatinas {'\n'} 
                </Text>
                
                <Text style={styles.subtitle}>
                    Crie grupos para jogar seus games {'\n'}
                    favoritos com seus amigos
                </Text>

                <ButtonICon 
                    title='Entrar com Discord'
                    onPress={handleSignIn} 
                />
            </View>
        </View>
    );
}