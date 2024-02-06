<template>
  <div class="w-full">
    <div
      class="w-3/5 h-2 mx-auto rounded-t-lg transition-all"
      :class="{
        'bg-green-400': this.isCompleted,
        'bg-red-400': !this.isCompleted,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "StatusIndicator",
  props: ["allDates", "dateIndex"],
  date() {
    return {
      isCompleted: false,
    };
  },
  watch: {
    allDates: {
      immediate: true,
      handler(val) {
        // if (val && val.tasks) {
        if (this.allDates && this.dateIndex) {
          console.log("I am changing status", val);
          console.log(this.allDates[this.dateIndex], "date updating");
          console.log("date index of date:", this.dateIndex);
          this.isCompleted = this.allDates[this.dateIndex].tasks.every(
            (task) => task.completed
          );
        } else {
          this.isCompleted = false;
        }
        // }
      },
    },
  },
};
</script>

<style scoped></style>
