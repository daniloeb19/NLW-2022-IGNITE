import { ImageBackground } from 'react-native';

import backgroundImg from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface Props {
    children: React.ReactNode
}

export function Background({ children }: Props) {
    return (
        <ImageBackground style={styles.container}
            source={backgroundImg}
            defaultSource={backgroundImg}
        >
            {children}
        </ImageBackground>
    );
}