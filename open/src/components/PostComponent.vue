<template>
  <div>
    <q-card
      class="my-card q-mb-md"
      flat
      bordered
      data-aos="fade-right"
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar
            color="grey-3"
            text-color="black"
            icon="eva-person-outline"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">
            <!-- {{ getUserById(post.userId).name }} -->
            {{post.subreddit}}
          </q-item-label>
          <q-item-label caption>{{ post.location }} </q-item-label>
        </q-item-section>
        
      </q-item>

      <q-separator />

      <img :src="post.imageUrl" />
      <q-card-section horizontal>
        <q-card-section>
          <div>
            {{ post.caption }}
          </div>
          <div class="text-caption text-grey">
            {{ post.date }}
            <!-- {{ post.date | niceDate }} -->
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
   
  </div>
</template>

<script>
export default {
  props: ['post', 'selectedPostInfo','posts'],
  data() {
    return {
      dialogRecipe: false,
      selectedPost: this.selectedPostInfo
    };
  },
  methods: {
    onRecipeClick(p) {
      this.dialogRecipe = true;
      this.selectedPost = this.posts.find(post => post.id === p.id);
      console.log(this.selectedPost);
    },
  }
};
</script>

<style lang="sass" scoped>
</style>