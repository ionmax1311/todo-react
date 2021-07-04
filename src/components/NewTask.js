import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		paddingBottom: 20,
	},
	NewTask: {
		padding: "0 20px",
		border: "1px solid #ccc",
		borderRadius: 8,
		justifyContent: "space-between",
		flexWrap: "nowrap",
	},
	box: {
		height: "100%",
		paddingLeft: 20,
	},
}));

const NewTask = ({ ...props }) => {
	const classes = useStyles();
	const [task, setTask] = useState("");

	const handleSubmit = () => {
		if (task) {
			props.addTask(task);
		}
		setTask("");
	};

	return (
		// <form>
		// 	<input
		// 		required
		// 		id='newTask'
		// 		autoFocus
		// 		value={task}
		// 		onChange={(e) => setTask(e.target.value)}
		// 		placeholder='enter new task'
		// 	/>

		// 	<button
		// 		className='btn waves-effect waves-light'
		// 		id='but'
		// 		disabled={!task.length}
		// 		onClick={handleSubmit}
		// 		type='button'>
		// 		Send
		// 		<i className='material-icons right'>send</i>
		// 	</button>
		// </form>

		<Paper square className={classes.paper}>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					// spacing={0}
					// direction='row'
					className={classes.NewTask}>
					<Grid xs={8}>
						<TextField
							margin='normal'
							name='newTask'
							required
							fullWidth
							id='newTask'
							label='newTask'
							autoFocus
							value={task}
							onChange={(e) => setTask(e.target.value)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Box
							display='flex'
							alignItems='center'
							className={classes.box}>
							<Button
								variant='contained'
								color='primary'
								endIcon={<Icon>send</Icon>}
								fullWidth
								disabled={!task.length}
								onClick={handleSubmit}>
								Send
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
};

export default NewTask;
