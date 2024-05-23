<template>
  <div>
    <v-app>
      <v-container>
      <v-row>
        <h1>마이페이지</h1>
        <hr>
      </v-row>
      <v-row>
        <v-col
        v-for="item in this.pageItem"
        :key="item.imageUrl"
        row
        cols="4"
        >
          <v-card
          height="320px"
          min-width="320px">
          <v-img
          height="250px"
          :src="item.imageUrl"
          cover>
          </v-img>
          <v-row>
            <v-col cols="2">
              <v-card-title>{{ item.label }}</v-card-title>
            </v-col>
            <v-col cols="5">
              <v-card-text>{{ item.keyword }}</v-card-text>
            </v-col>
            <v-col>
          <v-card-actions>
            <v-btn
            color="orange-lighten-2"
            text="검사결과"
            @click="goResult(itme.imageUrl)"
            ></v-btn>
            </v-card-actions>
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
    </v-app>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleData: '',
      page:1,
      totalpage:5,
      totalItem:[],
      pageItem:[],
      cnt:9
      
    }
  },
  computed:{
    PageNum(){
      console.log(parseInt(this.totalItem.length/9)+1)
      this.totalpage=parseInt(this.totalItem.length/9)+1
      return this.totalpage;
    }
  },
  created() {
    if(this.$route.query.myData){
      try{
        this.totalItem=JSON.parse(this.$route.query.myData);
        for(let i=0;i<this.cnt;i++){
          const convertUrl=this.totalItem[i]['imageUrl'].replace(/\\/g,'/');
          this.totalItem[i]['imageUrl']='http://localhost:3000/'+convertUrl;
          this.pageItem.push(this.totalItem[i])
        }
        
      }catch(error){
        console.error(error)
      }
    }
  },
  mounted() {
    console.log(this.pageItem)
  },
  unmounted() {},
  methods: {
    goResult(imageUrl){
      axios.post('http://localhost:3000/'+imageUrl)
    }
  }
}
</script>

