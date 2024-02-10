import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import AllExpensesScreen from './screens/AllExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview()
{
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: "white",
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton 
            name="add" 
            size={24} 
            color={tintColor} 
            onPress={() => {navigation.navigate("ManageExpense", {})}}
          />
        )
      }}
    >
      <BottomTab.Screen 
        name="RecentExpenses" 
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({color, size}) => <Ionicons name="hourglass" color={color} size={size}/>
        }}
      />
      <BottomTab.Screen 
        name="AllExpenses" 
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({color, size}) => <Ionicons name="calendar" color={color} size={size}/>
        }}
      />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: "white",
            }}
          >
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview}
              options={{
                headerShown: false, // if we are in AllExpensesScreen or RecentExpensesScreen(BottomTapNavigator), hide the Stack header(ExpensesOverview)
              }}  
            />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpenseScreen}
              options={{
                // presentation: "modal" // how the screen will be reloaded
              }}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
