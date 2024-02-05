<template>
  <div class="bg-indigo-600 text-white h-auto rounded-lg py-3 px-4 mb-2">
    <div class="flex justify-between items-center">
      <div class="flex items-center w-3/4">
        <input
          v-model="isCheck"
          type="checkbox"
          id="checkbox"
          class="me-2 h-5 w-5 rounded transition border-none focus:ring-0 focus:ring-offset-0"
          :class="{ 'text-indigo-600': isCheck }"
        />
        <label for="checkbox">
          <span class="transition-all"> test </span>
        </label>
      </div>

      <div class="text-xl">
        <button class="me-4 transition-opacity">
          <!-- <MdEdit className=" hover:opacity-70" /> -->
          &
        </button>
        <button class="transition-opacity">
          <!-- <MdDelete className=" hover:opacity-70" /> -->
          $
        </button>
      </div>
    </div>
    <!-- Edit Form -->
    <!-- <div className="w-full">
      <form className="flex justify-between items-center">
        <label className="ms-4 block w-3/4">
          <input
            type="text"
            placeholder="Todo Task Here"
            className="mt-1 block w-full px-2 py-0 bg-indigo-600 placeholder-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 border-none
    invalid:border-pink-500 invalid:text-pink-600
  "
          />
        </label>
        <div className="flex items-center text-xl">
          <button type="button" className="me-4">
            X
          </button>
          <button type="button">
            
            /
          </button>
        </div>
      </form>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      isCheck: false,
    };
  },
};
</script>

<style scoped></style>
