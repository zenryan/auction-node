<template>
  <div class="container mx-auto p-1 xl:p-5">
    <!-- page header -->
    <div class="flex items-stretch">
      <div class="flex-1 text-left left-0 py-2">
        <h2 class="text-2xl font-semibold leading-tight py-2 text-orange-400">
          Manage item
        </h2>
      </div>
      <div class="self-center flex-1 text-center py-2"></div>
      <div class="flex-1 text-gray-700 text-center py-2">
        <div class="float-right">
          <SaveButton text="Save item" @click="onClickSave" />
        </div>
      </div>
    </div>

    <!-- error notification -->
    <div
      v-if="this.error"
      class="bg-red-200 border-t-4 border-red-600 rounded-b text-red-600 px-4 py-3
              shadow-md my-2"
      role="alert"
    >
      <div class="flex">
        <svg
          class="h-6 w-6 my-2 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8
                    8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
        <div>
          <p class="font-bold">Sorry we are unable to save item</p>
          <p class="text-sm">Make sure all the fields are correct.</p>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="w-56 col-span-3">
          <div
            class="shadow flex rounded items-end h-56 justify-end bg-cover"
            :style="{ backgroundImage: `url(${itemImage})` }"
          >
            <template v-if="!form.avatar">
              <UploadInput v-if="!form.avatar" @file-chosen="uploadFile" />
            </template>
            <template v-else>
              <button
                @click="removeImage"
                class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-1 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              >
                <img
                  class="w-5 h-5"
                  src="http://localhost:3000/images/minus.png"
                />
              </button>
            </template>
          </div>
        </div>

        <!-- Title -->
        <div
          class="border col-span-1 xl:col-span-2 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
        >
          <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label ref="title" class="bg-white text-gray-600 px-1"
                >Title *</label
              >
            </p>
          </div>
          <p>
            <input
              ref="title"
              v-model="form.title"
              autocomplete="false"
              class="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </p>
          <!-- <p class="text-red-500 text-xs italic mt-2">
              Please fill out this field.
            </p> -->
        </div>

        <!-- Starting price -->
        <div
          class="border col-span-1 xl:col-span-1 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
        >
          <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="name" class="bg-white text-gray-600 px-1"
                >Starting price *</label
              >
            </p>
          </div>
          <p>
            <input
              v-model="form.price"
              autocomplete="false"
              class="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </p>
        </div>

        <!-- Description -->
        <div
          class="border col-span-3 xl:col-span-3 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
        >
          <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="name" class="bg-white text-gray-600 px-1"
                >Description *</label
              >
            </p>
          </div>
          <p>
            <input
              v-model="form.desc"
              autocomplete="false"
              class="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </p>
        </div>

        <!-- Detail -->
        <div class="border col-span-3 xl:col-span-3 relative rounded p-1">
          <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="name" class="bg-white text-gray-600 px-1"
                >Detail description *</label
              >
            </p>
          </div>
          <p>
            <Editor
              ref="editor"
              v-model="form.detail"
              :editable="editorEditable"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '../ui/Editor.vue';
import UploadInput from './UploadInput.vue';
import SaveButton from './SaveButton.vue';

export default {
  components: {
    Editor,
    UploadInput,
    SaveButton,
  },

  computed: {
    itemImage() {
      return (
        this.form.avatar || `${process.env.API_HOST}/images/item-default.png`
      );
    },
  },

  directives: {
    uploader: {
      bind(el, binding, vnode) {
        el.addEventListener('change', (e) => {
          const [file] = e.target.files;
          if (file !== undefined) {
            // vnode.context.file is directive talk for this.file
            vnode.context.file = file;
          }
        });
      },
    },
  },

  data() {
    return {
      error: null,
      form: {
        title: 'Item',
        desc: 'Item description',
        detail: 'default',
        price: '100',
        avatar: null,
      },
      editorEditable: true,
      itemId: null,
      file: null,
    };
  },

  async mounted() {
    this.$refs.title.focus();
    this.itemId = this.$route.params.itemId;
    if (this.itemId) {
      await this.fetchItem(this.itemId);
      this.$refs.editor.setContent(this.form.detail);
    }
  },
  methods: {
    async fetchItem(itemId) {
      try {
        const url = `/item/${itemId}`;
        const response = await this.$http.get(url);

        if (response.data.item) this.form = response.data.item;
      } catch (e) {
        console.error(e);
      }
    },

    async onClickSave() {
      try {
        const response = await this.$http.post('/item/create', {
          item: this.form,
          mode: 'cors',
        });
        this.form = response.data.body.item;
        this.error = null;
      } catch (e) {
        console.error(`Error ${JSON.stringify(e.response.data)}`);
        this.error = e.response.data.error;
      }
    },

    removeImage() {
      console.log('update image');
      this.form.avatar = null;
      this.onClickSave();
    },

    async uploadFile(file) {
      // restrict file to 5mb
      if (file.size / 1024 / 1024 > 5) {
        // handle error
        return undefined;
      }

      // Check the allowed content type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        // handle error
        return undefined;
      }

      const url = '/item/avatar';
      const form = new FormData();
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      try {
        form.append('picture', file);
        form.append('item_id', this.$route.params.itemId);

        const result = await this.$http.post(url, form, config);

        this.imageUploadInProgress = true;
        // Handle Upload and return URL
        this.form.avatar = result.data.body.item.avatar || null;
        return true;
      } catch (e) {
        this.imageUploadInProgress = true;
        console.error(e);
        return undefined;
      }
    },
  },
};
</script>
