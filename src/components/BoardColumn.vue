<template>
  <div
    class="column"
    :board="board"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex, board.columns, board)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <input
      class="column-name"
      :value="column.name"
      type="text"
      @change="updateColumnProp($event, 'name')"
      @keyup.enter="updateColumnProp($event, 'name')"
    />
    <div class="column-x" @click="columnDelete(board.columns, columnIndex)">X</div>
    <div>
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
        :column="column"
        :board="board"
      />
      <input
        type="text"
        class="text-input"
        placeholder="+ Add Task"
        @keyup.enter="createTask($event, column.tasks, columnIndex, column.name)"
      />
    </div>
  </div>
</template>

<script>
import ColumnTask from "./ColumnTask";
export default {
  components: { ColumnTask },
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex, board) {
      const type = e.dataTransfer.getData("type");
      if (type === "task") {
        this.moveTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length,
          toColumnIndex,
          board
        );
      } else {
        this.moveColumn(e, toColumnIndex);
      }
    },
    moveTask(e, toTasks, toTaskIndex, toColumnIndex, board) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      const fromTasks = board.columns[fromColumnIndex].tasks;
      const fromTaskIndex = e.dataTransfer.getData("from-task-index");
      fromTasks.forEach(element => {
        const eachTask = document.getElementById(element.id);
        eachTask.style.display = "inline-block";
      });
      this.$store.commit("MOVE_TASK", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex,
        toColumnIndex
      });
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
    createTask(e, tasks, columnIndex, columnName) {
      if (e.target.value !== "") {
        this.$store.commit("CREATE_TASK", {
          tasks,
          name: e.target.value,
          columnIndex,
          columnName
        });
        e.target.value = "";
      }
    },
    columnDelete(column, columnIndex) {
      this.$store.commit("DELETE_COLUMN", {
        column,
        columnIndex
      });
    },
    updateColumnProp(e, key) {
      this.$store.commit("UPDATE_COLUMN", {
        column: this.column,
        key,
        value: e.target.value
      });
    }
  }
};
</script>
<style scoped>
.column {
  width: 300px;
  margin: 5px;
  background-color: #ebecf0;
  text-align: center;
  border-radius: 3px;
  margin-top: 25px;
}
.column-name {
  font-size: 18px;
  font-weight: bold;
  float: left;
  margin-left: 30px;
  margin-top: 10px;
  background-color: #ebecf0;
  border: none;
  margin-bottom: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
}
.column-name:focus {
  outline: none;
  cursor: text;
  background-color: #ebecf0;
}
.column-name:hover {
  cursor: pointer;
}
.text-input {
  font-size: 16px;
  border: none;
  background-color: #ebecf0;
  width: 77%;
  padding-left: 8px;
  margin-bottom: 7px;
  height: 34px;
  font-weight: 200;
}
.text-input:hover {
  background-color: rgb(202, 202, 202);
  transition-duration: 250ms;
}
.text-input:focus {
  outline: none;
}
.column-x {
  float: right;
  margin-top: 6px;
  margin-right: 10px;
  font-weight: bold;
  color: rgb(122, 122, 122);
}
.column-x:hover {
  color: rgb(37, 37, 37);
  transition-duration: 300ms;
}
</style>