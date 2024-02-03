<script>
export default {
  name: "CalendarSection",
  props: ["year", "month", "updateDisplay", "setDate"],
  data() {
    return {
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      today: new Date().getDate(),
      monthToday: new Date().getMonth(),
      yearToday: new Date().getFullYear(),
    };
  },
  computed: {
    lastDayOfMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDayOfMonth() {
      return new Date(this.year, this.month, 1).getDate();
    },
    dateString() {
      const firstDayOfMonthDate = new Date(this.year, this.month, 1);
      return firstDayOfMonthDate.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },
    blankDays() {
      return this.weekdays.indexOf(this.dateString.split(", ")[0]);
    },
    nextMonthDays() {
      return 42 - (this.lastDayOfMonth + this.blankDays);
    },
  },
  methods: {
    generateNegativeNum(num) {
      if (num === 0) {
        return num;
      } else {
        return num * -1;
      }
    },
    generatePrefixDays(days) {
      let index = [];
      for (let i = days - 1; i >= 0; i--) {
        index.push(this.generateNegativeNum(i));
      }

      return index;
    },
  },
};
</script>

<template>
  <div class="w-full text-center">
    <!-- data selector -->
    <div class="mb-2 flex items-center justify-between w-1/2 mx-auto">
      <!-- back year -->
      <button @click="updateDisplay(false, true)">
        <i class="fas fa-angle-double-left"></i>
      </button>

      <!-- back month -->
      <button @click="updateDisplay(false, false)">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h3>
        {{
          new Date(this.year, this.month, 1).toLocaleDateString("en-us", {
            month: "long",
          })
        }}
        - {{ this.year }}
      </h3>

      <!-- forward month -->
      <button @click="updateDisplay(true, false)">
        <i class="fas fa-chevron-right"></i>
      </button>

      <!-- forward year -->
      <button @click="updateDisplay(true, true)">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>

    <!-- day names -->
    <div class="grid grid-cols-7 mb-2">
      <h3
        className="uppercase text-xs"
        v-for="(day, index) in weekdays"
        :key="index"
      >
        {{ day.slice(0, 3) }}
      </h3>
    </div>

    <!-- day padding -->
    <div class="w-full h-auto grid grid-cols-7 grid-rows-6 gap-1">
      <!-- prefix -->
      <div
        class="w-full h-16 bg-white rounded-lg hover:shadow-lg transition-all hover:cursor-pointer pt-4 pb-2 flex flex-col justify-between items-center"
        v-for="(day, index) in generatePrefixDays(blankDays)"
        :key="index"
        @click="setDate(day, false, true, false)"
      >
        <h3 class="text-xs text-gray-400">
          {{ new Date(this.year, this.month, day).getDate() }}
        </h3>
      </div>
      <!-- month days -->
      <div
        class="w-full h-16 bg-white rounded-lg hover:shadow-lg transition-all hover:cursor-pointer pt-4 pb-2 flex flex-col justify-between items-center"
        v-for="(day, index) in Array.from(
          { length: lastDayOfMonth },
          (_, index) => index + 1
        )"
        :key="index"
        @click="setDate(day, true, false, false)"
        :class="{
          'border-2 border-indigo-300':
            today === day &&
            this.month === monthToday &&
            this.year === yearToday,
        }"
      >
        <h3 class="text-xs">{{ day }}</h3>
      </div>

      <!-- next month days -->
      <div
        class="w-full h-16 bg-white rounded-lg hover:shadow-lg transition-all hover:cursor-pointer pt-4 pb-2 flex flex-col justify-between items-center"
        v-for="(day, index) in Array.from(
          { length: nextMonthDays },
          (_, index) => index + 1
        )"
        :key="index"
        @click="setDate(day, false, false, true)"
      >
        <h3 class="text-xs text-gray-400">
          {{ new Date(this.year, this.month + 1, day).getDate() }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
