<template>
    <div class="containerAllPosts">

            <div class="post">
                <div class="post_top">
                    <img class="post_top_picture" src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="profilPicture">
                    <p>{{$store.state.users.userName}}</p>
                </div>
                <div class="post_text">Hello my name is Clara</div>
                <div class="post_picture"></div>
                <div class="post_bottom">

                  <div class="post_bottom_info">
                    <img src="../../images/icon-like.png" alt=""> 
                    <div class="post_bottom_info_likeNumber">0</div>
                  </div>
                  <div class="post_bottom_options">


                    <div class="post_bottom_options_like"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>J ' a i m e</div>
                    <div class="post_bottom_options_comment"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>C o m m e n t e r</div>


                  </div>
                </div>

            </div>

    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.containerAllPosts {
  width: 65%;
  // background-color: palegreen;
  margin-top: 150px;
  height: auto;
}

.post {
  width: 100%;
  background-color: #242526;
  border-radius: 10px;
  box-shadow: 0 1px 18px -1px #4e5166;
  margin-top:85px;
  &_top {
    width: 100%;
    height: 100px;
    // background-color: beige;
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    // background-color: burlywood;
  }
  &_picture {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png");
    width: 100%;
    height: 500px;
    background-size: cover;
    margin-top: 15px;
  }
  &_bottom {
    width: 100%;
    height: 100px;
    // background-color: burlywood;
    &_info {
      width: 100%;
      height: 35%;
      display: flex;
      img {
        margin-left: 2.5%;
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
     // background-color: red;
      width: 95%;
      height: 53px;
      margin-left: 2.5%;
      border-top: 1px solid white;
      margin-top: 10px;
      display: flex;
      &_like {
        //background-color: plum;
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-right:1px solid white;
        &:hover {
          background-color: #4e5166;
          text-shadow: 0 0 7px #fd2d01;
        }
      }
      &_comment {
        //background-color: peru;
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        &:hover {
          background-color: #4e5166;
          text-shadow: 0 0 7px #fd2d01;
        }
      }
    }
  }
}
.h-6{
  width:20px;
  margin-right:15px;
}
</style>

