<template>
    <newsHeader/>
    <div class="Container_updatePost">

            <div class="postContainer">
    
        <form  @submit.prevent="postModification">
            <div class="postContainer_post">
    
                <div class="postContainer_post_top">
                    <img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="profilPicture">
                    <p>{{$store.state.users.userName}}</p>
                </div>
    
                <textarea class="postContainer_post_inputText" type="text" v-model="postText"></textarea>
    
                <div class="postContainer_post_bottomInput">
                    <label>Charger une image : 
                    <input type="file" ref="file" @change="handleFileUpload()"/>
                  </label>  
                </div>
                <div class="buttonsContainer">
                <button  type="submit"> S a u v e g a r d e r</button>
                <button @click="backHome" class="back"> R e t o u r</button>
                </div>
            </div>
        </form>
    
    </div>


    </div>
    
    
    <div class="page-bg"></div>
    

</template>

<script>
import newsHeader from "../components/newsHeader.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    backHome() {
        this.$router.push({ path: '/news'})
    },
    async postModification() {
        var baseUrl = (window.location).href;
        var postId = baseUrl.substring(baseUrl.lastIndexOf('/') + 1);
        const { postText, postUrl } = this;
        let userId = this.userID;
        let userName = this.userName;

         let post = {
        userId: userId,
        postId: postId,
        userName: userName,
        postUrl: postUrl,
        postText: postText,
      };

      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('userId', post.userId);
      formData.append('postId', post.postId);
      formData.append('userName', post.userName);
      formData.append('postUrl', post.postUrl);
      formData.append('postText', post.postText);


      const res = await fetch("http://localhost:3080/api/post/" + postId, {
        method: "PUT",
        body: 
          formData
       ,
      });
      this.$router.push({ path: "/news" });
    },
     handleFileUpload(){
     const file = this.$refs.file.files[0];
     this.file = file;
     console.log(this.file)
}
  },

  components: {
    newsHeader,
  },
  mounted() {
    if (this.userName == "" || this.userName == "unknow") {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState({
      userID: (state) => state.users.userID,
      userName: (state) => state.users.userName,
      userMail: (state) => state.users.userMail,
    }),
  },
};
</script>

<style lang="scss" scoped>

//////
.Container_updatePost {
  width: 90%;
  background-color: #18191a;
  margin-left: 5%;
  border-radius: 10px;
  margin-top: 10%;
  opacity: 0.99;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 18px -1px #4e5166;
  height: 65vh;
}
////////////////////////////////////////////////////////////////
.back{
    background-image: linear-gradient(to right top, #e9e9e9, #e2ebf3, #d2f0f4, #cef4e3, #e4f1c9);
    margin-left:20px;
}
.postContainer {
  color: white;
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  &_post {
    border-radius: 10px;
    background-color: #242526;
    height: 470px;
    width: 700px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: 0 1px 18px -1px #4e5166;
    @media screen and (max-width: 1060px) {
      width: 600px;
    }
    @media screen and (max-width: 760px) {
      width: 450px;
    }
    @media screen and (max-width: 560px) {
      width: 350px;
    }
    @media screen and (max-width: 360px) {
      width: 250px;
    }
    &_top {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      p {
        margin-left: 19px;
      }
    }
    &_inputText {
      padding:15px;
      height: 200px;
      width: 80%;
      margin-top: 10px;
      border-radius: 10px;
      display: flex;
      align-items: flex-start;
      box-shadow: 0 0 10px #4e5166;
      resize: none;
      background-color: #4e5166;
      border: none;
      border-radius: 10px;
      border:0;outline:0;
      &:focus{
        outline:none!important;
      }
    }
    &_bottomInput {
      width: 100%;
      display: flex;
    }
    &_inputUrl {
      width: 300px;
      margin-left: 20px;
      resize: none;
      background-color: #4e5166;
      border: none;
      border-radius: 10px;
      border:0;outline:0;
      box-shadow: 0 0 10px #4e5166;
      &:focus{
        outline:none!important;
      }
    }
  }
}

img {
  width: 60px;
  border-radius: 50%;
}

button {
  width: 120px;
  font-family: "Lato";
  height: 53px;
  border: none;
  background-image: linear-gradient(to right top, #0c8731, #38a031, #5bb92d, #80d225, #a8eb12);
  box-shadow: 0 0 10px #4e5166;
  color: #4e5166;
  margin-bottom: -22px;
  transition: width 1.2s;
  text-shadow: 0 0 7px #4e5166;
  border-radius: 10px;
  margin-bottom: 8px;
  &:hover{
    color:white
  }
}




// Particles Styles
$color-bg: #111;
$color-particle: #fff;
$spacing: 2560px;
$time-1: 60s;
$time-2: 120s;
$time-3: 180s;
$time-4: 600s;
@function particles($max) {
  $val: 0px 0px $color-particle;
  @for $i from 1 through $max {
    $val: #{$val}, random($spacing) + px random($spacing) + px $color-particle;
  }
  @return $val;
}

@mixin particles($max) {
  box-shadow: particles($max);
}

.page-bg,
.animation-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.page-bg {
  background: $color-bg url("../images/pexels-stephan-seeber-1668246.jpg");
  background-size: cover;
  z-index: -1;
  box-shadow: 0 5px 7px -2px #4e5166;
}

.particle,
.particle:after {
  background: transparent;
}

.particle:after {
  position: absolute;
  content: "";
  top: $spacing;
}

.particle-1 {
  animation: animParticle $time-1 linear infinite;
  @include particles(600);
  height: 1px;
  width: 1px;
}

.particle-1:after {
  @include particles(600);
  height: 1px;
  width: 1px;
}

.particle-2 {
  animation: animParticle $time-2 linear infinite;
  @include particles(200);
  height: 2px;
  width: 2px;
}

.particle-2:after {
  @include particles(200);
  height: 2px;
  width: 2px;
}

.particle-3 {
  animation: animParticle $time-3 linear infinite;
  @include particles(100);
  height: 3px;
  width: 3px;
}

.particle-3:after {
  @include particles(100);
  height: 3px;
  width: 3px;
}

.particle-4 {
  animation: animParticle $time-4 linear infinite;
  @include particles(400);
  height: 1px;
  width: 1px;
}

.particle-4:after {
  @include particles(400);
  height: 1px;
  width: 1px;
}

@keyframes animParticle {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY($spacing * -1);
  }
}
</style>