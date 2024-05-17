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
        if(!this.treeimage){
          alert('나무그림을 선택하세요');
          return;
        }
        const formData=new FormData();
        const file_name='tree'+Date.now()
        formData.append('image',this.treeimage);
        formData.append('filename',file_name);
        try{
          await axios.post('http://localhost:3000/analyze/tree',formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
        }catch(error){
          console.error(error)
        }
        const reader=new FileReader();
        reader.onload=async(e)=>{
          const base64Image=e.target.result;
          try{
            console.log('제출하기')
            Response=await axios.post('http://127.0.0.1:5000/api/tree',{image:base64Image,filename:file_name});
            console.log(Response.data['result'])
          }catch(error){
            console.error(error);
          }
          if(Response.data['result']==200){
              const data={
                imageurl:file_name
              }
              this.interpretation=await axios.post('http://localhost:3000/interpretation/tree',data);
              const tree_keywords=this.interpretation.data[0]['keyword']+','+this.interpretation.data[1]['keyword']+','+this.interpretation.data[2]['keyword']
              const tree_analysis=String(this.interpretation.data[0]['analysis']+'\n'+this.interpretation.data[1]['analysis']+'\n'+this.interpretation.data[2]['analysis'])
              // reader.readAsDataURL(this.file);
              this.$router.push({ name: 'result', query: { imageUrl1:"",imageUrl2:this.imageUrls[2],imageUrl3:"", keyword1:"",
                                  keyword2:tree_keywords,keyword3:"",analysis1:"",analysis2:tree_analysis,analysis3:"" } });
            }
        }
        reader.readAsDataURL(this.treeimage);

      }
    }
  };
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
  