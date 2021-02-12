import React from 'react';
import { Message } from '../../../types';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import styles from './styles';

export type ChatMessagePros={
    message: Message;
}

const ChatMessage = (props: ChatMessagePros) => {
    const { message } = props;

    const isMyMessage= () => {
        //returning and confirming my message(example 'u1') from ChatRooms.ts
        return message.user.id === 'u1';
    }

    return(
        <View style={styles.container}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? '#64afd6' : '#b1d6ea',
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50,
                }    
            ]}>
                {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
            
        </View>
        
    )
}
export default ChatMessage;