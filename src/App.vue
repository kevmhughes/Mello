<template>
  <div>
    <md-card>
    <h1>To-Do List</h1>
    <md-field>
    <md-input v-model="currentTodo" @keydown.enter="addTodo()" placeholder="Add a to-do to your list">
    </md-input>
    </md-field>
      <ul class="todos">
      <li class="todo-item" v-for="todo in todos" :key="todo.id">
        <input class="completed" type="checkbox">
        <span v-if="todo.editing === false" class="editing" :class="{editing: todo == editedTodo}" @dblclick="editTodo(todo)">
          {{ todo.label }}
        </span>
        <md-field v-if="todo.editing" class="editing">
          <md-input
                  type="text"
                  v-model="todo.label"
                  @keyup.enter="stopEdit(todo)"
                  @keyup.esc="stopEdit(todo)"
                  @focusout="stopEdit(todo)"
                  placeholder="Add item here"
          />
        </md-field>
        <button class="buttonFirst" v-if="todo.editing === false" @click="editTodo(todo)">Edit</button>
        <button v-if="todo.editing === true" @click="stopEdit(todo)">Save</button>
        <button class="buttonSecond" v-if="todo.editing === false" @click="removeTodo(todo)">Delete</button>
        <button v-if="todo.editing === true" @click="editTodo(todo)">Cancel</button>
      </li>
    </ul>
    </md-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      savedTodos: [],
      currentTodo: '',
      editedTodo: ''
    };
  },
  methods: {
    addTodo() {
      this.todos.push({id: this.todos.length, label: this.currentTodo, completed: false, editing: false});
      this.currentTodo = '';
    },
    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos[index].editing = !this.todos[index].editing;
    },
    stopEdit(todo) {
      todo.editing = false;
    }
  }
};
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 20px !important;
    line-height: 1.4 !important;
    margin-right: 30px !important;
    background-color: #ffffff;
    background-image: url("./assets/image1.png");
    background-repeat: no-repeat;
    background-position: center; 
  }
  .md-card {
    width: 66%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    background-color: #ffffff !important;
  }
  ul {
    list-style-type: none;
    margin-left: 0px;
    padding: 0px 200px 0px 0px;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
  }
  div {
    padding-bottom: 10px !important;
    padding-left: 30px !important;
  }
  .placeholder {
    font-style: italic;
  }
  button {
    margin: 3px;
    transition-duration: 0.4s;
    border-radius: 4px;
  }
  button:hover {
    background-color: #007bff; 
    color: white;
  }
  .buttonFirst {
    margin: 3px;
    transition-duration: 0.4s;
    border-radius: 4px;
    position: absolute;
    right: 25px;
  }
   .buttonSecond {
    margin: 3px;
    transition-duration: 0.4s;
    border-radius: 4px;
    position: absolute;
    right: 70px;
  }

  span {
    padding-left: 3px !important;
    padding-right: 3px !important;
  }
  .editing {
    display: inline-block !important;
    border: none !important;
    border-radius: 5px !important;
    height: 35px;
    font-size: 20px !important;
  }
  .completed {
    width: 17px !important;
    height: 17px !important;
  }
  .md-field {
    border: 2px solid lightblue !important;
    height: 40px !important;
    border-radius: 5px !important;
    width: 60% !important;
    font-size: 20px !important;
    min-height: 0px !important;
    font-size: 20px !important;
    padding-top: 5px !important;
    padding-left: 5px !important;
  }
  .md-input {
    width: 66% !important;
  }
  @media (max-width: 1400px) {
    .md-card {
      width: 75%;
    }
  }
@media (max-width: 1200px) {
    ul {
    list-style-type: none;
    margin-left: 0px;
    padding: 0px 130px 0px 0px;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
  }
  }
</style>