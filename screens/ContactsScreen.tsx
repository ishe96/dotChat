import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';

import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';

export default function ChatScreen() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async ()=>{
      try{
        const userData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        console.log(userData);
        setUsers(userData.data.listUsers.items);
      }catch (e){
        console.log(e);
      }
    }

    fetchUser();
  },[])

  return (
    <View style={styles.container}>
      <FlatList 
        style={{width:"100%"}}
        data={users} 
        renderItem={({item}) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
