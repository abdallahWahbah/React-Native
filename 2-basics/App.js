import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        {/* <Text style={{margin: 16, borderWidth: 2, borderColor: "red", padding: 16}}>Hello world!</Text> */}
        <Button 
          title="Add new goal" 
          color="#a065ec"
          onPress={() =>{setModalIsVisible(true)}}
        />

        <GoalInput 
          visible={modalIsVisible} 
          setCourseGoals={setCourseGoals}
          setModalIsVisible={setModalIsVisible}  
        />

        <View style={styles.goalsContainer}>
          {/* related to ScrollView */}
          {/** alwaysBounceVertical: when you have items less than the height of the screen, don't scroll making bounce */}
          
          
          {/* <ScrollView alwaysBounceVertical={false}> 
            {courseGoals.map((goal, index) =>(
              <View style={styles.goalItem}>
                <Text 
                  key={index}
                  style={styles.goalText}
                  >
                    {goal}
                </Text>
              </View>
            ))}
          </ScrollView> */}


            {/* // flatList is better than scrollView 
              - scrollView renders all the items even if they are not visible on the screen (99th item of 1000)
              - flatList: all the items that are off the screen will only be loaded and rendered lazily as they are needed when the user scrolls 
            */}


          <FlatList 
            data={courseGoals} 
            renderItem={itemData => {
              return <GoalItem 
                        itemData={itemData} 
                        setCourseGoals={setCourseGoals}
                        courseGoals={courseGoals}
                        index={itemData.item.id}
                      />
            }}
            // another way of adding key (this time is manually) >>> used if the item data doesn't have key property
            keyExtractor={(item, index) => {return item.id} }
          />
          
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // so that the container takes the whole width and height
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
