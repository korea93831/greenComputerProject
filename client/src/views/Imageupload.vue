<template>
    <div class="upload">
      <h1 class="page-title">이미지 업로드</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-img :src="require('@/images/집.png')" alt="House"></v-img> 
            <v-btn class="explore-btn" color="primary" @click="redirectToHouse('/images/집.png')">이미지 업로드</v-btn>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card>
            <v-img :src="require('@/images/나무.png')" alt="Tree"></v-img> 
            <v-btn class="explore-btn" color="primary" @click="redirectToTree('/images/나무.png')">이미지 업로드</v-btn>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card>
            <v-img :src="require('@/images/사람.png')" alt="Person"></v-img> 
            <v-btn class="explore-btn" color="primary" @click="redirectToPerson('/images/사람.png')">이미지 업로드</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <br>
      <h1> 각 이미지에 맞게 이미지 업로드를 해주세요.</h1>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToHouse(imagePath) {
        this.$router.push({ path:'/house', params: { imagePath }});
      },
      
      redirectToTree(imagePath) {
        this.$router.push({ path:'/tree', params: { imagePath }});
      },
      
      redirectToPerson(imagePath) {
        this.$router.push({ path:'/person', params: { imagePath }});
      }
    }
  };
  </script>
  
  <style scoped>
  .page-title {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  .upload {
    margin-top: 50px;
  }
  </style>
  