import moment from 'moment';
import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback
} from 'react-native';
import { User } from '../../types';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

import {API, Auth, graphqlOperation} from 'aws-amplify'
import { 
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations';

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();
    
    const onClick = async() => {
        //Navigate to chat room with the user
        try {
            // create new chatRoom
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: {
                            lastMessageID: "zz270fb96b-0ff2-4b40-a12f-de07b7b9400a"
                        }
                    }
                )
            )

            if(!newChatRoomData.data){
                console.log("Failed to create Chat Room")
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            console.log(newChatRoom);

            // add user to chatRoom
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                          userID: user.id,
                          chatRoomID: newChatRoom.id,
                        }
                    }
                )
            )

            // add authenticate users to the chatRoom
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                          userID: userInfo.attributes.sub,
                          chatRoomID: newChatRoom.id,  
                        }
                    }
                )
            )

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: user.name,
            })

        } catch (e) {
            console.log(e)
        }
    }

    return(
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} 
                    style={styles.avatar}/>

                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
                </View>
            </View>            
        </View>
        </TouchableWithoutFeedback>
    )
};

export default ContactListItem;