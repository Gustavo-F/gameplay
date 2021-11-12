import React from "react";
import { Fontisto } from '@expo/vector-icons'
import { useRoute } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { View, ImageBackground, Text, FlatList } from 'react-native'

import { Header } from "../../components/Header";
import { Member } from "../../components/Member";
import { ListHeader } from "../../components/ListHeader";
import { ButtonICon } from "../../components/ButtonIcon";
import { ListDivider } from "../../components/ListDivider";
import { AppointmentProps } from "../../components/Appointment";

import { styles } from './styles'
import BannerImg from '../../assets/banner.png'
import { theme } from "../../global/styles/theme";
import { api } from "../../services/api";

type Params = {
    guildSelected: AppointmentProps;
}

export function AppointmentDetails() {
    const route = useRoute();
    const { guildSelected } = route.params as Params;

    async function fetchGuildInfo() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
        } catch (error) {
            
        }
    }

    const members = [
        {
            id: '1',
            username: 'Gustavo',
            avatar_url: 'https://github.com/Gustavo-F.png',
            status: 'online',
        },
        {
            id: '2',
            username: 'Gustavo',
            avatar_url: 'https://github.com/Gustavo-F.png',
            status: 'offline',
        }
    ]

    return(
        <View style={styles.container}>
            <Header 
                title='Detalhes' 
                action={
                    <BorderlessButton>
                        <Fontisto name='share' size={24} color={theme.colors.primary} />
                    </BorderlessButton>
                } 
            />

            <ImageBackground 
                source={BannerImg} 
                style={styles.banner} 
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        { guildSelected.guild.name }
                    </Text>

                    <Text style={styles.subtitle}>
                        { guildSelected.description }
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader 
                title='Jogadores'
                subtitle='Total 3'
            />

            <FlatList 
                data={members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => ( <Member data={item}/> )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                style={styles.members}
            />

            <View style={styles.footer}>
                <ButtonICon title='Entrar na partida'/>
            </View>
        </View>
    );
}