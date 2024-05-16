<template>
  <div class="result">
    <div class="result-page d-flex justify-content-center align-items-center" style="margin-left: 10%; margin-top: auto;">
      <div class="content-container">
        <div class="image-text-container" v-for="(title, index) in titles" :key="index" style="margin-top: 10%; margin-bottom: 10%;">
          <div class="row mb-4" v-if="imageUrls[index + 1]">
            <div class="col-md-12 mb-4 d-flex">
              <div class="image-container mr-4">
                <img :src="imageUrls[index + 1]" :alt="'Result Image ' + (index + 1)" style="max-width: 100%; max-height: 500px;">
              </div>
              <div class="text-container flex-grow-1" style="margin-top: 10%;">
                <div class="title-box">
                  <p class="title-font"> {{ title }} </p>
                </div>
                <div class="keyword-box">
                  <p class="keyword-font"><strong>키워드:</strong> {{ keywords[index] }} </p>
                </div>
                <div class="description-box">
                  <p class="description-font"><strong>해설:</strong> {{ descriptions[index] }} </p>
                  <p class="description-content" v-if="descriptionContents[index]"><strong>설명 내용:</strong> {{ descriptionContents[index] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: ["집 그림 결과 분석", "나무 그림 결과 분석", "사람 그림 결과 분석"],
      keywords: ["건물", "자연", "인물"],
      descriptions: ["집을 나타낸 그림입니다.", "나무를 표현한 그림입니다.", "사람을 나타낸 그림입니다."],
      descriptionContents: ["집은 안정과 편안함을 의미합니다.", "나무는 자연을 상징합니다.", "사람은 인간의 존재를 나타냅니다."],
      imageUrls: {
        1: '',
        2: '',
        3: ''
      }
    };
  },
  mounted() {
    this.imageUrls[1] = this.$route.query.imageUrl1;
    this.imageUrls[2] = this.$route.query.imageUrl2;
    this.imageUrls[3] = this.$route.query.imageUrl3;
  }
};
//   methods: {
//     fetchData() {
//       // 예: axios.get('/api/getData').then(response => {
//       //       this.title = response.data.title;
//       //       this.keyword = response.data.keyword;
//       //       this.description = response.data.description;
//       //   }).catch(error => {
//       //       console.error('Error fetching data:', error);
//       //   });
//     }
//   }
// }
</script>

<style scoped>
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.result-page {
  width: 100%;
}

.content-container {
  width: 80%;
  margin-top: 20px;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.title-box {
  margin-bottom: 20px;
}

.keyword-box {
  margin-bottom: 20px;
}

.description-box {
  margin-bottom: 20px;
}

.title-font {
  font-size: 38px;
}

.keyword-font {
  font-size: 28px;
}

.description-font {
  font-size: 24px;
}

.description-content {
  font-size: 24px;
}
</style>
