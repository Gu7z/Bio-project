import React, { useState, useEffect } from "react";
import { Map as LeafletMap, Popup, TileLayer } from "react-leaflet";
import Marker from "react-leaflet-enhanced-marker";
import Icon from '@mdi/react'
import { mdiTree, mdiHelp } from '@mdi/js';
import Box from "@material-ui/core/Box";
import Podcast from "../pages/podcast";

const Map = ({ trees }) => {
  const center = [-19.0006, -57.6301542];
  const [markers, setMarkers] = useState([]);
  const [treesNames, setTreesNames] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [whatIsSelected, setWhatIsSelected] = useState();

  useEffect(() => {
    if (trees.length) {
      const newMarkers = [];
      const newNames = [];

      //trees = trees.filter((tree) => tree.nome_popular !== "id");

      trees = trees.sort(function (a, b) {
        return b.coord.lat - a.coord.lat;
      });

      for (const tree of trees) {
        const { coord } = tree;
        const newX = Number(coord.lat.toFixed(10));
        const newY = Number(coord.long.toFixed(10));
        const newCoord = [newX, newY];

        if (!JSON.stringify(newMarkers).includes(JSON.stringify(newCoord))) {
          newMarkers.push(newCoord);
          newNames.push(tree.nome_popular);
        }
      }

      setMarkers(newMarkers);
      setTreesNames(newNames);
    }
  }, [trees]);

  return (
    <>
      {!isSelected ? (
        <LeafletMap
          style={{ width: "100%", height: "100%" }}
          center={center}
          bounceAtZoomLimits={true}
          zoom={20}
        >
          <TileLayer
            maxNativeZoom={19}
            maxZoom={20}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {markers.length &&
            markers.map((markerPosition, key) => (
              <Marker
                icon={                  
                  <Box textAlign="center">
                    {treesNames[key]=='id' ? (
                      <Icon path={mdiHelp} size={1.5} color="#42692f" />
                    ) : (
                      <Icon path={mdiTree} size={1.5} color="#42692f"/>
                    )}
                  </Box> 
                }
                key={key}
                position={markerPosition}                
                onClick={() => {
                  setWhatIsSelected(treesNames[key]);
                  setIsSelected(true);
                }}
              >
                <Popup>{treesNames[key]}</Popup>
              </Marker>
            ))}
        </LeafletMap>
      ) : (
        <Podcast
          setIsSelected={setIsSelected}
          treesNames={treesNames}
          whatIsSelected={whatIsSelected}
        />
      )}
    </>
  );
};

export default Map;
