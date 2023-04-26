import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import RootNavigation from './navigation/RootNavigation';
import { useEffect, useState } from 'react';
import { Auth } from './auth/Auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [load, setLoad] = useState(false);
  const { access_token, email } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
  }, []);

  return (
    <BrowserRouter>
      <Auth>
        <RootNavigation />
      </Auth>
    </BrowserRouter>
  );
}

export default App;
