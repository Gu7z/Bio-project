import React, { useEffect, useState } from "react";
import firebase from "firebase";
import getDataFromDataBase from "./utils/firebase";
import RenderedMap from "./components/map";
import WelcomePage from "./components/pages/welcome";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

function App() {
	const [database, setDataBase] = useState(firebase);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		getDataFromDataBase("arvores", databaseFromFirebase => {
			const newDatabase = [];
			Object.entries(databaseFromFirebase).map(trees => {
				newDatabase.push(trees[1]);
			});
			setDataBase(newDatabase);
			setIsReady(true);
		});
	}, []);

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			{!isReady ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					position="absolute"
					width="100%"
					height={window.innerHeight}
					bgcolor="#d3d3d3"
				>
					<Box
						borderRadius={25}
						display="flex"
						justifyContent="center"
						alignItems="center"
						bgcolor="white"
						flexDirection="column"
						textAlign="center"
						width={250}
						height={150}
					>
						Segura as ponta que o firebase demora pra ******* pra carregar slk
						<Box mt={2} width="84%">
							<LinearProgress />
						</Box>
					</Box>
				</Box>
			) : (
				<WelcomePage />
			)}
		</div>
	);
}

export default App;
