<template>
  <main class="py-16 px-4">
    <h1
      class="text-center mb-4 text-2xl font-semibold tracking-wider uppercase"
    >
      To-do Calendar
    </h1>
    <div class="flex flex-col">
      <TodoApp />
      <CalendarSection />
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
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Poppins", sans-serif;
}
</style>
