import React , { useState , useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import axios from 'axios';
import PanelContent from './components/PanelContent';
import MapContainer from './components/MapContainer';
import "./App.css"

function App() {
  const Body = styled.div`
    height: 100vh;
    width: 100vw;
    background: #040710;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  `
  const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    gap: 1rem;
    padding: 1.5rem;
  `
  
  
  const Panel = styled.div`
    display: flex;
    width: 25%;
    height: 100%;
    border-radius : 2rem;
  `
  
  const [user,setUser] = useState(null);
  const [departements, setDepartements] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
  
  
  console.log(user);
  
  function togglePanel()
  {
    if(openPanel)
    {
      setOpenPanel(false);
    } else {
      setOpenPanel(true);
    }
  }
  
  async function getMe() 
  {
    const response = await axios.get('http://localhost:4000/user/me', 
    {
      withCredentials : true
    });
    setUser(response.data);
  }
  
  async function getDepartements()
  {
    const response = await axios.get('http://localhost:4000/departements', 
    {
      withCredentials : true
    });
    setDepartements(response.data);
  }
  
  useEffect(() => {
    getMe();
    getDepartements();
  }, []);
  
  return (
  
    <Body>
      <Header user={user} getMe={getMe} togglePanel={togglePanel}/>
      <Content>
        <MapContainer/>
        {openPanel ? (
          <Panel>
            <PanelContent user={user}  togglePanel={togglePanel} setUser={setUser} departements={departements}/>
          </Panel>
          ) : undefined
        }
        
      </Content>
    </Body>
  )
}

export default App;
