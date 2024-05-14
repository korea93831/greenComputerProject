<template>
  <div class="home-view">
    <div class="background-image"></div>
    <div class="content">
      <h1 class="main-title">더 나은 미래를 위한 <span class="htp-text">HTP</span>, 지금 경험하세요.</h1>
      <p class="sub-title">"Heal Your Heart Through Drawing"</p>

      <v-btn class="explore-btn" to="/Imageupload" color="primary">무료 검사</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-view {
  position: relative;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../images/cloud-5055011_1280.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.5;
}

.content {
  z-index: 1;
  text-align: center;
}

.main-title {
  font-size: 50px;
}

.htp-text {
  color: red;
}

.sub-title {
  font-size: 35px;
}

.explore-btn {
  margin-top: 45px;
  font-size: 24px;
}
</style>
