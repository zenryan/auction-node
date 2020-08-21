<template>
  <div>
    <Suggestion
      v-model="searchQuery"
      :options="searchOptions"
      :onItemSelected="onSearchItemSelected"
      :onInputChange="onInputChange"
    >
      <div slot="item" slot-scope="props" class="single-item">
        <template v-if="props.url">
          <div
            class="image-wrap"
            :style="{
              backgroundImage: 'url(' + props.item.Icon.URL + ')',
            }"
          ></div>
        </template>
        <div>
          <h2 class="text-2xl font-semibold leading-tight py-1">
            {{ props.item.title }}
          </h2>
          <p class="text-gray-600 text-md italic">{{ props.item.desc }}</p>
          <p class="text-gray-600 text-xs italic">{{ props.item.detail }}</p>
        </div>
      </div>
    </Suggestion>

    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-b-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr class="text-left">
              <th
                class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100"
              >
                <label
                  class="text-teal-500 inline-flex justify-between
                      items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    class="form-checkbox focus:outline-none focus:shadow-outline"
                    @click="selectAllCheckbox($event)"
                  />
                </label>
              </th>
              <th
                v-for="head in itemHeader"
                :key="head.name"
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
                    text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="border-dashed border-t border-gray-200 px-3 bg-white">
                <label
                  class="text-teal-500 inline-flex justify-between items-center
                      hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    class="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                    :name="item.id"
                    @click="getRowDetail($event, item.id)"
                  />
                </label>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                      class="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ item.title }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ item.desc }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ item.price }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  class="relative inline-block px-3 py-1 font-semibold text-green-900
                      leading-tight"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span class="relative">Active</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Suggestion from '../ui/Suggestion.vue';

export default {
  components: {
    Suggestion,
  },
  data() {
    return {
      searchQuery: '',
      selectedSearchItem: null,
      searchOptions: {
        inputClass: `appearance-none block w-full bg-gray-200
          text-gray-700 border rounded py-3 pl-8 pr-6 
          leading-tight focus:outline-none focus:bg-white
          focus:border-gray-500`,
      },
      searchValue: '',
      itemHeader: [
        { name: 'Title' },
        { name: 'Description' },
        { name: 'Price' },
        { name: '' },
      ],
      items: [],
      auctionId: 1,
    };
  },
  methods: {
    onInputChange(query) {
      if (query.trim().length === 0) {
        return null;
      }
      const url = `/item/search?q=${query}`;
      return new Promise((resolve) => {
        this.$http.get(url).then((response) => {
          const searchItems = [];
          response.data.forEach((item) => {
            if (item.title) {
              searchItems.push(item);
            }
          });
          resolve(searchItems);
        });
      });
    },
    async onSearchItemSelected(item) {
      try {
        this.selectedSearchItem = item;
        const url = `/auction/${this.auctionId}/item/${item.id}`;
        const response = await this.$http.post(url);
        this.items.push(response.data.item);
        this.searchQuery = '';
      } catch (e) {
        console.log(e);
      }
    },

    selectAllCheckbox($event) {
      const columns = document.querySelectorAll('.rowCheckbox');

      this.selectedRows = [];

      if ($event.target.checked === true) {
        columns.forEach((column) => {
          column.checked = true;
          this.selectedRows.push(parseInt(column.name, 10));
        });
      } else {
        columns.forEach((column) => {
          column.checked = false;
        });
        this.selectedRows = [];
      }
    },

    getRowDetail($event, id) {
      const rows = this.selectedRows;

      if (rows.includes(id)) {
        const index = rows.indexOf(id);
        rows.splice(index, 1);
      } else {
        rows.push(id);
      }
    },
  },
};
</script>
