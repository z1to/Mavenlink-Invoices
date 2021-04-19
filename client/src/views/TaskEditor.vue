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
      this.selectedProject = workspace_id;
      axios({
        method: "get",
        headers: {'Authorization': 'Bearer $(this.$store.state.serviceToken'},
        url: "http://localhost:5000/tasks/mavenlink",
        params: {
          workspace_id: workspace_id,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.results = response.data.results;
          this.tasks = response.data.stories;
        })
        .catch((error) => console.log(error));
    },

    deleteTask: function (taskId) {
      if (confirm('Are you sure you want to delete task: ${taskId} ?')) {
        this.results = this.results.filter(
          (result) => result.id !== taskId
        );
      }
    },

    // updateTask: function (taskId) {
      
    // },

    // createTask: function(taskid) {

    // },

    // createInvoice: function () {
    //   var taskIds = [];
    //   this.results.map((task) => taskIds.push(task.id));
    //   var invoiceData = {
    //     invoiceDate: this.invoiceDate,
    //     projectId: this.selectedProject,
    //     invoiceLineData: [],
    //   };
    //   for (var timeEntry in this.timeEntries) {
    //     if (taskIds.includes(timeEntry)) {
    //       invoiceData.invoiceLineData.push({
    //         notes: this.timeEntries[timeEntry].notes,
    //         approved: this.timeEntries[timeEntry].approved,
    //         storyId: this.timeEntries[timeEntry].story_id,
    //         taskTitle: this.tasks[this.timeEntries[timeEntry].story_id].title,
    //         taskDescription: this.tasks[this.timeEntries[timeEntry].story_id]
    //           .description,
    //         rate: this.rates[0],
    //         timeEntryId: timeEntry,
    //       });
    //     }
    //   }
    //   axios({
    //     method: "post",
    //     url: "http://localhost:5000/invoices/create",
    //     data: {
    //       invoiceData: invoiceData,
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => console.log(error));
    // },
  },
  
  created() {
    this.projects = ["35576775", "35576725"];
  },
};
</script>