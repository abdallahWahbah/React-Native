import { StyleSheet, ImageBackground, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar as StatusBarLight } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"), // the key is the name that we will use to call this font, the value is the path to the font 
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  })

  if(!fontsLoaded) return <AppLoading />

  const pickedNumberHandler = (pickedNumber) =>
  {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  const gameOverHandler = (numberOfRounds) => 
  {
    setGameIsOver(true);
    setRoundsNumber(numberOfRounds)
  }

  const startNewGameHandler = () =>
  {
    setUserNumber(null);
    setRoundsNumber(0);
  }
  
  // the course way of rendering screens
  // let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  // if (userNumber) screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  // if (gameIsOver && userNumber) screen = <GameOverScreen />
  
  return (
    <>
      <StatusBarLight style="dark"/> 
      {/**light-dark */}
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/images/background.png")}
          style={styles.rootScreen}
          imageStyle={styles.imageBackground} // cause the image made the linear gradient hidden
        >
          <SafeAreaView style={styles.safeAreaView}>
            {!userNumber && <StartGameScreen onPickNumber={pickedNumberHandler}/>}
            {userNumber && !gameIsOver && <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>}
            {gameIsOver && userNumber && (
              <GameOverScreen 
                userNumber={userNumber}
                roundsNumber={roundsNumber}
                onStartNewGame={startNewGameHandler}
              />
            )}

            {/* {screen} */}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // so that it takes the whole height (in normal css: takes the whole width >> but here flexDirection is column by default)
  },
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // I added this from the internet cause it didn't work for android ... import from "react-native"
  },  
  imageBackground: {
    opacity: .15
  }
});
