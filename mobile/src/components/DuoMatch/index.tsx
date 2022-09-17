import { View, Modal, ModalProps, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native'
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard'
import { useState } from 'react';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...res }: Props) {
    const [isCopping, setIsCopping] = useState(false);
    async function handleCopyDiscordToClipboard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord Copiado!', 'Usuário copiado para área de transferência.')
        setIsCopping(false)
    }

    return (

        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...res}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />
                    <Heading title="Let's play"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: 'center', marginTop: 24 }} />
                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>
                    <TouchableOpacity
                        onPress={handleCopyDiscordToClipboard}
                        style={styles.discordButton}
                        disabled={isCopping}

                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}