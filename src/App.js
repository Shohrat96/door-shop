import React from 'react';
import styles from './App.module.scss';
import CustomLayout from './containers/CustomLayout';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <CustomLayout/>
      </div>
    </Provider>
  );
}

export default App;
