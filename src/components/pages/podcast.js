import React, { useState } from "react";
import { Box, Paper, Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import ReactAudioPlayer from "react-audio-player";

function Podcast({ treesNames, whatIsSelected, setIsSelected }) {
  const items = [
    {
      image:
        "https://i.pinimg.com/564x/9a/ca/d8/9acad80ccc4344a2fa5e489ad62661e1.jpg",
    },
    {
      image:
        "https://i.pinimg.com/originals/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg",
    },
    {
      image:
        "https://vignette.wikia.nocookie.net/runescape2/images/5/56/Frog_%28NPC%29.png/revision/latest/scale-to-width-down/340?cb=20160531202106",
    },
  ];

  const legends = [
    {
      time: 3,
      legend: "Tem um audio random tocando",
    },
    { time: 5, legend: "n vou escrever legenda rpa ele" },
    { time: 7, legend: "sim eu escrevi errado o rpa, era pra" },
    { time: 9, legend: "acabou, agora vai ficar uma frase lorem ate o fim" },
    { time: 11, legend: "Lorem Ipsum is simply, É NADA VEI" },
  ];

  const [audioElement, setAudioElement] = useState(null);
  const [legendToShow, setLegendToShow] = useState("");

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={2}>
        <Carousel animation="sldie" navButtonsAlwaysVisible={true}>
          {items.map((item, key) => (
            <Paper key={key}>
              <Box
                width={320}
                height={480}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: window.innerHeight / 2,
                  }}
                  src={item.image}
                  alt="random image"
                />
              </Box>
            </Paper>
          ))}
        </Carousel>
      </Box>
      <Box>
        <ReactAudioPlayer
          style={{ outline: "none" }}
          ref={(audioElement) => setAudioElement(audioElement)}
          listenInterval={1000}
          onListen={(time) => {
            for (const legendObject of legends) {
              if (time < legendObject.time) {
                setLegendToShow(legendObject.legend);
                break;
              }
            }
            if (time > 70) {
              setLegendToShow(
                "Eu n faço a menor ideia doq ta tocano, vc chegou até aqui, fala ae"
              );
            }
          }}
          onPlay={() => {
            console.log("Starto");
          }}
          src="https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"
          controls
        />
      </Box>
      <Box>{legendToShow}</Box>
      <Button
        onClick={() => setIsSelected(false)}
        variant="outlined"
        color="primary"
      >
        Back to map
      </Button>
    </Box>
  );
}

export default Podcast;
