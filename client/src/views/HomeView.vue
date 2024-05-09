<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="400"
      style="margin-left: 25%;
      margin-right: 25%;
      text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        :img-src="require('@/images/17523683163498.jpg')">
      </b-carousel-slide>

      <b-carousel-slide :img-src="require('@/images/mindintroimg21.jpg')">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52">
      </b-carousel-slide>

      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>

<br>
    <div class="justify-content-center" style="margin-left:25%; margin-right:25%;">
      <b-card-group deck>
        <b-card title="집 (H)" img-alt="Image" img-top >
          <template #img>
            <img :src="require('@/images/집.jpg')" class="card-img-top" alt="Image">
          </template>
          <b-card-text>
            집은 내가 생각하는 가정환경과 가족 관계를 나타냅니다.
          </b-card-text>
          <template #footer>
            <b-button href="#" variant="primary">무료 검사</b-button>
          </template>
        </b-card>

        <b-card title="나무 (T)" img-alt="Image" img-top >
          <template #img>
            <img :src="require('@/images/나무.jpg')" class="card-img-top" alt="Image">
          </template>
          <b-card-text>
            나무는 무의식적인 자기상, 자신에 대한 감정을 나타냅니다.
          </b-card-text>
          <template #footer>
            <b-button href="#" variant="primary">무료 검사</b-button>
          </template>
        </b-card>

        <b-card title="사람 (P)" img-alt="Image" img-top>
          <template #img>
            <img :src="require('@/images/사람.jpg')" class="card-img-top" alt="Image">
          </template>
          <b-card-text>
            사람은 의식적인 자기상, 환경과 관계방식을 나타냅니다.
          </b-card-text>
          <template #footer>
            <b-button href="#" variant="primary">무료 검사</b-button>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
