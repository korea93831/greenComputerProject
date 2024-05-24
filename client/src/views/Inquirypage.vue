<template>
  <div class="detail-page">
    <div class="detail-box">
      <div class="image-container">
        <v-img
        :src="imageUrl"
        class="image">
        </v-img>
      </div>
      <div class="keyword">
        <p><strong>키워드:</strong> {{ keyword }}</p>
      </div>
      <div class="description">
        <p><strong>해설:</strong> {{ description }}</p>
      </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;
}

.detail-box {
  width: 60%;
  padding: 20px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.image-container  {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  max-width: 100%;
  max-height: 550px;
  width: auto;
  height: auto;
}

.keyword,
.description {
  margin-top: 20px;
  font-family: "Noto Sans KR", sans-serif;
}
</style>
