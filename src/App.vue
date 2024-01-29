<template>
  <main class="py-16 px-4 md:px-20 lg:px-60">
    <h1
      class="text-center mb-4 md:mt-10 text-2xl font-semibold tracking-wider uppercase"
    >
      To-do Calendar
    </h1>
    <div class="flex flex-col md:flex-row-reverse gap-10 md:gap-4">
      <TodoApp :date="selectedDate" />
      <CalendarSection
        :year="year"
        :month="month"
        :updateDisplay="changeDisplay"
        :setDate="handleClick"
      />
    </div>
  </main>
</template>

<script>
import CalendarSection from "./components/CalendarSection.vue";
import TodoApp from "./components/TodoApp.vue";

export default {
  name: "App",
  components: {
    TodoApp,
    CalendarSection,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      selectedDate: new Date(),
    };
  },
  methods: {
    changeDisplay(isNext, isYear) {
      if (isYear) {
        if (isNext) {
          this.year += 1;
        } else {
          this.year -= 1;
        }
      } else {
        if (isNext) {
          if (this.month === 11) {
            this.month = 0;
            this.year += 1;
          } else {
            this.month += 1;
          }
        } else {
          if (this.month === 0) {
            this.month = 11;
            this.year -= 1;
          } else {
            this.month -= 1;
          }
        }
      }
    },
    handleClick(day, isMonthDays, isPrefix, isNextMonth) {
      if (isMonthDays && !isPrefix && !isNextMonth) {
        this.selectedDate = new Date(this.year, this.month, day);
        console.log(this.year, this.month, day);
        console.log(this.selectedDate);
      } else if (!isMonthDays && isPrefix && !isNextMonth) {
        this.selectedDate = new Date(this.year, this.month, day);
        console.log(this.year, this.month, day);
        console.log(this.selectedDate);
      } else {
        // if month is ===11 , then value = 1
        const monthValue = this.month === 11 ? 0 : this.month + 1;
        const yearValue = this.month === 11 ? this.year + 1 : this.year;
        this.selectedDate = new Date(yearValue, monthValue, day);
        console.log(yearValue, monthValue, day);
        console.log(this.selectedDate);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Poppins", sans-serif;
}
</style>
