<template>
  <div class="create-invoice">
    <CreateInvoiceHeader
      @import-time-entries="importTimeEntries"
      :projects="projects"
    />
    <div class="form-group row">
      <label id="invoiceDate" for="invoiceDate" class="col-sm-2 col-form-label"
        >Date</label
      >
      <div class="col-sm-3">
        <input class="form-control" type="date" v-model="invoiceDate" />
      </div>
    </div>
    <TimeEntries
      :timeEntries="timeEntries"
      :tasks="tasks"
      :results="results"
      :rates="rates"
      @delete-time="onDeleteTime"
    />
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <h5>Total: {{ total }} USD</h5>
      </div>
      <div class="row d-flex justify-content-center">
        <button @click="createInvoice" class="btn btn-primary">
          Create Invoice
        </button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import CreateInvoiceHeader from "@/components/CreateInvoiceHeader.vue";
import axios from "axios";
import TimeEntries from "@/components/TimeEntries.vue";
import numeral from "numeral";

export default {
  name: "CreateInvoice",
  components: {
    CreateInvoiceHeader,
    TimeEntries,
  },
  data() {
    return {
      timeEntries: [],
      projects: [],
      tasks: [],
      results: [],
      rates: [10],
      invoiceDate: "",
      selectedProject: "",
    };
  },
  computed: {
    total: function () {
      var totalPerTimeEntry = this.results.map(
        (result) =>
          (this.timeEntries[result.id].time_in_minutes / 60) * this.rates[0]
      );
      if (totalPerTimeEntry.length > 0) {
        return numeral(
          totalPerTimeEntry.reduce((prev, current) => prev + current)
        ).format("0,0");
      }
      return 0;
    },
  },
  methods: {
    importTimeEntries(workspace_id, created_after, created_before) {
      this.selectedProject = workspace_id;
      axios({
        method: "get",
        url: "http://localhost:5000/tasks/time",
        params: {
          workspace_id: workspace_id,
          created_after: created_after,
          created_before: created_before,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.results = response.data.results;
          this.timeEntries = response.data.time_entries;
          this.tasks = response.data.stories;
        })
        .catch((error) => console.log(error));
    },
    onDeleteTime: function (timeEntryId) {
      if (confirm("Are you sure?")) {
        this.results = this.results.filter(
          (result) => result.id !== timeEntryId
        );
      }
    },
    createInvoice: function () {
      var taskIds = [];
      this.results.map((task) => taskIds.push(task.id));
      var invoiceData = [];
      for (var timeEntry in this.timeEntries) {
        if (taskIds.includes(timeEntry)) {
          invoiceData.push({
            invoiceDate: this.invoiceDate,
            projectId: this.selectedProject,
            datePerformed: this.timeEntries[timeEntry].date_performed,
            timeInMinutes: this.timeEntries[timeEntry].time_in_minutes,
            notes: this.timeEntries[timeEntry].notes,
            approved: this.timeEntries[timeEntry].approved,
            storyId: this.timeEntries[timeEntry].story_id,
            taskTitle: this.tasks[this.timeEntries[timeEntry].story_id].title,
            taskDescription: this.tasks[this.timeEntries[timeEntry].story_id]
              .description,
            rate: this.rates[0],
            timeEntryId: timeEntry,
          });
        }
      }
      axios({
        method: "post",
        url: "http://localhost:5000/invoices/create",
        data: {
          invoiceData: invoiceData,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.projects = ["35576775", "35576725"];
  },
};
</script>