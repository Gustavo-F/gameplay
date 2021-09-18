import React from "react";
import { View, Text, Image } from "react-native";

import { ButtonICon } from "../../components/ButtonIcon";
import IllustrationImg from '../../assets/illustration.png'; 
import { styles } from './styles';
 
export function SignIn() {
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

                <ButtonICon title='Entrar com Discord'  activeOpacity={.65} />
            </View>
        </View>
    );
}