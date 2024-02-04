<template>
  <main class="h-screen flex justify-center items-center">
    <!-- signin signup -->
    <div
      class="bg-white bg-opacity-15 shadow rounded p-4 w-3/4 md:w-1/2 lg:w-1/4 z-10 flex flex-col items-center justify-center h-[32rem] transition-all"
      :class="{
        'h-[40rem]': this.isRegister === true && this.isLogin === false,
      }"
    >
      <!-- Logo -->
      <div class="w-40 h-40 shadow rounded-full mb-4">
        <img
          class="w-full h-full"
          src="../assets/TC.png"
          alt="To-do calendar logo"
        />
      </div>

      <!-- Welcome -->
      <h1 class="mb-10 tracking-wide font-semibold text-lg">
        Welcome to To-do Calendar V3!
      </h1>

      <!-- Sign in -->

      <div class="mb-10 flex">
        <transition name="slide-fade">
          <!-- Sign in Form -->
          <form v-if="isLogin">
            <!-- Email -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                v-model="login_email"
              />
            </div>

            <!-- Pass -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                v-model="login_pass"
              />
            </div>

            <button
              class="bg-violet-500 bg-opacity-40 w-full py-2 tracking-wide rounded shadow-inner shadow-violet-500/35 hover:shadow-violet-500 transition-all"
              @click.prevent="authenticate('login')"
            >
              Sign In
            </button>
          </form>
        </transition>

        <transition name="slide-fade">
          <!--! sign up form -->
          <form v-if="isRegister">
            <!-- First name -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
                v-model="fname"
              />
            </div>
            <!-- lname -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
                v-model="lname"
              />
            </div>
            <!-- Email -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                v-model="reg_email"
              />
            </div>

            <!-- Pass -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                v-model="reg_pass"
              />
            </div>
            <!-- Confirm Pass -->
            <div class="w-full mb-4">
              <input
                class="bg-violet-500 placeholder-black h-4 w-full p-4 rounded bg-opacity-10 shadow-inner shadow-violet-500/35 tracking-wide focus:outline-0"
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm password"
                v-model="reg_cpass"
              />
            </div>

            <button
              class="bg-violet-500 bg-opacity-40 w-full py-2 tracking-wide rounded shadow-inner shadow-violet-500/35 hover:shadow-violet-500 transition-all"
              @click.prevent="authenticate('register')"
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
      class="h-80 md:h-96 w-80 md:w-[30rem] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] blur"
    ></div>
    <div
      class="h-72 md:h-80 lg:h-96 w-72 md:w-80 lg:w-96 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full absolute top-1/4 left-1/4 translate-x-[-25%] translate-y-[-25%] blur"
    ></div>
    <div
      class="h-64 md:h-72 lg:h-80 w-64 md:w-72 lg:w-80 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full absolute top-full left-3/4 translate-x-[-100%] translate-y-[-75%] blur"
    ></div>
    <div
      class="h-[30rem] w-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full absolute top-[-10%] right-[-10%] translate-x-0 translate-y-0 blur hidden lg:block"
    ></div>
    <div
      class="h-96 w-96 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full absolute bottom-[-30%] left-[0%] translate-x-0%] translate-y-[30%] blur hidden lg:block"
    ></div>
  </main>
</template>

<script>
import router from "@/router/router";
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      isRegister: false,
      isLogin: true,
      login_email: "",
      login_pass: "",
      fname: "",
      lname: "",
      reg_email: "",
      reg_pass: "",
      reg_cpass: "",
    };
  },
  mounted() {
    // Add overflow-hidden to the body when the component is mounted
    document.body.style.overflow = "hidden";
  },
  beforeUnmount() {
    // Remove overflow-hidden from the body before the component is destroyed
    document.body.style.overflow = "";
  },
  methods: {
    displayRegister() {
      this.isLogin = false;
      setTimeout(() => {
        this.isRegister = true;
        this.login_email = "";
        this.login_pass = "";
      }, 300);
    },
    displayLogin() {
      this.isRegister = false;
      setTimeout(() => {
        this.isLogin = true;
        this.fname = "";
        this.lname = "";
        this.reg_email = "";
        this.reg_pass = "";
        this.reg_cpass = "";
      }, 300);
    },
    authenticate(type) {
      if (type === "login") {
        // sign in
        console.log(this.login_email, this.login_pass);
        if (this.login_email === "" && this.login_pass === "") {
          return;
        } else {
          // let loginData = new FormData();
          // loginData.append("email", this.login_email);
          // loginData.append("password", this.login_pass);

          // console.log("form data", loginData);

          try {
            axios
              .post(
                "http://localhost:5000/user/signin",
                // loginData
                {
                  email: this.login_email,
                  password: this.login_pass,
                },
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              )
              .then((response) => {
                if (response.data.message === "Signed in successfully!") {
                  console.log(response.data);
                  router.push("/");
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
        }
      } else {
        // sign up
        console.log(
          this.fname,
          this.lname,
          this.reg_email,
          this.reg_pass,
          this.reg_cpass
        );

        if (
          this.fname === "" &&
          this.lname === "" &&
          this.reg_email === "" &&
          this.reg_pass === "" &&
          this.reg_cpass === ""
        ) {
          return;
        } else {
          if (this.reg_pass !== this.reg_cpass) {
            alert("password does not match");
          } else {
            let regData = new FormData();
            regData.append("fName", this.fname);
            regData.append("lName", this.lname);
            regData.append("email", this.reg_email);
            regData.append("pasword", this.reg_pass);

            try {
              const response = axios.post(
                "http://localhost:5000/user/signup",
                regData
              );

              console.log(response.data, "reg data");
              if (response.data.message) {
                this.displayLogin();
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
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
