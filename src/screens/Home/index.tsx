import { FlatList, View } from "react-native";
import React, { useState, useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Load } from "../../components/Load";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from '../../components/Profile/index'
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { CategorySelect } from "../../components/CategorySelect";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Appointment, AppointmentProps } from "../../components/Appointment";

import { styles } from "./styles";
import { Background } from "../../components/Background";

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const navigation = useNavigation<StackNavigationProp<any, any>>();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected})
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }

        setLoading(false);
    } 

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));    

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>
            
            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {
                loading ? <Load /> : 
                <>
                    <ListHeader 
                        title='Partidas Agendadas' 
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment 
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        contentContainerStyle={{paddingBottom: 69}}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        </Background>
    );
}