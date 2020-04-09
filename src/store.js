import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'


Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name, columnName }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
        column: columnName,
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value
    },
    UPDATE_COLUMN(state, { column, key, value }) {
      column[key] = value
      const tasks = column.tasks
      const newName = column[key]
      tasks.forEach(task => {
        task.column = newName
      });
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex, toColumnIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)


      //To Ensure Correct Renaming of Column in Task
      if (toColumnIndex !== undefined) {
        const nameOfColumn = board.columns[toColumnIndex].name
        state.board.columns[toColumnIndex].tasks[0].column = nameOfColumn
      } else {
        const otherTaskPosition = toTaskIndex + 1
        const columnNameFix = toTasks[otherTaskPosition].column
        taskToMove.column = columnNameFix
      }

    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex, }) {
      const columnList = state.board.columns
      const columnToMove = state.board.columns.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)

    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        id: uuid(),
        tasks: []
      })
    },
    CREATE_COLUMN_FROM_DROP(state, { fromColumnIndex, fromTaskIndex, taskName, taskDescription, taskId }) {
      state.board.columns.push({
        name: 'untitled',
        tasks: [{
          name: taskName,
          id: taskId,
          description: taskDescription,
          column: 'untitled',
        }]
      })
      const columnList = state.board.columns[fromColumnIndex].tasks
      columnList.splice(fromTaskIndex, 1)
    },
    DELETE_TASK(state, { task, taskIndex }) {
      task.splice(taskIndex, 1)
    },
    DELETE_COLUMN(state, { column, columnIndex }) {
      column.splice(columnIndex, 1)
    },
    CHANGE_IMAGE(state, { board, newImgFull, oldImgTN, imgIndex }) {
      board.backgroundImgs.splice(imgIndex, 1, oldImgTN)
      board.backgroundImg = newImgFull
    },


  }
})