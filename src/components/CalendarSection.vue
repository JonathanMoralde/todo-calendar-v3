<script>
export default {
  name: "CalendarSection",
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
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
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
  <div class="w-full mt-10 text-center">
    <!-- data selector -->
    <div class="mb-2 flex items-center justify-between w-1/2 mx-auto">
      <!-- back year -->
      <h3>--</h3>

      <!-- back month -->
      <h3>-</h3>
      <h3>
        {{
          new Date(this.year, this.month, 1).toLocaleDateString("en-us", {
            month: "long",
          })
        }}
        - {{ this.year }}
      </h3>

      <!-- forward month -->
      <h3>+</h3>

      <!-- forward year -->
      <h3>++</h3>
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
      >
        <h3 class="text-xs text-gray-400">
          {{ new Date(this.year, this.month + 1, day).getDate() }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
