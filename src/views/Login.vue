<template>
  <div
    class="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="/img/logo.png"
          alt="Logo SEB Server"
        />
        <h1
          ref="focusTarget"
          class="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Sign in
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Please fill the form to sign in to your SEB server account.
        </p>
      </div>

      <alert
        v-if="loginError"
        title="Login failed"
        message="Please provide a correct pair of user name and password."
      ></alert>

      <form
        class="mt-8 space-y-6"
        action="#"
        method="POST"
        @submit.prevent="handleFormSubmit"
      >
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="user-name" class="sr-only">UserName</label>
            <input
              id="user-name"
              v-model="userName"
              name="user-name"
              type="text"
              autocomplete="off"
              required
              class="login__input rounded-t-md"
              placeholder="User Name"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="off"
              required
              class="login__input rounded-b-md"
              placeholder="Password"
            />
          </div>
        </div>

        <button type="submit" class="login__submit">
          <span
            class="absolute left-0 inset-y-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <LockClosedIcon
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            />
          </span>
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/composables/useAuth";
import Alert from "@/components/misc/Alert";
import { LockClosedIcon } from "@heroicons/vue/solid";

export default {
  name: "Login",
  components: { Alert, LockClosedIcon },
  setup() {
    const { isAuthenticated, authenticateUser } = useAuth();

    return {
      isAuthenticated,
      authenticateUser,
    };
  },

  data() {
    return {
      userName: undefined,
      password: undefined,
      loginError: false,
    };
  },

  methods: {
    async handleFormSubmit() {
      try {
        await this.authenticateUser(this.userName, this.password);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.loginError = true;
      }
    },
  },
};
</script>

<style lang="scss">
.login__input {
  @apply appearance-none;
  @apply rounded-none;
  @apply relative;
  @apply block;
  @apply w-full;
  @apply px-3;
  @apply py-2;
  @apply border border-gray-300;
  @apply placeholder-gray-500;
  @apply text-gray-900;
  @apply focus:outline-none;
  @apply focus:ring-indigo-500;
  @apply focus:border-indigo-500;
  @apply focus:z-10;
  @apply sm:text-sm;
}

.login__submit {
  @apply group;
  @apply relative;
  @apply w-full;
  @apply flex;
  @apply justify-center;
  @apply py-2;
  @apply px-4;
  @apply border border-transparent;
  @apply text-sm;
  @apply font-medium;
  @apply rounded-md;
  @apply text-white;
  @apply bg-indigo-600;
  @apply hover:bg-indigo-700;
  @apply focus:outline-none;
  @apply focus:ring-2;
  @apply focus:ring-offset-2;
  @apply focus:ring-indigo-500;
}
</style>
