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
      <div class="col-sm-3 was-validated">
        <input
          class="form-control is-invalid"
          type="date"
          v-model="invoiceDate"
          required
        />
        <div class="invalid-feedback">Please pick a date.</div>
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
import moment from "moment";

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
      created_after: "",
      created_from: "",
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
        headers: { Authorization: `Bearer ${this.$store.state.serviceToken}` },
        params: {
          include: "story",
          date_performed_between: created_after + ":" + created_before,
          workspace_id: workspace_id,
        },
      })
        .then((response) => {
          if (response.data.results.length == 0) {
            alert("All the time entries have been invoiced!");
          }
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
      var invoiceData = {
        invoiceDate: this.invoiceDate,
        projectId: this.selectedProject,
        invoiceLineData: [],
      };
      for (var timeEntry in this.timeEntries) {
        if (taskIds.includes(timeEntry)) {
          invoiceData.invoiceLineData.push({
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
        headers: { Authorization: `Bearer ${this.$store.state.serviceToken}` },
        data: {
          invoiceData: invoiceData,
        },
      })
        .then((response) => {
          alert("The invoice was successfully created!");
          this.timeEntries = [];
          this.tasks = [];
          this.results = [];
          this.invoiceDate = "";
          this.selectedProject = "";
          this.created_after = "";
          this.created_from = "";
        })
        .catch((error) => alert("Something went wrong!"));
    },
  },
  created() {
    this.projects = [
      { id: "35576775", title: "Engagement Restructurations 2021 | GB6536UY" },
      { id: "35576725", title: "Engagement Contrôle qualité 2021 | JK76410VB" },
    ];
  },
};
</script>
