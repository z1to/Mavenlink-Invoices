<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 border-bottom">{{ timeEntry.date_performed }}</div>
      <div class="col-5 text-left border-bottom">
        <p>Notes: {{ timeEntry.notes }}</p>
        <p>Approved: {{ timeEntry.approved ? "Yes" : "No" }}</p>
        <p>Task title: {{ task.title }}</p>
        <p>Task description: {{ task.description }}</p>
      </div>
      <div class="col-1 border-bottom">{{ timeEntry.time_in_minutes / 60 }}</div>
      <div class="col-1 border-bottom">{{ rate }} USD</div>
      <div class="col-2 border-bottom">{{ lineTotal }} USD</div>
    </div>
    <br>
  </div>
</template>

<script>
import numeral from "numeral";

export default {
  name: "TimeEntry",
  props: {
    timeEntry: Object,
    task: Object,
    rate: Number,
  },
  computed: {
    lineTotal: function () {
      return numeral(this.rate * (this.timeEntry.time_in_minutes / 60)).format("0,0");
    },
  },
};
</script>
