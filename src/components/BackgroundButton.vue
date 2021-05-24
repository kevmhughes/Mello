<template>
  <div
    class="img-button"
    :style="{'background-image': 'url(' + require('../assets/' + image + '.jpg') + ')'}"
    @click="setBackground(board, image, oldImg, imgIndex)"
  ></div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    oldImg: {
      type: String,
      required: true,
    },
    imgIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setBackground(board, newImg, oldImg, imgIndex) {
      let oldImgTN = '';
      const oldImgNewLength = oldImg.length - 5;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < oldImgNewLength; i++) {
        const letter = oldImg[i];
        oldImgTN += letter;
      }
      const newImgFull = `${newImg}_full`;
      this.$store.commit('CHANGE_IMAGE', {
        board,
        newImgFull,
        oldImgTN,
        imgIndex,
      });
    },
  },
};
</script>

<style scoped>
.img-button {
  background-color: rgba(0, 0, 0, 0);
  width: 35px;
  height: 35px;
  float: right;
  margin: 5px;
  background-size: cover;
}
.img-button:hover {
  cursor: pointer;
}
</style>
