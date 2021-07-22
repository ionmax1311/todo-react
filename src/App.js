import React, { useState } from "react";
import Task from "./components/Tasks";
import NewTask from "./components/NewTask";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Badge from "@material-ui/core/Badge";

import { v4 as uuid_v4 } from "uuid";

import store from "./store";
import { observer } from "mobx-react";

// const defaultState = [
//   { id: 0, title: "React", done: false },
//   { id: 1, title: "Vue", done: true },
//   { id: 2, title: "Angular", done: false },
// ];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      // paddingBottom: 50,
      // paddingTop: 15,
      height: "auto",
    },
    header: {
      height: "70px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
      background: "#90a4ae",
    },
    badge: {
      marginLeft: "20px",
    },
  })
);

function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState(store.defaultState);
  const activeTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);
  const [openModal, setOpenModal] = React.useState(false);
  let [editCurTask, setEditCurTask] = useState("");
  let [curId, setCurId] = useState();

  const doneTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { id, title: task.title, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (title, id) => {
    setOpenModal(true);
    setEditCurTask(title);

    setCurId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeEditTask = (e) => {
    setEditCurTask(e.target.value);
  };

  const sendEditTask = (id) => {
    // setEditCurTask(editCurTask);
    console.log("editCurTask", editCurTask);
    console.log("id-123", curId);

    setTasks(
      tasks.map((task) =>
        task.id === curId ? { id, title: editCurTask, done: task.done } : task
      )
    );
    console.log("tasks-new", tasks);
    setOpenModal(false);
  };

  const addTask = (task, id) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length,
        title: task,
        done: false,
      },
    ]);
    console.log("addTask--task", task);
    console.log("addTask--tasks", tasks);
  };

  return (
    <Container maxWidth="sm">
      <Paper square className={classes.paper}>
        <Paper className={classes.header}>
          {console.log("store", store.defaultState)}
          {console.log("uuid_v4()", uuid_v4())}
          Active Tasks:
          <Badge
            badgeContent={activeTasks.length}
            color="primary"
            className={classes.badge}
          ></Badge>
        </Paper>
        <div>
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="edit message"
                type="text"
                fullWidth
                defaultValue={editCurTask}
                onChange={handleChangeEditTask}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  sendEditTask();
                }}
                color="primary"
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <List className={classes.list}>
          {tasks.map((task) => (
            <Task
              editTask={() => editTask(task.title, task.id)}
              doneTask={() => doneTask(task.id)}
              deleteTask={() => deleteTask(task.id)}
              task={task}
              key={uuid_v4()}
            ></Task>
          ))}
        </List>
      </Paper>
      <NewTask addTask={addTask}></NewTask>
    </Container>
  );
}

export default observer(App);
