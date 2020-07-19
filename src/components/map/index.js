import React, { useState, useEffect } from "react";
import { Map as LeafletMap, Popup, TileLayer } from "react-leaflet";
import Marker from "react-leaflet-enhanced-marker";
import Nature from "@material-ui/icons/Nature";
import Box from "@material-ui/core/Box";

const Map = ({ trees }) => {
  const center = [-19.0006, -57.6301542];
  const [markers, setMarkers] = useState([]);
  const [treesNames, setTreesNames] = useState("");

  const makeRoutes = (xInicial, xFinal, yInicial, yFinal) => {
    const minX = Math.min(xInicial, xFinal) * 10000;
    const maxX = Math.max(xInicial, xFinal) * 10000;

    const minY = Math.min(yInicial, yFinal) * 10000;
    const maxY = Math.max(yInicial, yFinal) * 10000;

    const newArray = [...markers];

    for (let i = minX; i < maxX; i++) {
      let newI = i / 10000;
      newI = Number(newI.toFixed(4));
      newArray.push([newI, yInicial]);
    }

    for (let i = minY; i < maxY; i++) {
      let newI = i / 10000;
      newI = Number(newI.toFixed(4));
      newArray.push([xFinal, newI]);
    }

    setMarkers(newArray);
  };

  useEffect(() => {
    if (trees.length) {
      const newMarkers = [];
      const newNames = [];
      for (const tree of trees) {
        if (
          tree.nome_popular !== "id" &&
          !newNames.includes(tree.nome_popular)
        ) {
          const { coord } = tree;
          const newX = Number(coord.lat.toFixed(4));
          const newY = Number(coord.long.toFixed(4));
          const newCoord = [newX, newY];
          console.log(`setting ${tree.nome_popular} with coord: ${newCoord}`);
          newMarkers.push(newCoord);
          newNames.push(tree.nome_popular);
        }
      }
      setMarkers(newMarkers);
      setTreesNames(newNames);
    }
  }, [trees]);

  useEffect(() => {
    console.log(treesNames);
  }, [treesNames]);

  return (
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
                <Nature style={{ fill: "green", fontSize: 40 }} />
              </Box>
            }
            key={key}
            position={markerPosition}
          >
            <Popup>{treesNames[key]}</Popup>
          </Marker>
        ))}
    </LeafletMap>
  );
};

export default Map;
