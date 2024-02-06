<script>
import TodoItem from "./todoItem.vue";
import axios from "axios";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import "vue-material-design-icons/styles.css";

export default {
  name: "TodoApp",
  props: ["date"],
  data() {
    return {
      taskInput: "",
      data: [],
    };
  },
  computed: {
    formatDate() {
      return this.date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    dateString() {
      return `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
    },
  },
  components: {
    TodoItem,
    PlusIcon,
  },
  methods: {
    async newTask() {
      if (this.taskInput == "") {
        alert("Please enter task");
        return;
      }

      let task = {
        description: this.taskInput,
        completed: false,
      };

      const url = "http://localhost:5000/api/addTask";

      try {
        await axios
          .post(
            url,
            { date: this.dateString, task: task },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            task._id = response.data.taskId;

            this.data = [...this.data, task];

            this.taskInput = "";
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchData() {
      this.data = [];
      try {
        const API_BASE_URL = "http://localhost:5000";
        console.log(this.dateString);
        const response = await axios.get(
          `${API_BASE_URL}/api/getTask/${this.dateString}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        this.data = response.data;
      } catch (error) {
        console.error(
          "Error fetching task for this date:",
          error.response.data
        );
        this.data = [];
      }
    },
    setData(updatedTasks) {
      this.data = updatedTasks;
    },
  },
  watch: {
    date: "fetchData",
  },
  async beforeMount() {
    this.fetchData();
  },
};
</script>

<template>
  <section class="w-full p-4 rounded-lg bg-white h-[28.8125rem]">
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
          v-model="taskInput"
        />
        <button
          class="text-indigo-600 font-medium px-2 w-1/4 hover:opacity-80 flex items-center transition-opacity"
          @click.prevent="newTask"
        >
          <span class="me-1 text-xl">
            <!-- <i class="fas fa-plus"></i> -->
            <PlusIcon />
          </span>
          <span class="text-sm"> New Task </span>
        </button>
      </form>
    </div>

    <!-- TASK LIST/DISPLAY -->
    <div id="todoList" class="flex flex-col h-3/4">
      <!-- overflow-y-scroll -->
      <TodoItem
        v-for="(item, index) in data"
        :key="index"
        :id="item._id"
        :desc="item.description"
        :completed="item.completed"
        :tasks="data"
        :updateData="setData"
      />
    </div>
  </section>
</template>

<style scoped></style>
