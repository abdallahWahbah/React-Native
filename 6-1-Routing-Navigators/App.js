import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons} from "@expo/vector-icons";

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';



export default function App() {
  
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const DrawerNavigator = () =>
  {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: "#351401"},
          headerTintColor: "white",
          sceneContainerStyle: {backgroundColor: "#3f2f25"}, // background of the page for Drawer Navigator
          drawerContentStyle: {backgroundColor: "#351401"}, // the background of the drawer
          drawerInactiveTintColor: "white",
          drawerActiveTintColor: "#351401",
          drawerActiveBackgroundColor: "#e4baa1"
        }}
      >
        <Drawer.Screen 
          name='Categories' 
          component={CategoriesScreen}
          options= {{
            title: "All Categories",
            drawerIcon: ({size, color}) => (
              <Ionicons name="list" size={size} color={color}/>
            )
          }}
        />
        <Drawer.Screen 
          name='Favorites' 
          component={FavoritesScreen}
          options= {{
            title: "Favorites",
            drawerIcon: ({size, color}) => (
              <Ionicons name="star" size={size} color={color}/>
            )
          }}  
        />
      </Drawer.Navigator>
    )
  }

  return (
  
    <>
      <StatusBar style="light"/>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ // default screen options that will be applied to all screens in the navigator
            headerStyle: {backgroundColor: "#351401"},
            headerTintColor: "white", // color of the (title, back button and back button text)
            contentStyle: {backgroundColor: "#3f2f25"} // background for the page not the header
          }}
        >
          <Stack.Screen 
            name="Drawer" 
            component={DrawerNavigator}
            options={{
              // title: "All Categories", // header title
              headerShown: false, // if we are in the DrawerNavigator Screensss (Categories of Favorite), hide the Stack header
            }}  
          />
          <Stack.Screen 
            name="MealsOverview" 
            component={MealsOverviewScreen}
            // options={({route, navigation}) => { // dynamic header naming
            //   const catId = route.params.categoryId
            //   return { // return the same options object just like the screen above 
            //     title: catId
            //   }
            // }}
            // there is another easy way in the MealsOverviewScreen component
          />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              // // headerRight={AnyComponent} or left
              // headerRight: () => {
              //   return (<Text>In the header</Text>)
              // },
              title: "About the Meal"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
