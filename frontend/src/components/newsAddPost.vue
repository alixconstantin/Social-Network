<template>
    <div class="postContainer">
    
        <form  @submit.prevent="post">
            <div class="postContainer_post">
    
                <div class="postContainer_post_top">
                    <img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="profilPicture">
                    <p>{{$store.state.users.userName}}</p>
                </div>
    
                <textarea class="postContainer_post_inputText" type="text" v-model="postText"></textarea>
    
                <div class="postContainer_post_bottomInput">
                    <p>Add a picture url : </p> <input v-model="postUrl" type="text" class="postContainer_post_inputUrl">
                </div>
    
                <button type="submit"> E n v o y e r</button>
            </div>
        </form>
    
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {

    data() {
        return {
            postText: "",
            postUrl: "",
        };
    },

         computed: {
        ...mapState({
            userID: (state) => state.users.userID,
            userName: (state) => state.users.userName,
        })
         }, 

        methods: {

            async post() {
                    const { postText, postUrl } = this;
                    console.log(this.userID);
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
        }
        &_bottomInput {
            width: 100%;
            display: flex;
        }
        &_inputUrl {
            width: 300px;
            margin-left: 20px;
        }
    }
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
    background-color: white;
    box-shadow: 0 0 10px #4e5166;
    color: #4e5166;
    margin-bottom: -22px;
    transition: width 1.2s;
    text-shadow: 0 0 7px #4e5166;
    border-radius: 10px;
    margin-bottom: 8px;
    &:hover {
        transition: 0.5s ease-in-out;
    }
}
</style>