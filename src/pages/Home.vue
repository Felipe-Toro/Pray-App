<template>
  
</template>

<script>
export default {
    name:"Home",

preFetch({ store, redirect }) {
    store.state.$firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        redirect("/");
      }
    });
  },

}
</script>

<style>

</style>