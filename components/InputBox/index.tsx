import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

import {Message} from '../../types';

import { 
    FontAwesome5, 
    MaterialCommunityIcons,
    Entypo,
    Fontisto,
    MaterialIcons
} from '@expo/vector-icons';


const InputBox = () => {

    const [message, setMessage] = useState('');

    const onMicroPhonePress = () => {
        console.warn('Microphone')
    }

    const onSendPress = () => {
        console.warn('.dotChat Sent')

        //Sending message via Backend

        setMessage('');
    }
    const onPress = () => {
        if(!message) {
            onMicroPhonePress();
        } else{
            onSendPress();
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color='grey'/>
                <TextInput 
                    placeholder={'.dot a Message ...  '}
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}/>
                <Entypo name="attachment" size={24} color='grey' style={styles.icon}/>
                {!message  
                    && <Fontisto name="camera" size={24} color='grey' style={styles.icon}/>
                }
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message 
                        ? <MaterialCommunityIcons name="microphone" size={28} color={'#fff'}/>
                        : <MaterialIcons name="send" size={28} color={'#fff'}/>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;