import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

import {
    Auth,
    graphqlOperation,
    API
} from 'aws-amplify';

import {createMessage} from '../../src/graphql/mutations';

import { 
    FontAwesome5, 
    MaterialCommunityIcons,
    Entypo,
    Fontisto,
    MaterialIcons
} from '@expo/vector-icons';


const InputBox = (props) => {

    const {chatRoomID} = props;

    const [message, setMessage] = useState('');
    const [myUserId, setMyUserID] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserID(userInfo.attributes.sub);
        } 
        fetchUser();
    }, [])

    const onMicroPhonePress = () => {
        console.warn('Microphone')
    }

    const onSendPress = async () => {
        //Sending message via Backend

        try {
            await API.graphql(
                graphqlOperation(
                    createMessage, {
                        input: {
                            content: message,
                            userID: myUserId,
                            chatRoomID
                        }
                    }
                )
            )
        } catch (e) {
            console.log(e);
        }

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