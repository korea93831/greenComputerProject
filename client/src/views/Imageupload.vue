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
        selectedGenders: [],
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
          this.selectedGenders = ['male'];
        }
        else if (selectedGender === 'female' && this.selectedGenders.includes('male')) {
          this.selectedGenders = ['female'];
        }
      },


      async goToResultPage() {
        if(!this.treeimage & !this.houseimage & this.personimage){
          alert('이미지를 업로드 후에 제출해주세요');
          return;
        }
        const treeformData=new FormData();
        const houseformData=new FormData();
        const personformData=new FormData();
        const timestamp=Date.now()
        if (this.houseimage) {
          houseformData.append('houseimage', this.houseimage, `house${timestamp}`);
        }
        if (this.treeimage) {
          treeformData.append('treeimage', this.treeimage, `tree${timestamp}`);
        }
        if (this.personimage) {
          personformData.append('personimage', this.personimage, `person${timestamp}`);
        }
        try{
          if(this.treeimage){
            console.log(treeformData)
            await axios.post('http://localhost:3000/analyze/tree',treeformData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
          }
          if(this.houseimage){
            await axios.post('http://localhost:3000/analyze/house',houseformData,{
              headers:{
              'Content-Type':'multipart/form-data'
            }
            });
          }
          if(this.personimage){
            await axios.post('http://localhost:3000/analyze/person',personformData,{
              headers:{
                'Content-Type':'multipart/form-data'
              }
            })
          }
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
        const base64Images = {};
        if (this.houseimage) {
            base64Images.house = await readImageAsBase64(this.houseimage);
        }
        if (this.treeimage) {
            base64Images.tree = await readImageAsBase64(this.treeimage);
        }
        if (this.personimage) {
            base64Images.person = await readImageAsBase64(this.personimage);
        }
        try{
          const response=await axios.post('http://127.0.0.1:5000/api/tree',{
            images:base64Images,
            filenames:{
              house:`house${timestamp}`,
              tree:`tree${timestamp}`,
              person:`person${timestamp}`
            }
          });
          const data=response.data;
          img_url={
            tree_url:`tree${timestamp}`,
          };
          if(data.result===200){
            const TreeInter=await axios.post('http://localhost:3000/interpretation/tree',{tree_url:`tree${timestamp}`})
            const HouseInter=await axios.post('http://localhost:3000/interpretation/house',{house_url:`house${timestamp}`})
            const PersonInter=await axios.post('http://localhost:3000/interpretation/person',{person_url:`person${timestamp}`})
            const tree_keywords=TreeInter.data[0]['keyword']+','+TreeInter.data[1]['keyword']+','+TreeInter.data[2]['keyword']
            const tree_analysis=TreeInter.data[0]['analysis']+','+TreeInter.data[1]['analysis']+','+TreeInter.data[2]['analysis']
            const house_keywords=HouseInter.data[0]['keyword']+','+HouseInter.data[1]['keyword']+','+HouseInter.data[2]['keyword']
            const house_analysis=HouseInter.data[0]['analysis']+','+HouseInter.data[1]['analysis']+','+HouseInter.data[2]['analysis']
            const person_keywords=personInter.data[0]['keyweord']+','+personInter.data[1]['keyword']+','+personInter.data[2]['keyword']
            const person_analysis=personInter.data[0]['analysis']+','+personInter.data[1]['analysis']+','+personInter.data[2]['analysis']
            this.$router.push({ name: 'result', query: { imageUrl1:this.imageUrls[1],imageUrl2:this.imageUrls[2],imageUrl3:this.imageUrls[3], keyword1:house_keywords,
                                  keyword2:tree_keywords,keyword3:person_keywords,analysis1:house_analysis,analysis2:tree_analysis,analysis3:person_analysis} });
            // reader.readAsDataURL(this.treeimage);
          }
          else{
            alert('그림 분석에 실패했습니다.')
          }
        }catch(error){
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
  