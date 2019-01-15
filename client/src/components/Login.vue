<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="E-mail" v-model="email" v-bind:rules="emailRules" required></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    v-bind:rules="passwordRules"
                    v-bind:type="'password'"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="cancel">Cancel</v-btn>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-snackbar :timeout="6000" :top="true" v-model="showAlert">
          {{ loginError }}
          <v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      showAlert: false,
      message: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      password: '',
      passwordRules: [v => !!v || 'Password is required']
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    loginError () {
      return this.$store.getters.loginError
    }
  },
  methods: {
    login: function () {
      const vm = this
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('logInUser', payload).then(() => {
        if (vm.isLoggedIn) {
          this.$router.push({ path: '/' })
        } else {
          vm.showAlert = true
        }
      })
    },
    cancel: function () {
      console.log('The user does not want to login!')
    }
  }
}
</script>

<style>
</style>
