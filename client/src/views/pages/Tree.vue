<template>
  <div class="upload-container">
    <div class="upload-image">
      <div class="upload-section">
        <label for="file2">나무 (TREE)</label>
        <input type="file" id="file2" @change="handleFileUpload(2, $event)">
        <button class="cancel-btn" @click="cancelFileUpload(2)" v-if="imageUrls[2]">취소</button>
        <div v-if="imageUrls[2]">
          <img :src="imageUrls[2]" alt="Uploaded Image">
        </div>
      </div>
        
      <div class="button-group">
        <v-btn class="explore-btn" color="primary" @click="Resultpage">제출</v-btn>
        <v-btn class="explore-btn" color="red" @click="cancelUpload">취소</v-btn>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        imageUrls: { 1: '', 2: '', 3: '' },
        selectedGenders: [],
        uploadedImage:null,
        file:null
      };
    },

    methods: {
      async Resultpage() {
        if(!this.file){
          alert('이미지 파일을 선택하세요');
          return;
        }
        const reader=new FileReader();
        reader.onload=async(e)=>{
          this.uploadedImage=e.target.result;
          try{
            console.log('제출하기')
            await axios.post('http://loaclhost:5000/api/tree',{image:this.uploadImage});
            await axios.post('http://localhost:3000/analyze/tree',{image:this.uploadImage});

          }catch(error){
            console.error(error)
          }
        }
        // this.$router.push({ path: '/result', query: { imageUrl: this.imageUrls[2] } });
      },

      handleFileUpload(index, event) {
        this.file = event.target.files[0];
        console.log(event.target.files[0]);
        this.imageUrls[index] = URL.createObjectURL(this.file);
        if(this.file){
          const reader = new FileReader();
          reader.onload=(e)=>{
            this.uploadedImage=e.target.result;
          };
          reader.readAsDataURL(this.file);
        }
      },
      
      cancelFileUpload(index) {
        // 해당 파일 선택을 취소하기 위해 이미지 URL을 빈 문자열로 설정합니다.
        this.imageUrls[index] = '';
      },

      async uploadImage(index) {
        if (!this.imageUrls[index]) {
          alert(`Please select an image to upload for image ${index}.`);
          return;
        }
        // 이미지를 서버로 업로드하는 로직을 작성하세요.
        // 여기에 서버로 이미지를 업로드하는 HTTP 요청을 보내는 코드를 작성하세요.
        try {
          // 서버로 이미지를 업로드하는 HTTP 요청을 보내고 응답을 처리합니다.
          // 예를 들어 axios 또는 fetch API를 사용하여 서버로 이미지를 업로드할 수 있습니다.
          const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
            method: 'POST',
            body: this.imageUrls[index] // 이 부분을 실제로 서버로 전송해야 하는 데이터로 변경해야 합니다.
          });
          if (response.ok) {
            alert(`Image ${index} uploaded successfully!`);
          } else {
            alert(`Failed to upload image ${index}.`);
          }
        } catch (error) {
          console.error(`Error uploading image ${index}:`, error);
          alert(`Error uploading image ${index}. Please try again later.`);
        }
      },

      submitImages() {
        // 제출 버튼을 누를 때의 로직을 여기에 작성합니다.
        // 모든 이미지를 서버로 한꺼번에 업로드하거나 다른 작업을 수행할 수 있습니다.
        console.log("Selected Genders:", this.selectedGenders);
      },

      cancelUpload() {
        this.$router.push('/Imageupload');
      }
    }
  };
  </script>
  
  <style scoped>
  .upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 93vh;
  }
  
  .upload-image {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .upload-section {
    margin-bottom: 60px;
  }
  
  .upload-section label {
    margin-right: 50px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    width: 150px;
    margin-top: 20px;
  }
  
  .gender-selection {
    display: flex;
    justify-content: space-between;
    width: 150px;
  }
  
  .upload-section img {
    width: 650px;
    height: auto;
    margin-top: 10px;
  }
  
  .cancel-btn {
    margin-top: 10px;
    margin-left: 20px;
    color: red;
  }
  </style>
  