import React from 'react';
import { ClickProvider } from './context/ClickContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
    return (
        <ClickProvider>
            <AppNavigator />
        </ClickProvider>
    );
};

export default App;
