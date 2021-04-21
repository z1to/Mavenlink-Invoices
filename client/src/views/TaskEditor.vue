<template>
  <div class="create-invoice">
    <b-alert show v-if="response !== ''">{{ response }}</b-alert>
    <TaskEditorHeader/>
    <TaskList
      :tasks="tasks" @deleteTask="deleteTask"
    />
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import TaskEditorHeader from "@/components/TaskEditorHeader.vue";
import axios from "axios";
import TaskList from "@/components/TaskList.vue";

export default {
  name: "TaskEditor",
  components: {
    TaskEditorHeader,
    TaskList,
  },
  data() {
    return {
      tasks: [],
      selectedProject: "",
      response: "",
    };
  },
  methods: {
    getTasks() {
      var results = axios({
        method: "get",
        headers: {'Authorization': `Bearer ${this.$store.state.serviceToken}`},
        url: "http://localhost:5000/tasks/mavenlink",
      })
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data.stories;
        })
        .catch((error) => console.log(error));

      console.log(results);
    },

     deleteTask(workspace_id) {
      this.selectedProject = workspace_id.project;
      var results = axios({
        method: "delete",
        headers: {'Authorization': `Bearer ${this.$store.state.serviceToken}`},
        url: "http://localhost:5000/tasks/mavenlink/delete?id="+workspace_id,
      })
        .then(() => {
          this.response = "Task was successfully deleted";
          this.getTasks();
        })
        .catch((error) => {
          this.response = "Task unable to be deleted";
          console.log(error)
        });

      console.log(results);
    },

    //Parameters: workspace_id, newTask.name, newTask.description
    updateTask(workspace_id) {
      this.selectedProject = workspace_id.project;
      var results = axios({
        method: "put",
        headers: {'Authorization': `Bearer ${this.$store.state.serviceToken}`},
        url: "http://localhost:5000/tasks/mavenlink/update",
        params: {
          workspace_id: this.selectedProject,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data.stories;
        })
        .catch((error) => console.log(error));

      console.log(results);
    },

    //Parameters: task.name, task.description
    createTask(workspace_id) {
      this.selectedProject = workspace_id.project;
      var results = axios({
        method: "post",
        headers: {'Authorization': `Bearer ${this.$store.state.serviceToken}`},
        url: "http://localhost:5000/tasks/mavenlink/create",
        params: {
          workspace_id: this.selectedProject,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data.stories;
        })
        .catch((error) => console.log(error));

      console.log(results);
    },
  },

  mounted() {
    this.getTasks()
  }
};
</script>