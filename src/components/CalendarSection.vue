<script>
import ChevronLeftIcon from "vue-material-design-icons/ChevronLeft.vue";
import ChevronDoubleLeftIcon from "vue-material-design-icons/ChevronDoubleLeft.vue";
import ChevronDoubleRightIcon from "vue-material-design-icons/ChevronDoubleRight.vue";
import ChevronRightIcon from "vue-material-design-icons/ChevronRight.vue";
import "vue-material-design-icons/styles.css";
import StatusIndicator from "./statusIndicator.vue";
export default {
  name: "CalendarSection",
  props: ["year", "month", "updateDisplay", "setDate", "allDatesData"],
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
  mounted() {
    console.log(this.allDatesData, "All Dates Data");
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
    checkStatus(day, month, year) {
      const dateString = `${year}-${month}-${day}`;
      const allDates = this.allDatesData || [];

      const dateIndex = allDates.map((d) => d.date).indexOf(dateString);

      // return dateIndex !== null && dateIndex !== -1 ? true : false;
      return dateIndex;
    },
  },
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    StatusIndicator,
  },
};
</script>

<template>
  <div class="w-full text-center">
    <!-- data selector -->
    <div class="mb-2 flex items-center justify-between w-1/2 mx-auto">
      <!-- back year -->
      <button @click="updateDisplay(false, true)" class="text-lg">
        <!-- <i class="fas fa-angle-double-left"></i> -->
        <ChevronDoubleLeftIcon />
      </button>

      <!-- back month -->
      <button @click="updateDisplay(false, false)" class="text-lg">
        <!-- <i class="fas fa-chevron-left"></i> -->
        <ChevronLeftIcon />
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
      <button @click="updateDisplay(true, false)" class="text-lg">
        <!-- <i class="fas fa-chevron-right"></i> -->
        <ChevronRightIcon />
      </button>

      <!-- forward year -->
      <button @click="updateDisplay(true, true)" class="text-lg">
        <!-- <i class="fas fa-angle-double-right"></i> -->
        <ChevronDoubleRightIcon />
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
        <StatusIndicator
          v-if="
            checkStatus(day, this.month, this.year) !== null &&
            checkStatus(day, this.month, this.year) !== -1
          "
          :allDates="this.allDatesData"
          :dateIndex="checkStatus(day, this.month, this.year)"
        />
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
        <StatusIndicator
          v-if="
            checkStatus(day, this.month, this.year) !== null &&
            checkStatus(day, this.month, this.year) !== -1
          "
          :allDates="this.allDatesData"
          :dateIndex="checkStatus(day, this.month, this.year)"
        />
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
        <StatusIndicator
          v-if="
            checkStatus(day, this.month + 1, this.year) !== null &&
            checkStatus(day, this.month + 1, this.year) !== -1
          "
          :allDates="this.allDatesData"
          :dateIndex="checkStatus(day, this.month + 1, this.year)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
