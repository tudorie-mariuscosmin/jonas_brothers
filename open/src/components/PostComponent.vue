<template>
  <div>
    <q-card
      class="my-card q-mb-md"
      flat
      bordered
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
            USER ID
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
        <q-space />
        <div>
          <q-btn
            @click="onRecipeClick(post)"
            class="q-ma-md"
            round
            unelevated
            size="16px"
            color="primary"
            icon="eva-file-text-outline"
            text-color="black"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialogRecipe">
      <q-card class="dialogBox">
        <q-card-section class="row">
          <div class="q-pr-lg text-h6">
            {{ selectedPost.caption }}
          </div>
          <q-space />
          <q-btn v-close-popup dense flat rounded icon="close" />
        </q-card-section>
        <q-card-section>
          <div v-html="selectedPost.recipe"></div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="q-ma-sm"
            round
            unelevated
            size="16px"
            text-color="black"
            color="primary"
            label="OK"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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