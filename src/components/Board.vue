<template>
  <div
    @drop="autoColumnCreate($event, board)"
    @dragover.prevent
    @dragenter.prevent
    :board="board"
    class="board"
    id="whole-board"
    :style="{'background-image': 'url(' + require('../assets/' +
    board.backgroundImg + '.jpg') + ')'}"
  >
    <div class="header">
      <h1 class="title">Mello</h1>
      <BackgroundButton
        class="img-button"
        v-for="(image, $imgIndex) of board.backgroundImgs"
        :key="$imgIndex"
        :imgIndex="$imgIndex"
        :board="board"
        :image="image"
        :oldImg="board.backgroundImg"
      />
    </div>
    <BoardColumn
      class="the-column"
      v-for="(column, $columnIndex)  of board.columns"
      :key="$columnIndex"
      :column="column"
      :columnIndex="$columnIndex"
      :board="board"
    />

    <input
      id="create-column"
      class="column-text-input"
      type="text"
      v-model="newColumnName"
      placeholder="+ New Column"
      @keyup.enter="createColumn"
    />

    <div class="modal" v-if="isTaskOpen" @click.self="close">
      <router-view :board="board" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BackgroundButton from './BackgroundButton.vue';
import BoardColumn from './BoardColumn.vue';

export default {
  components: {
    BoardColumn,
    BackgroundButton,
  },
  data() {
    return {
      newColumnName: '',
    };
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task';
    },
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' });
    },
    createColumn() {
      if (this.newColumnName !== '') {
        this.$store.commit('CREATE_COLUMN', {
          name: this.newColumnName,
        });
        this.newColumnName = '';
      }
    },
    autoColumnCreate(e, board) {
      const theType = e.dataTransfer.getData('type');
      const toEl = e.target.className;
      if (
        theType === 'task'
        && toEl !== 'text-input'
        && toEl !== 'column-name'
        && toEl !== 'column-x'
        && toEl !== 'the-column'
        && toEl !== ''
      ) {
        const fromColumnIndex = e.dataTransfer.getData('from-column-index');
        const fromTaskIndex = e.dataTransfer.getData('from-task-index');
        const taskName = board.columns[fromColumnIndex].tasks[fromTaskIndex].name;
        const taskDescription = board.columns[fromColumnIndex].tasks[fromTaskIndex].description;
        const taskId = board.columns[fromColumnIndex].tasks[fromTaskIndex].id;
        if (e.target.id === 'whole-board' || e.target.id === 'create-column') {
          this.$store.commit('CREATE_COLUMN_FROM_DROP', {
            fromColumnIndex,
            fromTaskIndex,
            taskName,
            taskDescription,
            taskId,
          });
        }
        // FIX DISPLAY
        const fromTasks = board.columns[fromColumnIndex].tasks;
        setTimeout(() => {
          fromTasks.forEach((task) => {
            const cardToFix = document.getElementById(task.id);
            cardToFix.style.display = 'inline-block';
          });
        }, 10);
      }
    },
  },
};
</script>

<style lang="css">
body {
  margin: 0;
  border: 0;
}
.board {
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow-y: scroll;
}
.header {
  color: #ebecf0;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 0;
  height: 44px;
}
.title {
  margin-top: 0;
  display: inline-block;
  padding-left: 15%;
}
.column {
  display: inline-block;
  background-color: #ebecf0;
  width: 400px;
  margin: 20px;
  vertical-align: top;
}
.modal {
  background-color: rgba(3, 3, 3, 0.3);
  background-attachment: fixed;
  color: white;
  top: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
  font-size: 40px;
  text-align: center;
}
.add-column {
  display: inline-block;
  background-color: rgba(202, 202, 202, 0.6);
  width: 300px;
  margin: 5px;
  vertical-align: top;
  border-radius: 3px;
}
.text-input {
  font-size: 16px;
  border: none;
  background-color: #ebecf0;
  width: 80%;
  padding-left: 8px;
  margin: 7px;
  height: 34px;
  font-weight: 200;
  border-radius: 3px;
}
.text-input:hover {
  background-color: rgb(202, 202, 202);
  transition-duration: 250ms;
}
.text-input:focus {
  outline: none;
}
.column-text-input {
  font-size: 16px;
  border: none;
  background-color: rgba(179, 179, 179, 0.6);
  width: 300px;
  padding-left: 8px;
  margin: 7px;
  height: 34px;
  font-weight: 200;
  border-radius: 3px;
  vertical-align: top;
  display: inline-block;
  margin-top: 25px;
  color: #fff;
  font-weight: 500;
}
.column-text-input:hover {
  background-color: rgba(179, 179, 179, 0.3);
  transition-duration: 250ms;
}
.column-text-input:focus {
  outline: none;
}
.column-text-input::placeholder {
  color: #fff;
}
</style>
