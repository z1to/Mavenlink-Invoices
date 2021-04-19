<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1 border-bottom">
        <font-awesome-icon
          @click="$emit('delete-time')"
          icon="minus-circle"
          size="sm"
          style="color: Tomato"
        />
      </div>
      <div class="col-2 border-bottom">
        <p class="text-left">{{ timeEntry.date_performed }}</p>
      </div>
      <div class="col-5 text-left border-bottom">
        <p>Task title: {{ task.title }}</p>
        <p>Task description: {{ task.description }}</p>
      </div>
      <div class="col-1 border-bottom">

      </div>
      <div class="col-1 border-bottom">{{ rate }} USD</div>
    </div>
    <br />
  </div>
</template>

<script>

export default {
  name: "Task",
  props: {
    task: Object,
    rate: Number,
    timeEntryId: String,
  },
  emits: ["delete-time"]
};
</script>
