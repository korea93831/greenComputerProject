<template>
  <div>
    <v-container>
      <v-row>
        <h1>마이페이지</h1>
        <hr>
      </v-row>
      <v-row>
        <v-col
        v-for="n in 9"
        :key="n"
        row
        cols="4"
        >
          <v-card 
          height="250px"
          min-width="200px">
          <v-img
          height="200px"
          src="http://localhost:3000/uploads/houseimage-1716216313793.jpg"
          cover>

          </v-img>
          <v-row>
            <v-col cols="4">
              <v-card-title>집</v-card-title>
            </v-col>
            <v-col>
              <v-card-text>2024년 5월 23일</v-card-text>
            </v-col>
          </v-row>
          
         
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :length="PageNum"
              class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {},
  data() {
    return {
      sampleData: '',
      page:1,
      totalpage:5
    }
  },
  computed:{
    PageNum(){
      return 10;
    }
  },
  created() {
  },
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>