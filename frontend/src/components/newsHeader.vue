<template>
    <header>
        <img class="logoo" src="../../images/icon-left-font-monochrome-black.svg" alt="">
        <p class="userName">{{$store.state.users.userName}}</p>
    </header>
</template>

<script>

export default {
   
}
</script>

<style lang="scss" scoped>
$base-color: #4E5166;
header {
    width: 100%;
    height: 100px;
    background: rgba(250, 245, 245, 1);
    box-shadow: 0 5px 7px -2px $base-color;
    display: flex;
    justify-content:space-between;
    align-items: center;
    position: absolute;
    top: 0;
    opacity: 0.5;
}

.logoo {
    width: 200px;
    margin-left:30px;
}

.userName {
    margin-right: 30px;
}
.svg_home {}
</style>