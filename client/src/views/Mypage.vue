<template>
    <v-app>
      <v-container>
        <!-- 저장된 항목 표시 -->
        <v-expansion-panels v-model="panel" style="margin-bottom: 2%;">
          <v-expansion-panel v-for="(item, index) in items" :key="index">
            <v-expansion-panel-header>
              저장 날짜: {{ item.date }}
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
                      <v-btn @click="fetchImage(item)" color="primary" style="margin-top: 10%;">조회</v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-btn @click="deleteItem(index)" color="red">삭제</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        
        <!-- 항목 추가 버튼 -->
        <v-btn @click="addItem">항목 추가</v-btn>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        panel: [],
        items: [
          { date: '2024-05-18', imgUrl: 'https://via.placeholder.com/400', keyword: '키워드1' }
        ]
      };
    },
    methods: {
      fetchImage(item) {
        // MySQL에서 이미지 가져오기 로직
        alert('이미지 조회 완료');
      },
      deleteItem(index) {
        // MySQL 데이터 삭제 로직
        this.items.splice(index, 1);
        alert('데이터가 삭제되었습니다.');
      },
      addItem() {
        this.items.push({ date: new Date().toISOString().split('T')[0], imgUrl: 'https://via.placeholder.com/400', keyword: '키워드2' });
      }
    }
  };
  </script>
  
  <style>
  .v-application {
    font-family: 'Roboto', sans-serif;
  }
  </style>
  