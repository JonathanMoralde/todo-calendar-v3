<template>
  <main class="min-h-screen flex justify-center items-center transition-all">
    <!-- signin signup -->
    <div
      class="bg-white bg-opacity-15 shadow rounded p-4 w-3/4 md:w-1/2 lg:w-1/4 z-10 flex flex-col items-center justify-center h-96 transition-all"
      :class="{
        'h-[30rem]': this.isRegister === true && this.isLogin === false,
      }"
    >
      <!-- Logo -->

      <!-- Welcome -->
      <h1 class="mb-10 tracking-wide">Welcome to To-do Calendar V3!</h1>

      <!-- Sign in -->

      <div class="mb-10 flex">
        <transition name="slide-fade">
          <!-- Sign in Form -->
          <form v-if="isLogin">
            <!-- Email -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>

            <!-- Pass -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>

            <button
              class="bg-violet-500 bg-opacity-40 w-full py-2 tracking-wide rounded shadow-inner shadow-violet-500/35 hover:shadow-violet-500 transition-all"
            >
              Sign In
            </button>
          </form>
        </transition>

        <transition name="slide-fade">
          <!-- sign up form -->
          <form v-if="isRegister">
            <!-- First name -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide"
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
              />
            </div>
            <!-- lname -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide"
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
              />
            </div>
            <!-- Email -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>

            <!-- Pass -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>

            <button
              class="bg-violet-500 bg-opacity-40 w-full py-2 tracking-wide rounded shadow-inner shadow-violet-500/35 hover:shadow-violet-500 transition-all"
            >
              Sign In
            </button>
          </form>
        </transition>
      </div>

      <transition name="fade">
        <p v-show="isLogin" class="tracking-wide">
          Don't have an account yet?
          <span
            @click="displayRegister"
            class="underline font-semibold cursor-pointer"
            >Sign up</span
          >
        </p>
      </transition>
      <transition name="fade">
        <p v-show="isRegister" class="tracking-wide">
          Already have an account?
          <span
            @click="displayLogin"
            class="underline font-semibold cursor-pointer"
            >Sign in</span
          >
        </p>
      </transition>
    </div>
    <!-- background blur -->
    <div
      class="h-96 w-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] blur"
    ></div>
    <div
      class="h-96 w-96 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full absolute top-1/4 left-1/4 translate-x-[-25%] translate-y-[-25%] blur"
    ></div>
    <div
      class="h-96 w-96 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full absolute top-full left-3/4 translate-x-[-100%] translate-y-[-75%] blur"
    ></div>
  </main>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      isRegister: false,
      isLogin: true,
    };
  },
  methods: {
    displayRegister() {
      this.isLogin = false;
      setTimeout(() => {
        this.isRegister = true;
      }, 300);
    },
    displayLogin() {
      this.isRegister = false;
      setTimeout(() => {
        this.isLogin = true;
      }, 300);
    },
  },
};
</script>

<style scoped>
.blur {
  filter: blur(120px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  /* transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
