<template>
  <div class="mypage-container">
    <v-app>
      <v-container>
      <v-row>
        <h1 class="font">마이페이지</h1>
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
          height="340px"
          min-width="320px">
          <v-img
          height="250px"
          :src="item.imagesrc"
          cover>
          </v-img>
          <v-row>
            <v-col cols="3">
              <v-card-title class="title-font" style="margin-top: 22px;">{{ item.label }}</v-card-title>
            </v-col>
            <v-col cols="5">
              <v-card-text class="keyword-font" style="font-size: 15px;">{{ item.keyword }}</v-card-text>
            </v-col>
            <v-col>
          <v-card-actions>
            <v-btn variant="flat"
            style="margin-top: 20px;"
            color="#FFAE42"
            text="검사결과"
            @click="goResult(item.imagesrc,item.label,item.keyword,item.text)"
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
              @update:modelValue="PageChange(page)"
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
      first:0,
      last:9
      
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
        console.log(this.totalItem.length)
        for(let i=this.first;i<this.last;i++){
          const convertUrl=this.totalItem[i]['imageUrl'].replace(/\\/g,'/');
          this.totalItem[i]['imagesrc']='http://localhost:3000/'+convertUrl;
          this.pageItem.push(this.totalItem[i])
        }
        console.log(this.pageItem)
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
    goResult(imageUrl,label,keyword,text){
      console.log(imageUrl,label,keyword,text)
      this.$router.push({ name: 'Inquirypage', query: { imageUrl:imageUrl,label:label,keyword:keyword,text:text} });
    },
    PageChange(newpage){
      console.log(newpage)
      this.first=(newpage-1)*9;
      if((newpage-1)*9+8<=this.totalItem.length){
        this.last=(newpage-1)*9+9;
      }else{
        this.last=this.totalItem.length
      }
      this.pageItem=[]
      for(let i=this.first;i<this.last;i++){
       
        const convertUrl=this.totalItem[i]['imageUrl'].replace(/\\/g,'/');
        this.totalItem[i]['imagesrc']='http://localhost:3000/'+convertUrl;
        this.pageItem.push(this.totalItem[i])
      }
    }
  }
}
</script>

<style scoped>
.mypage-container {
  background-color: #DDF3F5;
  min-height: 93vh;
  padding: 20px;
}

.font,
.title-font{
  font-family: "Do Hyeon", sans-serif;
}

.keyword-font {
  font-family: "Noto Sans KR", sans-serif;
}
</style>