<script>
import { mapState } from "vuex";
export default {
    
computed: {
    ...mapState({
      userID: (state) => state.users.userID,
      userName: (state) => state.users.userName
    }),
  },
updated() {
    if (userName.length < 1) {
        alert('OULALA')
    }
},
  
 mounted () {
    if (this.$store.state.users.userName = ""){
        this.$router.push({ path: "/news" });
    }
 }
}
</script>

<template>
    <router-view>
    </router-view>
</template>

<style>
#app {
    width: 100%;
    height: 100%;
    font-family: 'Lato';
}
body {
    margin:0;
}
</style>