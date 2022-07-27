<template>
    <header>
        <img class="logoo" src="../../images/icon-left-font-monochrome-black.svg" alt="">
    </header>
    
    <div class="home_banner">
        <homeForm />
    </div>
    
    <!-- PARTICLE SYSTEM -->
    <div class="headerPicture">
        <div class="page-bg"></div>
        <div class="animation-wrapper">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
        </div>
    </div>
</template>

<script>
import homeForm from '../components/homeForm.vue'
export default {
    components: {
        homeForm
    }

}
</script>

<style lang="scss" scoped>
$base-color: #4E5166;
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

//* Header banner with logo
header {
    width: 100%;
    height: 100px;
    background: rgba(250, 245, 245, 0.4);
    box-shadow: 0 5px 7px -2px $base-color;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
}

.logoo {
    width: 200px;
}

.home_banner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
}

@keyframes scaler {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Config */

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
        $val: #{$val},
        random($spacing)+px random($spacing)+px $color-particle;
    }
    @return $val;
}

@mixin particles($max) {
    box-shadow: particles($max);
}

/* Styles */

html,
body {
    height: 100%;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    overflow: hidden;
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