<template>
  <div class="bg-indigo-600 text-white h-auto rounded-lg py-3 px-4 mb-2">
    <div
      class="flex justify-between items-center"
      :class="{ hidden: isVisible }"
    >
      <div class="flex items-center w-3/4">
        <input
          v-model="isCheck"
          type="checkbox"
          id="checkbox"
          class="me-2 h-5 w-5 rounded transition border-none focus:ring-0 focus:ring-offset-0"
          :class="{ 'text-indigo-600': isCheck }"
          @change="handleChange"
        />
        <label for="checkbox">
          <span class="transition-all" :class="{ 'line-through': isCheck }">
            {{ description }}
          </span>
        </label>
      </div>

      <div class="text-xl">
        <button
          class="me-4 transition-opacity hover:opacity-70"
          @click="isVisible = true"
        >
          <!-- <MdEdit className=" hover:opacity-70" /> -->
          <PencilIcon />
        </button>
        <button class="transition-opacity hover:opacity-70" @click="handleDel">
          <!-- <MdDelete className=" hover:opacity-70" /> -->
          <DeleteIcon />
        </button>
      </div>
    </div>
    <!-- Edit Form -->
    <div
      className="w-full"
      :class="{
        hidden: !isVisible,
      }"
    >
      <form className="flex justify-between items-center">
        <label className="ms-4 block w-3/4">
          <input
            v-model="editInput"
            type="text"
            placeholder="Todo Task Here"
            className="mt-1 block w-full px-2 py-0 bg-indigo-600 placeholder-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 border-none
    invalid:border-pink-500 invalid:text-pink-600
  "
          />
        </label>
        <div className="flex items-center text-xl">
          <button
            type="button"
            className="me-4"
            @click="
              isVisible = false;
              editInput = '';
            "
          >
            <CloseIcon />
          </button>
          <button type="button" @click="handleEdit">
            <CheckIcon />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PencilIcon from "vue-material-design-icons/Pencil.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import CheckIcon from "vue-material-design-icons/Check.vue";
import "vue-material-design-icons/styles.css";
import axios from "axios";
export default {
  name: "TodoItem",
  props: ["id", "desc", "completed", "i", "tasks", "updateData"],
  data() {
    return {
      isCheck: this.completed || false,
      description: this.desc || "Loading...",
      isVisible: false,
      editInput: "",
    };
  },
  components: {
    PencilIcon,
    DeleteIcon,
    CloseIcon,
    CheckIcon,
  },
  methods: {
    async handleChange() {
      const updatedIsCheck = this.isCheck; // get the current value
      console.log(updatedIsCheck);
      console.log(this.id);

      const url = "http://localhost:5000/api/updateTaskStatus";
      try {
        const result = await axios.put(url, {
          taskId: this.id,
          u_completed: updatedIsCheck, // Use the updated state
        });

        console.log(result.data);
        // Update the state based on the server response
        // if (result.data.message === "Task status updated successfully!") {
        //   log
        // }

        // const updatedAllDates = [...this.allDates];
        // const dateIndex = updatedAllDates.map((d) => d.date).indexOf(dateString);
        // if (dateIndex !== -1) {
        //   updatedAllDates[dateIndex].tasks[index].completed = updatedIsCheck;

        //   setAllDates(updatedAllDates);
        // }
      } catch (error) {
        console.log(error);
      }
    },
    async handleEdit() {
      const url = "http://localhost:5000/api/updateTask";

      const updatedTask = this.editInput;

      const result = await axios.put(url, {
        taskId: this.id,
        u_description: updatedTask,
      });
      console.log(result.data);
      this.description = updatedTask;
      this.isVisible = false;
      this.editInput = "";
    },
    async handleDel() {
      const url = `http://localhost:5000/api/deleteTask/${this.id}`;

      await axios
        .delete(url)
        .then((response) => {
          console.log(response);
          // const newData = data.filter((task, i) => i !== index);
          const newData = this.tasks.filter((task) => task._id !== this.id);
          this.updateData(newData);
          console.log(newData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    console.log(this.completed);
  },
};
</script>

<style scoped></style>
