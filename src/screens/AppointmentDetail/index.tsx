import * as Linking from 'expo-linking'
import { Fontisto } from '@expo/vector-icons'
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/core';
import { BorderlessButton } from "react-native-gesture-handler";
import { 
    Text, 
    View, 
    Alert,
    Share, 
    FlatList,
    Platform,
    ImageBackground, 
} from 'react-native'

import { Load } from '../../components/Load';
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { ButtonICon } from "../../components/ButtonIcon";
import { ListDivider } from "../../components/ListDivider";
import { Member, MemberProps } from "../../components/Member";
import { AppointmentProps } from "../../components/Appointment";

import { styles } from './styles'
import { api } from "../../services/api";
import BannerImg from '../../assets/banner.png'
import { theme } from "../../global/styles/theme";

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}
 
export function AppointmentDetails() {
    const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
    const [ loading, setLoading ] = useState(true);

    const route = useRoute();
    const navigation = useNavigation();
    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
            setLoading(false);
        } catch {
            Alert.alert('Verifique as configurações do servidor. Será que o widget está habilitado?');
            navigation.goBack();
        }
    }
    
    function handleShareInvitation() {
        const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return(
        <View style={styles.container}>
            <Header 
                title='Detalhes' 
                action={
                    guildSelected.guild.owner && 
                    <BorderlessButton onPress={handleShareInvitation}>
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

            {
                loading ? <Load /> :
                <>
                    <ListHeader 
                        title='Jogadores'
                        subtitle={`Total ${widget.members.length}`}
                    />

                    <FlatList 
                        data={widget.members }
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => ( <Member data={item}/> )}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        style={styles.members}
                    />

                    {
                        guildSelected.guild.owner && 
                        <View style={styles.footer}>
                            <ButtonICon 
                                title='Entrar na partida'
                                onPress={handleOpenGuild}
                            />
                        </View>
                    }
                </>
            }

        </View>
    );
}