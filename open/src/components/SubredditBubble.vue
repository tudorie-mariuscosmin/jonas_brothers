<template>
  <div class="column align-center justify-center">
    <q-btn
      round
      :class="`q-mx-auto  ${
        bounce ? 'animate__fast animate__animated animate__pulse ' : ''
      }a`"
      style="width: 70px"
      @click="onClick"
    >
      <q-badge
        rounded
        v-if="sub.isFollowed"
        color="secondary"
        floating
        align="middle"
      ></q-badge>
      <q-avatar size="70px">
        <q-img fit="contain" v-if="sub.photo" :src="sub.photo" />
        <template v-else>{{ sub.name[0] }}</template>
      </q-avatar>
    </q-btn>
    <div class="text-center q-mt-xs text-weight-bold">r/{{ sub.name }}</div>
  </div>
</template>

<script>
export default {
  name: "SubredditBubble",
  props: {
    sub: Object,
  },
  data() {
    return {
      bounce: false,
    };
  },
  methods: {
    async onClick() {
      console.log("called");
      this.bounce = true;
      await setTimeout(() => {
        this.bounce = false;
      }, 1000);
    },
  },
};
</script>

<style>
</style>
