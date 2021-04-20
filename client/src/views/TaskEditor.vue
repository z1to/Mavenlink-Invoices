<template>
  <div class="create-invoice">
    <TaskEditorHeader
      @get-tasks="getTasks"
      :projects="projects"
    />
    <TaskList
      :tasks="tasks"
      :results="results"
      :rates="rates"
      @delete-task="onDeleteTask"
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
      projects: [],
      tasks: [],
      results: [],
      rates: [10],
      selectedProject: "",
    };
  },
  methods: {
    getTasks(workspace_id) {
      this.selectedProject = workspace_id.project;
      var results = axios({
        method: "get",
        headers: {'Authorization': `Bearer ${this.$store.state.serviceToken}`},
        url: "http://localhost:5000/tasks/mavenlink",
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

    deleteTask(workspace_id) {
      this.selectedProject = workspace_id.project;
      var results = axios({
        method: "post",
        headers: {'Authorization': `Bearer ${this.$store.state.serviceToken}`},
        url: "http://localhost:5000/tasks/mavenlink/delete",
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

    updateTask(workspace_id) {
      this.selectedProject = workspace_id.project;
      var results = axios({
        method: "post",
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

  created() {
    this.projects = ["35576775", "35576725"];
  },
};
</script>