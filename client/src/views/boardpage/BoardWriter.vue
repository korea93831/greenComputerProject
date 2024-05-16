<template>
  <v-form>
    <v-container>
      <v-row>
        제목
      </v-row>
      <v-row>
        <v-text-field
          :counter="50"
          label="제목"
          name="title"
          required
          v-model="title"
          maxlength="50"
        ></v-text-field>
      </v-row>
      <v-row>
        내용 
      </v-row>
      <v-row>
        <v-textarea
          filled
          name="context"
          hint="내용을 입력해주세요."
          v-model="context"
          :counter="1000"
          maxlength="1000"
        ></v-textarea>
      </v-row>
      <v-row>
        <v-btn block outlined color="blue" @click="writeClick"> 등록 </v-btn>
      </v-row>
    </v-container>
  </v-form>    
</template>

<script>
import axios from 'axios'

export default {
  name: 'BoardWriter',
  created() {
    if (this.$route.params && this.$route.params.seq) {
      this.fetch()
    }
  },
  methods: {
    fetch() {
      axios.get('http://localhost:8080/api/board/' + this.$route.params.seq)
        .then((response) => {
          console.log(response)
          // 여기서 받아온 데이터를 title과 context에 할당해야 합니다.
          this.title = response.data.title; // 수정 필요
          this.context = response.data.context; // 수정 필요
        })
        .catch((error) => {
          console.log(error)
        })
    },
    writeClick() {
      if(this.$route.params.seq) {
        axios.put('http://localhost:8080/api/board/' + this.$route.params.seq, this.$data)
        .then((response) => {
          console.log(response)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        this.$data.regDt = this.getNowDate()
        this.$data.uptDt = this.getNowDate()
        axios.post('http://localhost:8080/api/board', this.$data)
        .then((response) => {
          console.log(response)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    getNowDate() {
      var nowDate = new Date()
      var year = nowDate.getFullYear().toString()
      var month = (nowDate.getMonth() + 1).toString()
      var day = nowDate.getDate().toString()

      return year + "-" + (month[1] ? month : "0" + month[0]) + "-" + (day[1] ? day : "0" + day[0])
    }
  },
  data () {
    return {
      title: '',
      context: ''
    }
  }
}
</script>
