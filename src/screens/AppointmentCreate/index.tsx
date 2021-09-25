import React, { useState } from "react";
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";

import { Header } from "../../components/Header";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { CategorySelect } from "../../components/CategorySelect";

import { styles } from './styles'
import { theme } from "../../global/styles/theme";

export function AppointmentCreate() {
    const [category, setCategory] = useState('')

    return(
        <View style={styles.container}>
            <Header title='Agendar Partida'/>
            <Text style={
                [styles.label, 
                { marginLeft: 24, marginTop: 36, marginBottom: 18}]}
            >
                Categoria
            </Text>

            <CategorySelect 
                hasCheckBox
                setCategory={setCategory}
                categorySelected={category}
            />

            <View style={styles.form}>
                <RectButton>
                    <View style={styles.select}>
                        {
                            // <View style={styles.image}/>
                            <GuildIcon />
                        }

                        <View style={styles.selectBody}>
                            <Text style={styles.label}>Selecione um servidor</Text>
                        </View>

                        <Feather 
                            name='chevron-right' 
                            color={theme.colors.heading}
                            size={18}    
                        />
                    </View>
                </RectButton>
  
                <View style={styles.field}>
                    <View>
                        <Text style={styles.label}>Dia e Mês</Text>

                        <View style={styles.column}>
                            <SmallInput maxLength={2}/>
                            <Text style={styles.divider}>
                                /
                            </Text>
                            <SmallInput maxLength={2}/>
                        </View>                            
                    </View>

                    <View>
                        <Text style={styles.label}>Hora e minuto</Text>

                        <View style={styles.column}>
                            <SmallInput maxLength={2}/>
                            <Text style={styles.divider}>
                                :
                            </Text>
                            <SmallInput maxLength={2}/>
                        </View>                            
                    </View>
                </View>
            </View>
        </View>
    );
}