<template>
  <div class="fullscreen flex flex-center">
    <div class="full-width q-pa-lg text-center q-gutter-y-md">
      <div class="title-font" style="font-size:42px">
        <b>Pray</b>App
      </div>
      <q-input
        id="prayApp-email"
        v-model="email"
        type="email"
        dense
        label="Email"
        style="max-width:300px; width:80%; margin:16px auto;"
      />
      <q-input
        id="prayApp-password"
        v-model="password"
        type="password"
        dense
        label="Senha"
        style="max-width:300px; width:80%; margin:16px auto;"
      />
      <div>
        <q-btn color="primary" label="Entrar" @click="signIn" style="max-width:175px; width:50%;" />
      </div>
      <div class="text-primary text-bold" @click="showCreateAccountDialog=true">Criar uma nova conta</div>
    </div>
    <q-dialog v-model="showCreateAccountDialog">
      <q-card style="min-width:260px;">
        <q-form @submit="createUser">
          <q-card-section>
            <q-input
              id="prayApp-register-email"
              v-model="registerEmail"
              type="email"
              label="Email"
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório']"
            />
            <q-input
              id="prayApp-register-password"
              v-model="registerPassword"
              type="password"
              label="Senha"
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório',val => val.length > 5 || 'A senha precisa ter no mínimo 6 caracteres']"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Criar" color="primary" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "Landing",

  preFetch({ store, redirect }) {
    store.state.$firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        redirect("/home");
      }
    });
  },

  data() {
    return {
      email: "",
      password: "",
      showCreateAccountDialog: false,
      registerEmail: "",
      registerPassword: ""
    };
  },

  methods: {
    createUser() {
      this.$store.state.$firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.registerEmail,
          this.registerPassword
        )
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(error);
          // ...
        });
    },

    signIn() {
      this.$store.state.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  }
};
</script>

<style>
</style>