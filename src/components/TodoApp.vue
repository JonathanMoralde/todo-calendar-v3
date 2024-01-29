<script>
export default {
  name: "TodoApp",
  props: ["date"],
  computed: {
    formatDate() {
      return this.date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<template>
  <Section class="w-full p-4 rounded-lg bg-white h-[28.8125rem]">
    <!-- overflow-hidden -->
    <!-- Selected Date -->
    <h3 class="mb-4 text-center font-medium text-xl tracking-wide">
      {{ formatDate }}
    </h3>

    <!-- TASK INPUT -->
    <div class="mb-4 border-b pb-4">
      <form class="flex justify-between">
        <input
          placeholder="Any plans on this day?"
          class="w-3/4 focus:outline-none bg-indigo-100 rounded-lg py-2 px-4 focus:ring-0 focus:ring-offset-0 border-none"
          type="text"
        />
        <button class="text-indigo-600 font-medium px-2 w-1/4 hover:opacity-80">
          <span class="me-1">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text-sm"> New Task </span>
        </button>
      </form>
    </div>

    <!-- TASK LIST/DISPLAY -->
    <div id="todoList" class="flex flex-col h-3/4">
      <!-- overflow-y-scroll -->
    </div>
  </Section>
</template>

<style scoped></style>
