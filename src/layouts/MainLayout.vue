<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-grey-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="title-font">
          <b>Pray</b>App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1 column">
      <div class="col"></div>
      <div class="col-auto">
        <q-separator />
        <q-item clickable @click="signOut">
          <q-item-section side>
            <q-icon name="mdi-exit-to-app" color="grey-7" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="showNewPrayerDialog=true" />
      </q-page-sticky>
    </q-page-container>

    <q-dialog v-model="showNewPrayerDialog" full-height full-width>
      <q-card>
        <q-toolbar class="text-grey-9">
          <q-btn flat round dense icon="mdi-chevron-left" v-close-popup />
          <q-toolbar-title>Novo pedido</q-toolbar-title>
        </q-toolbar>
        <q-form @submit="newPrayer">
          <q-card-section class="q-gutter-y-md">
            <q-input
              v-model="newPrayerTitle"
              type="text"
              label="Título"
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório']"
              filled
              dense
              hide-bottom-space
            />
            <q-input
              v-model="newPrayerDescription"
              type="textarea"
              label="Descrição"
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório']"
              filled
              dense
              hide-bottom-space
            />
            <q-select
              v-model="newPrayerDay"
              :options="weekDays"
              label="Dia da Semana"
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório']"
              filled
              dense
              hide-bottom-space
            />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md">
            <q-btn label="Criar" type="submit" color="primary" class="q-px-md" unelevated />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false,
      showNewPrayerDialog: false,
      newPrayerTitle: "",
      newPrayerTags: [],
      newPrayerPeople: [],
      newPrayerDescription: "",
      newPrayerDay: "",
      weekDays: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sabado"
      ]
    };
  },

  methods: {
    newPrayer() {
      let user = this.$store.state.$firebase.auth().currentUser;
      if (!user) return;
      // Add a new document with a generated id.
      let data = {
          user: user.uid,
          title: this.newPrayerTitle,
          tags: this.newPrayerTags,
          people: this.newPrayerPeople,
          description: this.newPrayerDescription,
          done: false,
          day: this.newPrayerDay
        }
            this.$store.state.$db
        .collection("prayers")
        .add(data)
        .then(docRef => {
          console.log("Document written with ID: ", docRef);
          this.newPrayerTitle = "";
          this.newPrayerTags = [];
          this.newPrayerPeople = [];
          this.newPrayerDescription = "";

          this.newPrayerDay = "";
          this.showNewPrayerDialog = false;
          this.$store.dispatch('app/addPrayer', {id:docRef.id, ...data} )
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },

    signOut() {
      this.$store.state.$firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>
