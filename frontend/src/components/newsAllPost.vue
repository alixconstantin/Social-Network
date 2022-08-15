<template>
    <div class="containerAllPosts">
          <div v-for="item in posts.slice().reverse()" :key="item.id">

                  <div class="post">
                <div class="post_top">

                  <div class="post_top_left">
                    <img class="post_top_picture" src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="profilPicture">
                    <p>{{item.userName}}</p>
                  </div>  
                  <div v-if="isAdmin || this.postOwner.includes(item.postId)" class="post_top_right"> 
                    <button @click="Modifications(item.postId)" class="post_top_right_modify">Modifier</button>
                    <button @click=deletePost(item.postId) class="post_top_right_delete">Supprimer</button>
                    
                  </div>

                </div>
                <div class="post_text">{{item.postText}}</div>

                <!-- <div :style="'background-image: url(' + item.postUrl + ')'" class="post_picture"></div>-->
                <img :src="item.imageUrl" alt="" class="post_picture">

                <div class="post_bottom">

                  <div class="post_bottom_info">
                    <img src="../../images/icons8-like-25.png" alt="like_icon"> 
                    <div class="post_bottom_info_likeNumber">{{showLike(item.likes)}}</div>
                  </div>
                  <div class="post_bottom_options">


                    <div class="post_bottom_options_like" @click="likePost(userID, item.postId)"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>J ' a i m e</div>
                    <div class="post_bottom_options_comment"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>C o m m e n t e r</div>


                  </div>
                </div>

            </div>

          </div>
          

    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.fetchAllPosts();
  },
  computed: {
    ...mapState({
      newPost: (state) => state.users.newPost,
      isAdmin: (state) => state.users.isAdmin,
      postOwner: (state) => state.users.postOwner,
      userID: (state) => state.users.userID,
    }),
  },

  methods: {
    fetchAllPosts() {
      fetch("http://localhost:3080/api/post/")
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json();
          }
        })
        .then((data) => {
          this.posts = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(postId) {
      fetch(`http://localhost:3080/api/post/delete/${postId}`, {
        method: "DELETE",
      })
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json();
          }
        })
        .then(() => {
          this.forceRerender();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    forceRerender() {
      this.$parent.forceRerender();
    },
    Modifications(postId) {
      this.$router.push({ path: `/news/${postId}` });
    },
    textExist(text) {
      if (text.length == 0) {
        return false;
      }
    },
    likePost(userID, postID) {
      fetch(`http://localhost:3080/api/post/like/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          postID,
        }),
      })
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json();
          }
        })
        .then((data) => {
          console.log(data);
          this.forceRerender();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showLike(test) {
      let allLikes = [...new Set(test)];
      return allLikes.length;
    },
  },
};
</script>

<style lang="scss" scoped="true">
.containerAllPosts {
  width: 65%;
  height: auto;
}

.post {
  width: 100%;
  background-color: #242526;
  border-radius: 10px;
  box-shadow: 0 1px 18px -1px #4e5166;
  margin-top: 85px;
  &_top {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &_right {
      button {
        margin-right: 25px;
        border: none;
        height: 35px;
        width: 100px;
        box-shadow: 0 0 10px #4e5166;
        border-radius: 10px;
        font-weight: bold;
      }
      &_modify {
        background-image: linear-gradient(
          to right top,
          #fdff66,
          #faea50,
          #f6d43b,
          #f1bf27,
          #eba912
        );
        &:hover {
          color: whitesmoke;
          box-shadow: 0 0 10px #4e5166;
        }
      }
      &_delete {
        background-image: linear-gradient(
          to right top,
          #ff6671,
          #ff575c,
          #ff4945,
          #ff3a2b,
          #fd2d01
        );
        &:hover {
          color: whitesmoke;
          box-shadow: 0 0 10px #4e5166;
        }
      }
    }
    p {
      margin-left: 20px;
      color: white;
    }
    &_picture {
      width: 60px;
      border-radius: 50%;
      margin-left: 20px;
    }
  }
  &_text {
    width: 95%;
    margin-left: 20px;
    color: white;
  }
  &_picture {
    width: 100%;
    max-height: 450px;
    object-fit: cover;
    background-size: cover;
    margin-top: 15px;
  
  }
  &_bottom {
    width: 100%;
    height: 100px;
    &_info {
      width: 100%;
      height: 35%;
      display: flex;
      img {
        margin-left: 1.5%;
        margin-top: 10px;
      }
      &_likeNumber {
        color: white;
        font-weight: bold;
        margin-left: 10px;
        margin-top: 13px;
      }
    }
    &_options {
      width: 100%;
      height: 53px;
      border-top: 1px solid #4e5166;
      margin-top: 10px;
      display: flex;
      &_like {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-right: 1px solid #4e5166;
        &:hover {
          background-color: #4e5166;
          text-shadow: 0 0 7px #fd2d01;
          border-radius: 0 0 0 10px;
        }
      }
      &_comment {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        &:hover {
          background-color: #4e5166;
          text-shadow: 0 0 7px #fd2d01;
          border-radius: 0 0 10px 0;
        }
      }
    }
  }
}
.h-6 {
  width: 20px;
  margin-right: 15px;
}
</style>

