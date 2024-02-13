import React , { useState } from 'react';
import styled from 'styled-components';
import SpaceGrotesk from '../fonts/SpaceGrotesk.ttf';
import axios from 'axios';
import Select from 'react-select';

function PanelContent(props)
{
    const { user , togglePanel , setUser , departements } = props;
    const [ selectedDepartement, setSelectedDepartement ] = useState(user.position);
    
    const options = departements.map(item =>
    (
        { value : item.id, label: item.num_dep + ' - ' + item.name }   
    ))
    
    console.log(options);
    
    const Box = styled.div `
        font-family: 'SpaceGrotesk', sans-serif;
        background-color: #0F162A;
        width: 100%;
        height: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;
        border-radius: 2rem;
        @font-face {
            font-family: 'SpaceGrotesk';
            src: url(${SpaceGrotesk});
    }`
    
    const Header = styled.div `
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `
    
    const CloseIcon = styled.img `
        height: 1.5rem;
        width: 1.5rem;
    `
    
    const Footer = styled.div`
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    
    const DeconnexionButton = styled.div`
        height: 1.5rem;
        justify-content: center;
        text-align: center;
        background-color: #cfcfd0;
        color: #0d111d;
        padding: 1rem;
        border-radius: 1rem;
        cursor : pointer;
    `
    
    const PersonnalContent = styled.div`
        flex-grow: 1;
        flex-direction: column;
        display: flex;
        width: 100%;
        color: #cfcfd0;
        align-items: center;
        justify-content: center;
        font-size: large;
        `
    
    const LocalisationContent = styled.div`
        display: flex;
        flex-grow: 1;
        width: 100%;
        color: #cfcfd0;
        font-size: x-small;
        align-items: center;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        `
    
    const DiscordJoin = styled.div`
        color: #0d110d;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: large;
        font-weight: bold;
        border-radius: 1rem;
        padding: 0.5rem;
    `
    
    const DiscordLogo = styled.img `
        height: 4rem;   
    `
    
    const SubtitleLog = styled.h2 `
        text-decoration: underline;
        font-size: small;
        cursor: pointer;
    `
    
    const SelectBox = styled.div`
        display: flex;
        width: 100%;
        flex-direction: row;
        gap: 2rem;
        justify-content: center;
    `
    
    const ChangePositionButton = styled.button`
        border-radius: 0.5rem;
    `
    
    let Position;
    
    if (user.position)
    {
        let choseDepartement = options.find(item => item.value === +user.position )
        console.log('chose ' + user.position);
        console.log(choseDepartement);
        
        Position = 'Position choisie : ' + choseDepartement.label;
    } else {
        Position = 'Pas de position selectionnée';
    }
    
    const handleChange = selected => {
        setSelectedDepartement(selected);
    }
    
    const updatePosition = async () =>
    {
        if (selectedDepartement != null)
        {
            await axios.post(`http://localhost:4000/position?id=${user.discordID}&position=${selectedDepartement.value}`);
            let updatedUser = await axios.get('http://localhost:4000/user/me', 
            {
              withCredentials : true
            });
            console.log('POSITION UPDATE');
            console.log(updatedUser.data);
            setUser(updatedUser.data);
        }
    }
    
    return (
        <Box>
            <Header>
                <CloseIcon src='/CloseIcon.png' onClick={() => togglePanel()}/>
            </Header>
            <LocalisationContent>
            {
                user.isOnServer ? (
                    <PersonnalContent>
                        <h1>Votre localisation</h1>
                            <SelectBox>
                                <Select value={selectedDepartement} options={options} onChange={handleChange}/>
                                <ChangePositionButton onClick={() => updatePosition()}>Valider</ChangePositionButton>
                            </SelectBox>
                        <h3>{Position}</h3>
                    </PersonnalContent>
                    
                ) : (
                    <>
                        <h1>Merci de rejoindre le serveur des Ultras Solary pour participer</h1>
                        <a href="https://discord.com/invite/qgwJsnRqyZ" target='blank'>
                            <DiscordJoin>
                                <DiscordLogo src='/discordLogo.svg' />
                            </DiscordJoin>
                        </a>
                        <SubtitleLog onClick={async () => 
                        {
                            let UpdatedUser = await axios.get(`http://localhost:4000/auth/discord/update?id=${user.discordID}`, {
                                withCredentials : true
                            })
                            console.log(UpdatedUser.data);
                            setUser(UpdatedUser.data);
                            console.log(user);
                        }}>Je suis déjà sur le serveur !</SubtitleLog>
                    </>
                )
            }
            </LocalisationContent>
            <Footer>
                <DeconnexionButton onClick={async () => 
                    {
                
                    setUser(null);
                    togglePanel();
                    await axios.get('http://localhost:4000/user/deconnexion', {
                        withCredentials : true
                      });
                    }}>
                    Deconnexion
                </DeconnexionButton>
            </Footer>
        </Box>
    )
}

export default PanelContent;