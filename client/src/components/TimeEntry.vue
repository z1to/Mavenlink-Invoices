<template>
    <h3> {{timeEntry.text}} </h3>
</template>

<script>
export default {
    name: 'TimeEntry',
    props: {
        timeEntry: Object
    }
}
</script>
