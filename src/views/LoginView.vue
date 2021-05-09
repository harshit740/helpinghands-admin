<template class="scrollbar-hidden">
  <v-card
      :loading="isLoading"
      :disabled="isLoading"
      width="500"
      outlined
      height="100%">
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>
    <v-layout justify-center>
      <v-card-title>Login</v-card-title>
    </v-layout>
    <v-form
        style="padding: 10px"
        ref="form"
        lazy-validation
        :disabled="isLoading"
    >
      <v-text-field
          v-model="credentials.username"
          type="username"
          label="Username/Email"
          required
      ></v-text-field>

      <v-text-field
          label="Password"
          type="password"
          v-model="credentials.password"
          required
      ></v-text-field>
      <v-card-text v-if="error" class="error--text">
        {{ massage }}
      </v-card-text>
    </v-form>
    <v-card-actions>
      <v-btn color=" lighten-2" @click="login" text>Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "@/router";
import {host} from '@/config'

export default {

  name: "Login",
  created() {
    localStorage.removeItem("Auth")
  },
  data: () => {
    return {
      isLoading: false,
      credentials: {
        username: "",
        password: ""
      },
      error: false,
      massage: "",
    }
  },
  methods: {
    async login() {
      if (this.credentials.username !== "" && this.credentials.username !== "") {
        this.isLoading = true;
        this.error = false
        let token = (await this.$axios.post(host + "/users/login", this.credentials)).data
        if (token['code'] === 200) {
          await localStorage.setItem('Auth', JSON.stringify(token['data']))
          this.isLoading = false
          await router.push({path: '/'})
        } else {
          this.massage = token['Status']
          this.error = true
          this.isLoading = false
        }
      }
    }
  }
}
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
</style>