import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import {Colors} from "./constants/colors"
import Map from './screens/Map';
import { init } from './util/database';
import { Text } from 'react-native';
import PlaceDetails from './screens/PlaceDetails';

export default function App() {
  
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(()=>
  {
    init().then(()=>
    {
      setDbInitialized(true);
    })
    .catch(error => console.log(error))
  }, [])

  // if(!dbInitialized) return <AppLoading />
  if(!dbInitialized) return <Text>asdasasd</Text>

  const Stack = createNativeStackNavigator();
  // const navigation = useNavigation() // not working

  return (
    <>
      <StatusBar style="light"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }}>
          <Stack.Screen 
            name="AllPlaces" 
            component={AllPlaces}
            options={({navigation}) => ({
              title: "Your favorite places",
              headerRight: ({tintColor}) => <IconButton 
                                              iconName="add" 
                                              size={24} 
                                              color={tintColor} 
                                              onPress={() => navigation.navigate("AddPlace")}
                                            />
            })}
          />
          <Stack.Screen 
            name="AddPlace" 
            component={AddPlace}
            options={{
              title: "Add a new place"
            }}  
          />
          <Stack.Screen 
            name="Map"
            component={Map}
          />
          <Stack.Screen 
            name="PlaceDetails"
            component={PlaceDetails}
            options={{title: "Loading Place..."}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}