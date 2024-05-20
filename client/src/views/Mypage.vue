<template>
  <v-app>
    <v-container>
      <!-- 저장된 항목 표시 -->
      <v-expansion-panels v-model="panel" style="margin-bottom: 2%;">
        <v-expansion-panel v-for="(item, index) in items" :key="index">
          <v-expansion-panel-header>
            저장 날짜: {{ formatDate(item.date) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <!-- 이미지 -->
              <v-col cols="4">
                <v-img :src="item.imgUrl" max-width="400"></v-img>
              </v-col>
              <!-- 키워드 -->
              <v-col cols="4" class="text-center" style="display: flex; align-items: center; justify-content: center;">
                <p>{{ item.keyword }}</p>
              </v-col>
              <!-- 조회 및 삭제 버튼 -->
              <v-col cols="4" class="text-right" style="margin-top: 7%;">
                <v-row style="margin-right: 10%;">
                  <v-col cols="12">
                    <!-- 수정된 부분: 클릭 시 Inquirypage로 이동하도록 변경 -->
                    <v-btn @click="goToInquiry(item)" color="primary" style="margin-top: 10%;">조회</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn @click="deleteItem(item.id)" color="red">삭제</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      panel: [],
      items: []
    };
  },
  created() {
    // 사용자의 저장된 항목을 가져오는 함수 호출
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      // 서버로부터 사용자의 저장된 항목을 가져오는 API 호출
      // 예: axios.get('/api/user/items')
      // 성공적으로 가져온 데이터를 this.items에 할당
      // 예: this.items = response.data;
    },
    // 수정된 부분: Inquirypage로 이동하는 메서드 추가
    goToInquiry(item) {
      this.$router.push({
        name: 'inquirypage', // Inquirypage의 라우터 이름
        query: {
          imageUrl: item.imgUrl,
          keyword: item.keyword,
          analysis: item.analysis // 예상되는 해설 데이터
        }
      });
    },
    deleteItem(id) {
      // MySQL 데이터 삭제 로직
      // 서버에 삭제 요청을 보내고, 성공적으로 삭제되면 화면에서 해당 아이템을 제거
      // 예: axios.delete(`/api/items/${id}`).then(() => {
      //   this.items = this.items.filter(item => item.id !== id);
      //   alert('데이터가 삭제되었습니다.');
      // });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    }
  }
};
</script>
