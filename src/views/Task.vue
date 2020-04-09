<template>
  <div class="task-view">
    <div class="modal-content">
      <input
        class="task-name"
        type="text"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />
      <div class="an-x" @click="closeModal">
        <h5 class="x-in">x</h5>
      </div>
      <p class="list-name">In "{{task.column}}" list.</p>
      <p class="description-headline">Description</p>
      <textarea
        class="description"
        :value="task.description"
        placeholder="Add a more detailed description..."
        @change="updateTaskProperty($event, 'description')"
      />
      <div class="save-btn" @click="closeModal">
        <h5 class="the-save">Save</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value
      });
    },
    closeModal() {
      this.$router.push({ name: "board" });
    }
  }
};
</script>

<style scoped>
.task-view {
  text-align: center;
  margin-top: 200px;
  width: 50%;
  margin-left: 25%;
}
.modal-content {
  background-color: #f4f5f7;
  height: 300px;
  width: 100%;
  border-radius: 5px;
}
.task-name {
  font-size: 20px;
  float: left;
  border: none;
  margin-left: 8.5%;
  margin-top: 20px;
  background-color: rgba(202, 202, 202, 0);
  width: 80%;
  font-weight: bold;
  padding: 5px;
  padding-left: 10px;
}
.list-name {
  font-size: 15px;
  color: rgb(100, 100, 100);
  float: left;
  margin-left: 10%;
  margin-top: 0;
  width: 80%;
  text-align: left;
}
.description-headline {
  font-size: 20px;
  float: left;
  margin-left: 10%;
  color: #000;
  font-weight: bold;
  margin-top: 25px;
  width: 80%;
  text-align: left;
}
.description {
  float: left;
  margin-left: 10%;
  width: 45%;
  font-size: 14px;
  background-color: rgb(189, 189, 189);
  border: none;
  border-radius: 3px;
  height: 15%;
  padding: 10px;
  resize: none;
}
.description:focus {
  height: 30%;
  outline-width: 2px;
  outline-style: solid;
  outline-color: #077dc1;
  transition-delay: 100ms;
  background-color: #fff;
}
.task-name:focus {
  outline-width: 2px;
  outline-style: solid;
  outline-color: #077dc1;
  background-color: #fff;
  transition-delay: 100ms;
}
.description::placeholder {
  color: #000;
}
.save-btn {
  background-color: #59ac43;
  width: 70px;
  height: 40px;
  border-radius: 5px;
  float: right;
  margin-right: 5%;
  margin-top: 70px;
  margin-bottom: 5%;
}
.the-save {
  font-size: 18px;
  margin-top: 7px;
}
.save-btn:hover {
  background-color: #6dbd58;
  cursor: pointer;
}
.an-x {
  font-size: 28px;
  color: rgb(122, 122, 122);
  width: 40px;
  height: 40px;
  float: right;
}
.x-in {
  margin-top: 3px;
  font-weight: 100;
}
.an-x:hover {
 color: rgb(0, 0, 0);
 font-weight: bold;
}
</style>