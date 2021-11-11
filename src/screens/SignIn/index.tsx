import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";

import { styles } from './styles';
import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";
import { ButtonICon } from "../../components/ButtonIcon";
import IllustrationImg from '../../assets/illustration.png'; 


export function SignIn() {
    const { user, loading, signIn } = useAuth();

    async function handleSignIn() {
        try {
            await signIn();
        } catch (error) {
            Alert.alert(error);
        }
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

                {
                    loading ? <ActivityIndicator color={theme.colors.primary} /> :
                    <ButtonICon 
                        title='Entrar com Discord'
                        onPress={handleSignIn} 
                    />
                }
            </View>
        </View>
    );
}