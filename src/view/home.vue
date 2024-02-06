<template>
  <header class="flex justify-between items-center px-4 md:px-20 py-2 lg:px-60">
    <div class="flex items-center">
      <div class="w-10 h-10 lg:w-14 lg:h-14 me-2 shadow rounded-full">
        <img
          class="w-full h-full"
          src="../assets/TC.png"
          alt="To-do Calendar Logo"
        />
      </div>
      <h1
        class="uppercase tracking-wider font-semibold text-lg md:text-xl lg:text-2xl"
      >
        To-do Calendar
      </h1>
    </div>

    <div>
      <div class="relative">
        <p class="cursor-pointer" @click="toggleDropdown">
          Welcome {{ userName }}!
          <span class="ms-1">
            <i v-if="!isDropdownOpen" class="fas fa-angle-down"></i>
            <i v-if="isDropdownOpen" class="fas fa-angle-up"></i>
          </span>
        </p>
        <div
          v-if="isDropdownOpen"
          @click="toggleDropdown"
          class="fixed inset-0 h-full w-full z-50"
        ></div>
        <transition>
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50"
          >
            <p
              class="block px-4 py-2 text-sm text-gray-700 hover:rounded hover:bg-indigo-50 hover:text-gray-900 cursor-pointer transition-all"
              @click="signOut"
            >
              Sign Out
            </p>
          </div>
        </transition>
      </div>
    </div>
  </header>
  <main class="py-16 min-h-screen px-4 md:px-20 lg:px-60">
    <div class="flex flex-col md:flex-row-reverse gap-10 md:gap-4">
      <TodoApp :date="selectedDate" />
      <CalendarSection
        :year="year"
        :month="month"
        :updateDisplay="changeDisplay"
        :setDate="handleClick"
      />
    </div>
    <div className="flex justify-center mt-10">
      <div className="flex items-center me-4">
        <div className="h-4 w-4 border-2 border-indigo-400 rounded me-1"></div>
        <p>- Today</p>
      </div>
      <div className="flex items-center me-4">
        <div className="h-2 w-6 bg-red-400 rounded-t-lg me-1"></div>
        <p>- Unfinished Task</p>
      </div>
      <div className="flex items-center">
        <div className="h-2 w-6 bg-green-400 rounded-t-lg me-1"></div>
        <p>- Finished Task</p>
      </div>
    </div>
  </main>
  <footer className="max-w-5xl mx-auto text-center">
    <p>Jhm. Jonathan Moralde &copy; 2024</p>
  </footer>
</template>

<script>
import CalendarSection from "../components/CalendarSection.vue";
import TodoApp from "../components/TodoApp.vue";
import router from "@/router/router";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    TodoApp,
    CalendarSection,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      selectedDate: new Date(),
      isDropdownOpen: false,
      userName: "",
    };
  },
  beforeMount() {
    try {
      axios
        .get("http://localhost:5000/user/get-name", {
          withCredentials: true,
        })
        .then((response) => {
          const userName = response.data.name;
          // Update the user's name in your component's data
          // For example, you can set it to a data property called 'userName'
          this.userName = userName;
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.log(error);
    }
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
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    signOut() {
      // Handle sign-out logic here
      console.log("User signed out!");
      // You might want to redirect to the sign-out page or perform any other necessary actions
      try {
        axios
          .post(
            "http://localhost:5000/user/signout",
            // loginData
            {},
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.data.message === "Signed out successfully!") {
              console.log(response.data);
              router.push("/login");
            } else {
              console.log(response.data);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });

        // console.log(response.data, "login data");
        // if (response.data.message === "Signed in successfully!") {
        //   router.push("/");
        // }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
