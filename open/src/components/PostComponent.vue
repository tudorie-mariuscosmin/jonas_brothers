<template>
  <div>
    <q-card
      class="my-card q-pa-sm q-mb-lg q-mx-sm transparent"
      flat
      data-aos="fade-right"
      
    >
    <div class="row">
      <div class="col-2">
        <q-item-section avatar>
          <q-avatar size="40px">
            <q-img fit="contain" v-if="post.subPhoto" :src="post.subPhoto" />
          </q-avatar>
        </q-item-section>
      </div>
      <div class="col-10">
        <q-item-label class="text-bold">
            <!-- {{ getUserById(post.userId).name }} -->
            r/{{ post.subreddit }}
          </q-item-label>
          <p>Posted by {{ post.author_fullname }}</p>
      </div>
    </div>

      

        <q-item-section>
          
          <q-item-label class="q-mb-sm text-body1 text-weight-medium"
            >{{ post.title }}
          </q-item-label>
        </q-item-section>

      <img v-if="post.photo" :src="post.photo" />
      <q-card-section horizontal>
        <div>
          {{ post.caption }}
        </div>
        <div class="text-caption text-grey">
          {{ post.date }}
          <!-- {{ post.date | niceDate }} -->
        </div>
      </q-card-section>
      <q-btn flat round color="black" icon="eva-share-outline" />
      <q-btn flat round color="black" icon="eva-message-circle-outline" />
      <div class="float-right">
        <q-btn flat round color="black" icon="eva-bookmark-outline" />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["post", "selectedPostInfo", "posts"],
  data() {
    return {
      dialogRecipe: false,
      selectedPost: this.selectedPostInfo,
    };
  },
  methods: {
    onRecipeClick(p) {
      this.dialogRecipe = true;
      this.selectedPost = this.posts.find((post) => post.id === p.id);
      console.log(this.selectedPost);
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
