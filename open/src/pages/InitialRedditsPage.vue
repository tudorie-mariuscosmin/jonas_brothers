<template>
  <q-page class="q-pa-md">
    <div
      class="
        fit
        row
        wrap
        justify-evenly
        items-start
        content-start
        q-gutter-md q-gutter-y-lg
      "
    >
      <subreddit-bubble
        v-for="(sub, index) in subs"
        :key="index"
        :sub="sub"
        @click="() => handleClick(sub)"
      />
    </div>
    <q-inner-loading
      :showing="isLoading"
      label="Please wait..."
      label-style="font-size: 1.1em"
    />
  </q-page>
</template>
<script>
import SubredditBubble from "../components/SubredditBubble.vue";
export default {
  name: "InitialRedditsPage",
  components: {
    SubredditBubble,
  },
  data() {
    return {
      subs: [],
      isLoading: false,
    };
  },
  async created() {
    try {
      this.isLoading = true;
      const { data } = await this.$axios.get("/api/subreddits/all");
      console.log(data);
      this.subs = data;
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      console.log(err);
    }
  },
  methods: {
    async handleClick(sub) {
      if (sub.isFollowed) {
        await this.$axios.delete(`/api/subreddits/${sub.name}`);
        sub.isFollowed = false;
        this.subs = [...this.subs];
      } else {
        await this.$axios.post(`/api/subreddits`, {
          ...sub,
        });
        sub.isFollowed = true;
        this.subs = [...this.subs];
      }
    },
  },
};
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
