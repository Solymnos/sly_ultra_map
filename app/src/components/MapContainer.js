import React, { useEffect } from 'react';
import {createRoot} from 'react-dom/client';
import styled from 'styled-components';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';

import IconClusterLayer from './icon-cluster-layer';

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json'; 

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

function MapContainer(props)
{
  let mapStyle = MAP_STYLE;

    const Box = styled.div`
        position: relative;
        flex-grow: 1;
        height: 100%;
    `
  
  return (
    <Box>
      <DeckGL>
        <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle}/> 
      </DeckGL>
    </Box>
  )
}

export default MapContainer;