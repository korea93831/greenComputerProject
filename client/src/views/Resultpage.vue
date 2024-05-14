<template>
  <div class="result">
    <div class="result-page">
      <!-- 왼쪽에 이미지 -->
      <div class="image-container">
        <img :src="imageUrl" alt="Result Image" style="width: 100%; height: auto;">
      </div>

      <!-- 오른쪽에 텍스트 창 -->
      <div class="text-container">
        <div class="title-box">
          <p class="title-font"><strong>제목:</strong> {{ title }} </p>
        </div>
        <div class="keyword-box">
          <p class="keyword-font"><strong>키워드:</strong> {{ keyword }} </p>
        </div>
        <div class="description-box">
          <p class="description-font"><strong>해설</strong> {{ description }} </p>
          <p class="description-content"><strong> {{ description-content }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '', // 이미지 URL
      title: '', // 타이틀 데이터
      keyword: '', // 키워드 데이터
      description: '' // 해설 데이터
    };
  },
  mounted() {
    // DB에서 데이터 가져오는 메서드 호출
    this.fetchData();

    this.imageUrl = this.$route.query.imageUrl;
  },
  methods: {
    fetchData() {
      // 예: axios.get('/api/getData').then(response => {
      //       this.title = response.data.title;
      //       this.keyword = response.data.keyword;
      //       this.description = response.data.description;
      //   }).catch(error => {
      //       console.error('Error fetching data:', error);
      //   });
    }
  }
}
</script>

<style scoped>
.result-page {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 700px;
  
  /* background-color: chartreuse;
  padding: 50px;
  border: 20px solid maroon;
  margin: 50px; */
}

.image-container {
  flex: 1; 
  margin-right: 20px; 
}

.image-container img {
  max-width: 100%;
}

.text-container {
  flex: 1;
  text-align: left;
  margin-left: 50px;
}

.result {
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
}

.title-font {
  font-size: 30px;
  margin-bottom: 20px;
}

.keyword-font {
  font-size: 24px;
  margin-bottom: 20px;
}

.description-font {
  font-size: 24px;
}

.title-box {
  margin-bottom: 5%;
}

.keyword-box {
  margin-bottom: 5%;
}

.description-box {
  margin-bottom: 40%;
}

.description-content {
  font-size: 16px;
}
</style>
