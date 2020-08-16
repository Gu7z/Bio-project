import React, { useState } from "react";
import {
	Box,
	Typography,
	Button,
	Card,
	CardContent,
	CardActions,
	Checkbox
} from "@material-ui/core";

const WelcomePage = () => {
	const options = ["10 - 15", "16 - 20", "21 - 25", "26 - 30", "30 +"];
	const [wichIsSelected, setWichIsSelected] = useState(null);

	return (
		<Box
			width="100%"
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
			<Card
				style={{
					width: "320px",
					height: "480px",
					display: "grid",
					gridTemplateRows: "432px auto"
				}}
			>
				<CardContent
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Typography>Bem vindo</Typography>
					<Typography
						style={{
							marginTop: "32px"
						}}
					>
						Qual a sua escolaridade?
					</Typography>
					<Box display="flex" flexDirection="column" marginTop={2}>
						{options.map((option, index) => {
							return (
								<Box display="flex" alignItems="center">
									<Checkbox
										color="primary"
										checked={wichIsSelected === index}
										onChange={() => {
											setWichIsSelected(index);
										}}
									/>
									<Typography>{option}</Typography>
								</Box>
							);
						})}
					</Box>
				</CardContent>
				<CardActions display="flex" style={{ justifyContent: "center" }}>
					<Button
						color="primary"
						style={{ height: "32px" }}
						variant="contained"
						display="flex"
					>
						Enviar
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default WelcomePage;
