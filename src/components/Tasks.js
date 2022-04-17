import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
	btnGroup: {
		display: "flex",
	},
}));

const Task = ({ task, ...props }) => {
	const classes = useStyles();
	const ActionButton = () => (
		<div>
			{task.done ? (
				<Tooltip title='Done'>
					<IconButton aria-label='active'>
						<CheckBoxIcon onClick={props.doneTask} />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='not Done'>
					<IconButton aria-label='active'>
						<CheckBoxOutlineBlankIcon onClick={props.doneTask} />
					</IconButton>
				</Tooltip>
			)}
		</div>
	);

	const DeleteButton = () => (
		<div>
			<Tooltip title='Delete'>
				<IconButton aria-label='delete' onClick={props.deleteTask}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</div>
	);

	const EditButton = () => (
		<div>
			<Tooltip title='Edit'>
				<IconButton aria-label='edit' onClick={props.editTask}>
					<EditIcon />
				</IconButton>
			</Tooltip>
		</div>
	);

	return (
		<ListItem button className={classes.listItem}>
			<ListItemText secondary={task.title} />

			<div className={classes.btnGroup}>
				<DeleteButton />
				<EditButton />
				<ActionButton />
			</div>
		</ListItem>
	);
};

export default Task;
