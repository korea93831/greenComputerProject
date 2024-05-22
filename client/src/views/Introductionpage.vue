<template>
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <h4 class="subtitle">{{ subtitle }}</h4>
      <div class="row">
        <div class="column">
          <img :src="imgSrc1" alt="Image 1" />
        </div>
        <div class="column-1">
          <p class="p_box">원시시대에 그림은 인간의 언어였습니다. 벽화나 토기에 새겨진 그림이 그들의 의사표현이었고 그들의 감정과 행동의 기록이었습니다.
            <br><br>
            정신분석학자 지크믄트 프로이트는 명화들을 들여다보며 그 명화를 그린 작가들이 자신의 마음의 심층을 상징적으로 그림 속에 담고 있음을 발견하였습니다. 예를 들면 레오나르도 다빈치의 “성안나오 성모자상”은 아기예수와 두 마리아를 그렸지만 프로이트는 레오나르도 다빈치가 자신을 낳아준 어머니와 길러 준 어머니를 그린 것이라고 해석했습니다.
            <br><br>
            그림검사를 통해 언어로 표현하기 어려운 심상(image)을 그림으로 표현하게 하여 사람을 더욱 이해할 수 있도록 돕는 비언어적 커뮤니케이션이 가능합니다.</p>
        </div>
      </div>
      <div class="row">
        <div class="column-1">
          <p class="p_box">HTP검사는 House(집), Tree(나무), Person(사람)을 그려보게 하는 그림검사입니다. 한 종이에 모두 그려넣는 KHTP검사가 있고 사람그림을 남,녀 양성을 모두 그리게 하는 HTPP검사가 있습니다. HTP 검사는 1920년대에 구디너프(Goodenough, 1926)가 고안한 인물화 검사(Drawing a Person Test, DAP)를 바탕으로, 존 벅(John Buck)이 1948년에 집과 나무를 추가로 그리도록 재개발하였습니다.
            <br><br>
            그림 검사의 타당도와 신뢰도에 대해 일부 논박이 있어왔으나, 그럼에도 불구하고 HTP 검사는 임상 장면에서 널리 활용되고 있습니다.
            <br><br>
            HTP그림검사는 사용상의 여러 가지 이점들이 있는데,
            <br>
            1. 실시가 쉽고(연필, 종이, 지우개)
            <br>
            2. 시간이 많이 걸리지 않으며(보통 20~30분)
            <br>
            3. 언어 표현이 어려운 사람(아동, 외국인, 문맹자들)도 실시가능하며
            <br>
            4.그림 솜씨나 훈련이 성격 평가에 큰 영향을 주지 않습니다.
            <br><br>
            HTP그림의 해석은, 정신분석에서 밝혀진 상징에 대한 의미, 정신증 환자들이 보이는 방어기제와 강박적 사고, 강박적 행동, 공포와 불안 등의 여러 병리적 현상에서 나타나는 상징성을 연구하며 얻은 단서들을 해석에 적용해 왔습니다.</p>
        </div>
        <div class="column">
          <img :src="imgSrc2" alt="Image 2" />
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img :src="imgSrc3" alt="Image 3" />
        </div>
        <div class="column-1">
          <p>그림투사검사의 장점</p>
          <p class="p_box">
            1. 그림검사는 설문지형 검사보다 피검자들의 부담이 적다.
            <br>
            2. 그림검사는 그려진 그림을 통해 그린 사람의 심상의 표현을 볼 수 있다.
            <br>
            3. 그림검사는 비언어적커뮤니케이션이므로 통제나 방어를 줄여준다.
            <br>
            4. 그림검사는 언어 표현이 어려운 사람(외국인, 문맹자, 억압 된 자)에게도 적용이 가능하다.
            <br>
            5. 그림검사는 연령, 지능, 예술적 재능에 제한이 없다.
            <br>
            6. 그림검사는 그린 사람을 평가하는 것이 아니라 치료적 의미도 가지고 있다.
            <br>
            7. 그림검사는 그림으로 형상화하고 상징화하는 과정을 통해 자기통찰이 가능하다.
            <br>
            8. 그림검사를 집단으로 실시하여 집단원들의 적응수준이나 성격의 성숙도를 알아 볼 수 있다.</p>
        </div>
      </div>
      <div class="row">
        <div class="column-1">
          <p class="p_box">HTP검사 하는 방법
            <br><br>
            1. 회원 가입을 하십시오
            <br>
            2. 로그인이 된후 검사 버튼을 눌러주세요
            <br>
            3. 이미지 업로드 페이지로 이동 하셨으면 카메라로 자녀들의 그린 그림을 집, 나무, 사람 구별해주셔서 파일을 업로드 해주시고 사람인 경우 그림속에 남자,여자 를 선택을 해주시고 제출 버튼을 눌러주시면 됩니다.
            <br>
            4. 결과를 보실수 있습니다.
            <br>
            5. 마이페이지에서도 결과물 을 보실수 있습니다.</p>
        </div>
        <div class="column">
          <img :src="imgSrc4" alt="Image 4" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: "아이의 그림 속 숨겨진 이야기: HTP 심리 검사",
        subtitle: "HTP 검사를 통해 아이가 그리는 그림 속에 숨겨진 심리적 메시지를 발견하고, 그들의 감정과 생각을 이해하는 방법",
        imgSrc1: require('@/images/kids-1093758_1280.jpg'),
        imgSrc2: require('@/images/istockphoto-1444446563-612x612.webp'),
        imgSrc3: require('@/images/istockphoto-1630991645-612x612.webp'),
        imgSrc4: require('@/images/istockphoto-1428116743-612x612.jpg')
      };
    }
  };
  </script>
  
  <style>
  .container {
    text-align: center;
    max-width: 1200px;
    margin: auto;
    margin-top: 20px;
  }
  
  .title {
    margin-bottom: 20px;
  }
  
  .subtitle {
    margin-bottom: 10px;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .column {
    flex: 1 1 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 10px;
  }
  
  .column img {
    max-width: 100%;
    height: auto;
  }
  
  .column-1 {
    padding: 10px;
    text-align: left;
    box-sizing: border-box;
    flex: 1 1 100%;
  }
  
  .p_box {
    padding: 10px;
  }
  
  @media (min-width: 768px) {
    .column {
      flex: 1;
      max-width: 48%;
    }
  
    .column-1 {
      flex: 1;
      max-width: 48%;
    }
  }
  </style>