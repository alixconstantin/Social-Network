<template>
    <div class="form_container">

        <form v-if="!registering" @submit.prevent="login">
    
            <div class="email">
                <div class="email_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                </div>
                <input type="email" v-model="email" class="email_input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
    
            <div class="password">
                <div class="password_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <input type="password" v-model="password" class="password_input" id="exampleInputPassword1" placeholder="Password">
            </div>
          
            <button type="submit" class="btn btn-primary">C o n n e x i o n</button>
    
    
            <p class="message"><span class="message_question">Not registered?</span><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sv" width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg> <a @click="registering=true" href="#">Create an account</a></p>

        </form>


    


        <form v-if="registering" @submit.prevent="register">
        
         <div class="name">
                <div class="name_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                </div>
                <input type="name" v-model="name" class="name_input" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter name">
            </div> 
    
            <div class="email">
                <div class="email_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                </div>
                <input type="email" v-model="email" class="email_input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
    
            <div class="password">
                <div class="password_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <input type="password" v-model="password" class="password_input" id="exampleInputPassword1" placeholder="Password">
            </div>
    
            <button type="submit" class="btn btn-primary">E n r e g i s t r e r</button>
           
    
    
            <p class="message"><span class="message_question">Registered?</span><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sv" width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg> <a @click="registering=false" href="#">Login</a></p>
    
        </form>

    
    
    
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name:"",
      email: "",
      password: "",
      registering: false,
    };
  },
  computed: {
    ...mapState({
      userID: (state) => state.users.userID,
      userName: (state) => state.users.userName
    }),
  },
  methods: {
    async login() {
      const { email, password} = this;
      const res = await fetch("http://localhost:3080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      this.$store.commit("SET_USER_ID", data.userId);
      this.$store.commit("SET_USER_NAME", data.userName);
      this.$store.commit("SET_USER_MAIL", data.userMail);
      if(this.userID){
        this.$router.push({ path: "/news" });
      } // ! Else { notification error connection }
    },
    // REGISTER //
    async register() {
      const { name, email, password} = this; 
      let postOwner = []
      const res = await fetch("http://localhost:3080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          postOwner
        }),
      });
      const data = await res.json();
       if (data.message != "" && data.message != undefined) {
        alert("Utilisateur Créer !");
        this.registering = false;
      } else {
        alert(
          "problème dans l'enregistrement utilisateur "
        );
      } 
    },
  },
};
</script>

<style lang="scss" scoped>
$base-color: #4e5166;
.form_container {
  width: 330px;
  height: 50%;
  background-color: rgba(250, 245, 245, 0.3);
  box-shadow: 0 0 10px $base-color;
  font-size: 20px;
  font-family: "Lato";
  z-index: 9999;
}
.test,
form {
  height: 388px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: self-end;
}
//* Inputs
input {
  background: rgba(250, 245, 245, 0.75);
}
input:focus {
  outline: none;
}
.email {
  box-shadow: 0 5px 7px -2px rgb(0, 0, 0);
  display: flex;
  height: 53px;
  width: 87%;
  box-shadow: 0 0 10px $base-color;
  &_icon {
    width: 54px;
    background-color: rgba(250, 245, 245, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: $base-color;
    box-shadow: 3px 0 5px -2px $base-color;
  }
  &_input {
    width: 211px;
    border: none;
    box-shadow: 0px 0px 5px -2px $base-color;
  }
}
.name {
  box-shadow: 0 5px 7px -2px rgb(0, 0, 0);
  display: flex;
  height: 53px;
  width: 87%;
  box-shadow: 0 0 10px $base-color;
  &_icon {
    width: 54px;
    background-color: rgba(250, 245, 245, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: $base-color;
    box-shadow: 3px 0 5px -2px $base-color;
  }
  &_input {
    width: 211px;
    border: none;
    box-shadow: 0px 0px 5px -2px $base-color;
  }
}
.password {
  box-shadow: 0 5px 7px -2px rgb(0, 0, 0);
  display: flex;
  height: 53px;
  width: 87%;
  color: $base-color;
  box-shadow: 0 0 10px $base-color;
  &_icon {
    width: 54px;
    background-color: rgba(250, 245, 245, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 0 5px -2px $base-color;
  }
  &_input {
    width: 211px;
    border: none;
    box-shadow: 0px 0px 5px -2px $base-color;
  }
}
//* Button
button {
  font-family: "Lato";
  width: 219px;
  height: 53px;
  border: none;
  background-color: rgba(250, 245, 245, 0.5);
  box-shadow: 0 0 10px $base-color;
  color: $base-color;
  margin-bottom: -22px;
  transition: width 1.2s;
  text-shadow: 0 0 7px $base-color;
}
button:hover {
  background-color: rgba(250, 245, 245, 0.52);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  transform: scale(1);
  width: 287.09px;
}
//* Text form
.message {
  font-family: "Leto";
  color: #ffffff;
  font-size: 14px;
  font-style: italic;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: space-around;
  &_question {
    width: 40%;
    color: #ffd7d7;
    text-shadow: 0 0 7px #fd2d01; //  box-shadow: 2px 5px 7px -2px rgb(0, 0, 0);
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center; //  box-shadow: 0 0 10px #FD2D01;
  }
}
.message a {
  font-family: "Leto";
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-style: italic; // box-shadow: 2px 5px 7px -2px rgb(0, 0, 0);
  width: 40%;
  height: 85px;
  display: flex; // box-shadow: 0 0 10px #FD2D01;
  justify-content: center;
  align-items: center;
  transition: scale 0.8s;
  text-shadow: 0 0 7px #fd2d01;
  text-decoration: underline;
}
.message a:hover {
  color: white;
  scale: (1.1);
}
.sv {
  color: linear-gradient(
    to right top,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
  padding-top: 10px;
  color: $base-color;
  width: 40px;
  position: relative;
  bottom: 5px;
  right: 5px;
  animation-duration: 11s;
  animation-name: scaler;
  animation-iteration-count: infinite;
}
.group-element {
  width: 100%;
  min-height: 100px;
  max-height: 20000px;
  transition: all 0.5s;
}
.fade-group-enter,
.fade-group-leave-to {
  opacity: 1;
}
.fade-group-leave-active {
  opacity: 0;
  position: absolute;
}
</style>
