<template>
  <q-page class="constrain q-pa-md">
    <q-table
      title="Choose Reddits"
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      grid
      hide-header
	  hide-bottom
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:item="props">
        <div
          class="
            q-pa-xs
            col-xs-12 col-sm-6 col-md-4 col-lg-3
            grid-style-transition
          "
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-blue-2' : ''"   flat>

            <q-card-section>
              <q-checkbox dense v-model="props.selected">
                <q-item clickable v-ripple>
                  <q-item-section side>
                    <q-avatar size="48px">
                      <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ props.row.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-checkbox>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
	<q-chip v-for="reddit in selected" :key="reddit.name"
            :reddit="reddit">
        <q-avatar>
          <img :src=reddit.imageUrl>
        </q-avatar>
        {{reddit.name}}
      </q-chip>
<!-- 
    <p>{{ selected }}</p> -->
  </q-page>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref, computed, watch } from 'vue'

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "imageUrl",
    align: "center",
    label: "imageUrl",
    field: "imageUrl",
    sortable: true,
  }
];

const rows = [
  {
    name: "Frozen Yogurt",
	imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Ice cream sandwich",
	imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Eclair",
   	imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Cupcake",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Gingerbread",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Jelly bean",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Lollipop",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Honeycomb",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Donut",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "KitKat",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
];

export default {
  setup() {
	const $q = useQuasar()

    function getItemsPerPage () {
      return 50
    }

    const filter = ref('')
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })
    return {
      filter: ref(""),
      selected: ref([]),
      columns,
      rows,
      pagination,
	   rowsPerPageOptions: computed(() => {
        return 50
      })
    };
  },
};
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>