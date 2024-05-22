<template>
  <div class="upload">
    <h1 class="page-title">이미지 업로드</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-img :src="imageUrls[1] ? imageUrls[1] : require('@/images/집.png')" alt="House" style="max-width: 100%; max-height: 500px;"></v-img> 
          <input type="file" id="file1" @change="handleFileUpload(1, $event)">
          <button class="cancel-btn" @click="cancelFileUpload(1)" v-if="imageUrls[1]">취소</button>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-img :src="imageUrls[2] ? imageUrls[2] : require('@/images/나무.png')" alt="Tree" style="max-width: 100%; max-height: 500px;"></v-img> 
          <input type="file" id="file2" @change="handleFileUpload(2, $event)">
          <button class="cancel-btn" @click="cancelFileUpload(2)" v-if="imageUrls[2]">취소</button>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-img :src="imageUrls[3] ? imageUrls[3] : require('@/images/사람.png')" alt="Person" style="max-width: 100%; max-height: 500px;"></v-img> 
          <input type="file" id="file3" @change="handleFileUpload(3, $event)">
          <button class="cancel-btn" @click="cancelFileUpload(3)" v-if="imageUrls[3]">취소</button>
        </v-card>
        
        <div class="gender-selection">
          <label for="male">남자</label>
          <input type="checkbox" id="male" v-model="selectedGenders" :value="'male'" @change="handleGenderChange('male')" class="checkbox">
          <label for="female">여자</label>
          <input type="checkbox" id="female" v-model="selectedGenders" :value="'female'" @change="handleGenderChange('female')" class="checkbox">
        </div>
        <p>※ 사람인 경우 그림에 있는 사람의 성별을 선택 해주세요.</p>
      </v-col>
    </v-row>
    <v-btn class="explore-btn" color="primary" @click="goToResultPage">제출</v-btn>
  </div>  
</template>
  
  <script>
import { render } from 'vue';
import axios from 'axios';
  export default {
    data() {
      return {
        imageUrls: { 1: '', 2: '', 3: '' },
        selectedGenders:"",
        houseimage:null,
        treeimage:null,
        personimage:null,
        uploadedImage:null,
        interpretation:null
      };
    },
    methods: {
      handleFileUpload(index, event) {
        const file = event.target.files[0];
        this.imageUrls[index] = URL.createObjectURL(file);
        console.log(file)
        if(index==1){
          this.houseimage=file
        }
        else if(index==2){
          this.treeimage=file
        }
        else{
          this.personimage=file
        }
        if(file){
          const reader=new FileReader();
          if(index==1){
            reader.readAsDataURL(this.houseimage)
          }
          else if(index==2){
            reader.readAsDataURL(this.treeimage)
          }
          else{
            reader.readAsDataURL(this.personimage)
          }
        }
      },
      
      cancelFileUpload(index) {
        this.imageUrls[index] = '';
        const inputElement = document.getElementById(`file${index}`);
        if (inputElement) {
          inputElement.value = '';
        }
      },
      handleGenderChange(selectedGender) {
        if (selectedGender === 'male' && this.selectedGenders.includes('female')) {
          this.selectedGenders = 'male';
        }
        else if (selectedGender === 'female' && this.selectedGenders.includes('male')) {
          this.selectedGenders = 'female';
        }
      },


      async goToResultPage() {
        if(!this.treeimage & !this.houseimage & this.personimage){
          alert('이미지를 업로드 후에 제출해주세요');
          return;
        }
        const formdata=new FormData();
        const timestamp=Date.now()
        if (this.houseimage) {
          formdata.append('houseimage', this.houseimage, `house${timestamp}`);
        }
        if (this.treeimage) {
          formdata.append('treeimage', this.treeimage, `tree${timestamp}`);
        }
        if (this.personimage) {
          formdata.append('personimage', this.personimage, `person${timestamp}`);
        }
        try{
            console.log(formdata)
            await axios.post('http://localhost:3000/analyze',formdata,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
        }catch(error){
          console.error(error)
        }
        const readImageAsBase64 = (image) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
          });
        };
        let tree_keywords='';
        let tree_analysis='';
        let house_keywords='';
        let house_analysis='';
        let person_keywords='';
        let person_analysis='';
        
         try{
          if(this.treeimage){
          console.log('treeimage')
          const treebase64Image=await readImageAsBase64(this.treeimage);
          await axios.post('http://localhost:5000/api/tree',{image:treebase64Image,filename:`tree${timestamp}`})
          .then(response=>{
            if(response.data.result==200){
              axios.post('http://localhost:3000/interpretation/tree',{tree_url:`tree${timestamp}`})
              .then(TreeInter=>{
              console.log('treeInter')
              console.log(TreeInter)
              tree_keywords=TreeInter.data[0]['keyword']+','+TreeInter.data[1]['keyword']+','+TreeInter.data[2]['keyword']
              tree_analysis=TreeInter.data[0]['analysis']+','+TreeInter.data[1]['analysis']+','+TreeInter.data[2]['analysis']
              })
          }else{
            console.log('notTreeInter')
          }
          })
        }
        if(this.houseimage){
          console.log('houseimage')
          const housebase64Image=await readImageAsBase64(this.houseimage);
          await axios.post('http://localhost:5000/api/house',{image:housebase64Image,filename:`house${timestamp}`})
          .then(response=>{
            if(response.data.result==200){
            axios.post('http://localhost:3000/interpretation/house',{house_url:`house${timestamp}`})
            .then(HouseInter=>{
              console.log('houseInter')
              console.log(HouseInter)
              house_keywords=HouseInter.data[0]['keyword']+','+HouseInter.data[1]['keyword']+','+HouseInter.data[2]['keyword']
              house_analysis=HouseInter.data[0]['analysis']+','+HouseInter.data[1]['analysis']+','+HouseInter.data[2]['analysis']
            })
          }else{
            console.log('notTreeInter')
          }
          })
        }
        if(this.personimage){
          console.log('personimage')
          const personbase64Image=await readImageAsBase64(this.personimage);
          await axios.post('http://localhost:5000/api/person',{image:personbase64Image,filename:`person${timestamp}`})
          .then(response=>{
            if(response.data.result==200){
              axios.post('http://localhost:3000/interpretation/person',{person_url:`person${timestamp}`})
              .then(PersonInter=>{
                console.log('personInter')
                console.log(PersonInter)
                person_keywords=PersonInter.data[0]['keyword']+','+PersonInter.data[1]['keyword']+','+PersonInter.data[2]['keyword']
                person_analysis=person_analysis=PersonInter.data[0]['analysis']+','+PersonInter.data[1]['analysis']+','+PersonInter.data[2]['analysis']
              }).then(()=>{
                this.$router.push({ name: 'result', query: { imageUrl1:this.imageUrls[1],imageUrl2:this.imageUrls[2],imageUrl3:this.imageUrls[3], keyword1:house_keywords,keyword2:tree_keywords,keyword3:person_keywords,analysis1:house_analysis,analysis2:tree_analysis,analysis3:person_analysis} });
              })
            }else{
              console.log('notTreeInter')
            }
          })
        }}
        catch(error){
          console.error(error)
        }
        
      }
    }
  }
  </script>
  
  <style scoped>
  .page-title {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  .upload {
    margin-top: 50px;
  }
  .cancel-btn {
  margin-top: 10px;
  margin-left: 20px;
  color: red;
}

.gender-selection {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.checkbox {
  margin: 0 10px;
  width: 20px;
  height: 20px;
}

.explore-btn {
  margin-top: 20px; 
  width: 150px; 
  height: auto; 
  font-size: 24px;
  display: block; 
  margin: 0 auto; 
}
  </style>
  