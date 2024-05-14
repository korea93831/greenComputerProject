<template>
  <div class="upload-container">
    <div class="upload-image">
      <div class="upload-section">
        <label for="file3">사람 (PERSON)</label>
        <input type="file" id="file3" @change="handleFileUpload(3, $event)">
        <button class="cancel-btn" @click="cancelFileUpload(3)" v-if="imageUrls[3]">취소</button>
        <div v-if="imageUrls[3]">
          <img :src="imageUrls[3]" alt="Uploaded Image">
        </div>
      </div>
      <div class="gender-selection">
        <label for="male">남자</label>
        <input type="checkbox" id="male" v-model="selectedGenders" :value="'male'" @change="handleGenderChange('male')">
        <label for="female">여자</label>
        <input type="checkbox" id="female" v-model="selectedGenders" :value="'female'" @change="handleGenderChange('female')">
      </div>
      <p>※ 사람인 경우 그림에 있는 사람의 성별을 선택 해주세요.</p>
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
      selectedGenders: []
    };
  },

  methods: {
    Resultpage() {
      this.$router.push({ path: '/result', query: { imageUrl: this.imageUrls[3] } });
    },

    handleFileUpload(index, event) {
      const file = event.target.files[0];
      this.imageUrls[index] = URL.createObjectURL(file);
    },

    cancelFileUpload(index) {
      this.imageUrls[index] = '';
    },

    submitImages() {
      console.log("Selected Genders:", this.selectedGenders);
    },

    cancelUpload() {
      this.$router.push('/Imageupload');
    },

    handleGenderChange(selectedGender) {
      if (selectedGender === 'male' && this.selectedGenders.includes('female')) {
        this.selectedGenders = ['male'];
      }
      else if (selectedGender === 'female' && this.selectedGenders.includes('male')) {
        this.selectedGenders = ['female'];
      }
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
  input[type="checkbox"] {
    width: 25px; /* 너비 설정 */
    height: 25px; /* 높이 설정 */
  }
  </style>
