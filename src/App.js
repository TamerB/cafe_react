import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import MenuBuilder from './containers/Menu/MenuBuilder/MenuBuilder';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <MenuBuilder />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
