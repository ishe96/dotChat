import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// AWS
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
import {withAuthenticator} from 'aws-amplify-react-native'

// graphQL
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';
Amplify.configure(config)

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-4.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg'
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () =>{
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  // run snippet when only when App is first mounted

  useEffect(() => {
    const fetchUser = async() => {
      // get authanticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      
      if(userInfo){
        // get User from backend using UserID from Auth
        const userData = await API.graphql(
          graphqlOperation(
            getUser, 
            /*variables*/
            {id: userInfo.attributes.sub}
          )
        )

        if(userData.data.getUser){
         // console.log("The User is already registered in the dataBase");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey there, I am using .Chat',
        }

        await API.graphql(
          graphqlOperation(
            createUser,
            {input: newUser} //Variables from newUser method
          )
        )
        // if there is no user in DB with ID, then create one
      }
      
    }

    fetchUser();
  }, /**dependencies */[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App)