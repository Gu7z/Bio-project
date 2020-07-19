import React, { useState, useEffect } from "react";
import { Map as LeafletMap, Popup, TileLayer } from "react-leaflet";
import Marker from "react-leaflet-enhanced-marker";
import Nature from "@material-ui/icons/Nature";
import Box from "@material-ui/core/Box";
import Podcast from "../pages/podcast";

const Map = ({ trees }) => {
  const center = [-19.0006, -57.6301542];
  const [markers, setMarkers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [treesNames, setTreesNames] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [whatIsSelected, setWhatIsSelected] = useState();

  useEffect(() => {
    if (trees.length) {
      const newMarkers = [];
      const newNames = [];
      const newRoutes = [];

      trees = trees.filter((tree) => tree.nome_popular !== "id");

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
      setRoutes(newRoutes);
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
                    <Nature style={{ fill: "green", fontSize: 40 }} />
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
          {routes.length &&
            routes.map((route, key) => <Marker key={key} position={route} />)}
        </LeafletMap>
      ) : (
        <Podcast treesNames={treesNames} whatIsSelected={whatIsSelected} />
      )}
    </>
  );
};

export default Map;
