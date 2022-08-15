<template>
    <div class="postContainer">
    
        <form  @submit.prevent="post" enctype="multipart/form-data">
            <div class="postContainer_post">
    
                <div class="postContainer_post_top">
                    <img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="profilPicture">
                    <p>{{$store.state.users.userName}}</p>
                </div>
    
                <textarea class="postContainer_post_inputText"  type="text" v-model="postText"></textarea>
          <!--
                <div class="postContainer_post_bottomInput">
                    <p>Add a picture url : </p> <input v-model="postUrl" type="text" class="postContainer_post_inputUrl">
                </div> -->

                      <label>Charger une image : 
                    <input type="file" ref="file" @change="handleFileUpload()"/>
            </label>
    
                <button @click="clearInputs" type="submit"> E n v o y e r</button>
            </div>
        </form>
    
    </div>
</template>

<script>
import { v4 as uuid } from "@lukeed/uuid";
import { mapState } from "vuex";

export default {
  data() {
    return {
      postText: "",
      postUrl: "",
      file: "",
    };
  },

  computed: {
    ...mapState({
      userID: (state) => state.users.userID,
      userName: (state) => state.users.userName,
      postOwner: (state) => state.users.postOwner,
    }),
  },

  methods: {
    async post() {
      const { postText, postUrl } = this;
      let postId = uuid();
      let userId = this.userID;
      let userName = this.userName;
      let post = {
        userId: userId,
        postId: postId,
        userName: userName,
        postUrl: postUrl,
        postText: postText,
        imageName: this.file.name,
      };

      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("userId", post.userId);
      formData.append("postId", post.postId);
      formData.append("userName", post.userName);
      formData.append("postUrl", post.postUrl);
      formData.append("postText", post.postText);
      formData.append("imageName", post.imageName);

      const res = await fetch("http://localhost:3080/api/post", {
        method: "POST",
        body: formData,
      });

      this.postOwner.push(post.postId);
      alert("Post Créer");
      this.forceRerender();
      this.postText = "";
      this.postUrl = "";
    },

    forceRerender() {
      this.$parent.forceRerender();
    },

    handleFileUpload() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
  },
};
</script>

<style lang="scss" scoped>
.postContainer {
  color: white;
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -12px;
  &_post {
    border-radius: 10px;
    background-color: #242526;
    height: 470px;
    width: 700px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 160px;
    box-shadow: 0 1px 18px -1px #4e5166;
    margin-top: -120px;
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
      height: 200px;
      width: 80%;
      margin-top: 10px;
      border-radius: 10px;
      display: flex;
      align-items: flex-start;
      resize: none;
      background-color: #4e5166;
      border: none;
      border-radius: 10px;
      border: 0;
      outline: 0;
      box-shadow: 0 0 10px #4e5166;
      padding: 15px;
      &:focus {
        outline: none !important;
      }
    }
    &_bottomInput {
      width: 100%;
      display: flex;
    }
    &_inputUrl {
      width: 340px;
      margin-left: 20px;
      background-color: #4e5166;
      border: none;
      border-radius: 10px;
      box-shadow: 0 0 10px #4e5166;
      &:focus {
        border: red;
      }
    }
  }
}

input {
  border: 0;
  outline: 0;
}
input:focus {
  outline: none !important;
}
img {
  width: 60px;
  border-radius: 50%;
}

button {
  width: 100px;
  font-family: "Lato";
  height: 53px;
  border: none;
  background-image: linear-gradient(
    to right top,
    #e9e9e9,
    #e2ebf3,
    #d2f0f4,
    #cef4e3,
    #e4f1c9
  );
  box-shadow: 0 0 10px #4e5166;
  color: #4e5166;
  margin-bottom: -22px;
  transition: width 1.2s;
  text-shadow: 0 0 7px #4e5166;
  border-radius: 10px;
  margin-bottom: 8px;
  &:hover {
    color: white;
  }
}
</style>