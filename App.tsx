// Importing necessary modules and components
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import ShoppingCart from './src/screens/ShoppingCart';
import { GlobalProvider } from './src/context/GlobalState';

// Create a Stack Navigator
const Stack = createStackNavigator();

// Defining the main App component
const App: React.FC = () => {
  return (
    // Wrap the entire app with the GlobalProvider to provide global state
    <GlobalProvider>
      {/* Using NavigationContainer for navigation */}
      <NavigationContainer>
        {/* Defining navigation routes with Stack.Navigator */}
        <Stack.Navigator initialRouteName="Home">
          {/* Defining a screen with name "Home" and the Home component */}
          <Stack.Screen name="Home" component={Home} />
          {/* Defining a screen with name "Cart" and the ShoppingCart component */}
          <Stack.Screen name="Cart" component={ShoppingCart} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

// Exporting the App component
export default App;
