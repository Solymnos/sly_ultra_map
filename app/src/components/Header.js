import React from 'react';
import styled from 'styled-components';
import SpaceGrotesk from '../fonts/SpaceGrotesk.ttf';

function Header(props)
{
    const { user, togglePanel } = props;

    const Box = styled.div `
        font-family: 'SpaceGrotesk', sans-serif;
        width: 100%;
        height: 7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        background-color: #0F162A;
        border-radius: 2rem;
        @font-face {
            font-family: 'SpaceGrotesk';
            src: url(${SpaceGrotesk});
    }`
    
    const TitleBox = styled.div`
        
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
        gap: 2rem;
        
       
    `
    const Title = styled.h1`
        font-size : 3rem;
        color: white;
    `
    
    const Logo = styled.img `
        height: 4rem;
        width: 4rem;
        margin-left: 1.5em;
    `
    const LogginLink = styled.a`
        color: inherit; 
        text-decoration: none;
    `
    
    const DiscordConnexion = styled.div`
        padding: 1rem;
        border-radius: 1rem;
        color: #040710;
        cursor: pointer;
        margin-right: 1.5rem;
        background-color: white;
        font-weight: bold;
    `
    
    const LoggedInfos = styled.div`
        align-items: center;
        gap: 1rem;
        display: flex;
        flex-direction: row;
        margin-right: 1.5rem;
    `
    
    const LoggedName = styled.h2 `
        font-size : 1.5;
        color: white;
    `
    
    const LoggedLogo = styled.img `
        height: 4rem;
        width: 4rem;
        border-radius: 100%;
    `
    let avatar;
    
    if (user)
    {
        avatar = `https://cdn.discordapp.com/avatars/${user.discordID}/${user.discordPP}.png`
    }
    
    
    
    return (
        <Box>
            <TitleBox>
                <Logo src='/logo_r212.jpg'/>
                <Title>Solary Ultras Map</Title>
            </TitleBox>
            { user ? 
            (   
                <LoggedInfos>
                    <LoggedName>{user.name}</LoggedName>
                    <LoggedLogo src={avatar} onClick={() => togglePanel()}/>
                </LoggedInfos>
            ) : (
                <LogginLink href='http://localhost:4000/auth/discord/login'>
                    <DiscordConnexion>
                        Connexion
                    </DiscordConnexion>
                </LogginLink>
            )}
        </Box>
    )
}

export default Header;