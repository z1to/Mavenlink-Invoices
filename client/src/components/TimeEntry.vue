<template>
  <div>
    <h4>Time in hours: {{ timeEntry.time_in_minutes/60 }}</h4>
    <h4>Date performed: {{ timeEntry.date_performed }}</h4>
    <h4>Notes: {{ timeEntry.notes }}</h4>
    <h4>Approved: {{ timeEntry.approved }}</h4>
    <h4>Task title: {{ task.title }}</h4>
    <h4>Task description: {{ task.description }}</h4>
    <h4>Rate: {{rate}}</h4>
    <br />
  </div>
</template>

<script>
export default {
  name: "TimeEntry",
  props: {
    timeEntry: Object,
    task: Object,
    rate: Number
  },
};
</script>
