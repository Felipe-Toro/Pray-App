<template>
  <div>
        <q-list separator>
      <q-item v-for="(prayer, prayerIndex) of myPrayers" :key="prayerIndex">
                <q-item-section>
          <q-item-label>{{prayer.title}}</q-item-label>
          <q-item-label caption>{{prayer.description}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      dia: '',
      prayers: [
        {
          title: "perna do vô",
          people: ["vô"],
          tags: ["saúde", "família"],
          desc: "bla bla",
        },
        {
          title: "Prova do Andreas",
          people: ["andreas"],
          tags: ["faculdade", "amigos"],
          desc: "bla bla"
        },
        {
          title: "gripe do andreas",
          people: ["andreas"],
          tags: ["saúde", "amigos"],
          desc: "bla bla"
        },
        {
          title: "casamento do vô",
          people: ["vô"],
          tags: ["relacionamento", "família"],
          desc: "bla bla",
          done: true
        }
      ]
    };
  },

  computed: {
    healthPrayers: function() {
      let array = [];
      for (let prayer of this.prayers) {
        if (prayer.tags.indexOf("saúde") !== -1) {
          array.push(prayer);
        }
      }
      return array;
    },
    andreasPrayers: function() {
      let array = [];
      for (let prayer of this.prayers) {
        if (prayer.people.indexOf("andreas") !== -1) {
          array.push(prayer);
        }
      }
      return array
    },
    notdonePrayers: function() {
      let array = [];
      for (let prayer of this.prayers) {
        if (prayer.done === true) {
         array.push(prayer);
        }
      }
      return array
    },

    myPrayers: function(){
      console.log(this.$store.state.app.prayers)
      return this.$store.state.app.prayers
    }
    
  },

  preFetch({ store, redirect }) {
    store.state.$firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        redirect("/");
      }
    });
  },

  mounted() {
    
  }
};
</script>

<style>
</style>