<template>
  <div
    class="task"
    :id="task.id"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex, task.id)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex, board)"
  >
    <div class="task-name" @click="goToTask(task, column)">{{task.name}}</div>
    <div class="the-x" @click="deleteTask(column.tasks, taskIndex)">X</div>
    <p
      class="description"
      v-if="task.description"
      @click="goToTask(task, column)"
    >{{task.description}}</p>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pickupTask(e, taskIndex, fromColumnIndex) {
      // REMOVE ON PICKUP
      const card = document.getElementById(e.target.id);
      setTimeout(() => {
        card.style.display = 'none';
      }, 0);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData('from-task-index', taskIndex);
      e.dataTransfer.setData('from-column-index', fromColumnIndex);
      e.dataTransfer.setData('type', 'task');
    },
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } });
    },
    moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex, board) {
      const type = e.dataTransfer.getData('type');
      if (type === 'task') {
        this.moveTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length,
          board,
        );
      } else {
        this.moveColumn(e, toColumnIndex);
      }
    },
    moveTask(e, toTasks, toTaskIndex, board) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index');
      const fromTasks = board.columns[fromColumnIndex].tasks;
      const fromTaskIndex = e.dataTransfer.getData('from-task-index');
      // FIX DISPLAY
      setTimeout(() => {
        fromTasks.forEach((task) => {
          const cardToFix = document.getElementById(task.id);
          cardToFix.style.display = 'inline-block';
        });
      }, 10);
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex,
      });
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index');
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      });
    },
    deleteTask(task, taskIndex) {
      this.$store.commit('DELETE_TASK', {
        task,
        taskIndex,
      });
    },
  },
};
</script>

<style scoped>
.task {
  background-color: #fff;
  width: 80%;
  border-style: solid;
  border-width: 7px;
  border-color: #ebecf0;
  display: inline-block;
  text-align: left;
  border-radius: 12px;
}
.task:hover {
  background-color: #f7f7f8;
  transition-duration: 100ms;
}
.task-name {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  display: inline-block;
  width: 85%;
}
.description {
  font-size: 12px;
  margin-left: 7px;
  margin-top: 0;
}
.the-x {
  float: right;
  font-weight: bold;
  margin-top: 10px;
  margin-right: 10px;
  opacity: 0.2;
  font-size: 14px;
}
.the-x:hover {
  color: rgb(77, 77, 77);
  z-index: 2;
  opacity: 1;
}
#place-holder-card {
  background-color: rgb(219, 219, 219);
  width: 80%;
  margin: 7px;
  display: inline-block;
  text-align: left;
  border-radius: 5px;
  height: 35px;
}
</style>
