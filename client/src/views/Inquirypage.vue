<template>
    <div class="detail-page">
      <div class="image-container">
        <v-img
        width="320px"
        height="320px"
          :src="imageUrl"
          cover>
          </v-img>
      </div>
      <div class="keyword">
        <p><strong>키워드:</strong> {{ keyword }}</p>
      </div>
      <div class="description">
        <p><strong>해설:</strong> {{ description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: '',
        keyword: '',
        description: ''
      };
    },
    mounted() {
      // 조회 페이지가 로드될 때 해당 결과에 대한 정보를 가져와서 데이터에 할당
      this.imageUrl = this.$route.query.imageUrl;
      this.keyword = this.$route.query.keyword;
      this.description = this.$route.query.text;
    }
  };
  </script>
  
  <style scoped>
  .detail-page {
    padding: 20px;
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
  }
  
  .keyword,
  .description {
    margin-top: 20px;
  }
  </style>
  