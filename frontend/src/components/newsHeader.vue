

<template>
    <header>
    
        <img  class="logoo" src="../../images/icon-left-font-monochrome-black.svg" alt="">
    
        <div class="Header_iconsContainer">

            <svg @click="home" mlns="http://www.w3.org/2000/svg" width="60px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>

             <svg  xmlns="http://www.w3.org/2000/svg" width="60px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        <svg v-on:click="disconnect" xmlns="http://www.w3.org/2000/svg" width="60px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>

        </div>

    
        <div class="user_containerHeader">
            <p class="userName">{{$store.state.users.userName}}</p>
            <img class="img_profil" src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="profilPicture">
        </div>
    
    </header>
</template>

<script>

import { mapState } from "vuex";

export default {

     computed: {
    ...mapState({
      userID: (state) => state.users.userID,
      userName: (state) => state.users.userName
    })},

    methods: {
      disconnect() {
        this.$store.commit("SET_USER_ID", '');
        this.$store.commit("SET_USER_NAME", '');
        this.$router.push({ path: "/" });
      },
      home() {
        this.$router.push({ path: "/news" });
      }
    }
  }


</script>

<style lang="scss" scoped>
$base-color: #4e5166;
header {
  width: 100%;
  height: 100px;
  background: rgba(250, 245, 245, 1);
  box-shadow: 0 5px 7px -2px $base-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  opacity: 0.8;
  z-index: 100;
}

.logoo {
  width: 200px;
  margin-left: 30px;
}

.userName {
  margin-right: 30px;
}

.img_profil {
  width: 60px;
  border-radius: 50%;
}

.Header_iconsContainer {
  height: 100%;
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user_containerHeader {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.h-6 {
width: 35px;
&:hover{
  color:red;
}
@media screen and (max-width: 768px) {
    width: 35px;
    margin-left: 20px;
  }
}
</style>