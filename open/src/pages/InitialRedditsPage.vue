<template>
  <q-page class="q-pa-md q-mx-auto" style="max-width: 600px">
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
    <q-dialog seamless v-model="dialog" position="bottom">
      <q-card style="width: 350px">
        <q-btn flat round icon="close" class="float-right" v-close-popup />
        <q-card-section class="row justify-between items-center no-wrap">
          <div class="column">
            <div>
              <q-avatar size="70px" class="shadow-1">
                <q-img
                  fit="contain"
                  v-if="selected.photo"
                  :src="selected.photo"
                />
                <template v-else>{{ selected.name[0] }}</template>
              </q-avatar>
            </div>
          </div>
          <div>
            <div class="row no-wrap">
              <div class="column justify-start" style="width: 150px">
                <div class="text-h6">
                  {{ selected.name }}
                </div>
                <q-btn
                  :flat="selected.isFollowed"
                  :outline="!selected.isFollowed"
                  :color="selected.isFollowed ? '' : 'green'"
                  @click="() => subscribe(selected)"
                  >{{ selected.isFollowed ? "subscribed" : "subscribe" }}</q-btn
                >
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
      dialog: false,
      selected: null,
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
      this.selected = sub;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async subscribe(sub) {
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
