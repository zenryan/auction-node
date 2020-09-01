<template>
  <div>
    <div class="container mx-auto p-1 xl:p-5">
      <!-- page header -->
      <div class="flex items-stretch">
        <div class="flex-1 text-left left-0 py-2">
          <h2 class="text-2xl font-semibold leading-tight py-2 text-orange-400">
            Manage auction
          </h2>
        </div>
        <div class="self-center flex-1 text-center py-2"></div>
        <div class="flex-1 text-gray-700 text-center py-2">
          <div class="float-right">
            <SaveButton @click="onClickSave" text="Save auction" />
          </div>
        </div>
      </div>

      <!-- error notification -->
      <div
        v-if="this.error"
        class="bg-red-200 border-t-4 border-red-600 rounded-b
                  text-red-600 px-4 py-3 shadow-md my-2"
        role="alert"
      >
        <div class="flex">
          <svg
            class="h-6 w-6 my-2 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93
                            10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0
                            11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            />
          </svg>
          <div>
            <p class="font-bold">Sorry we are unable to save auction</p>
            <p class="text-sm">Make sure all the fields are correct.</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <!-- Title -->
          <div
            class="border col-span-1 xl:col-span-2 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
          >
            <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="name" class="bg-white text-gray-600 px-1"
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
                <label for="lastname" class="bg-white text-gray-600 px-1"
                  >Starting price *</label
                >
              </p>
            </div>
            <p>
              <input
                v-model="form.startprice"
                autocomplete="false"
                class="py-1 px-1 outline-none block h-full w-full"
              />
            </p>
          </div>

          <!-- Description -->
          <div
            class="border col-span-1 xl:col-span-3 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
          >
            <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="username" class="bg-white text-gray-600 px-1"
                  >Description *</label
                >
              </p>
            </div>
            <p>
              <input
                v-model="form.desc"
                autocomplete="false"
                class="py-1 px-1 outline-none block h-full w-full"
              />
            </p>
          </div>

          <!-- Start date -->
          <div
            class="border col-span-1 xl:col-span-1 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
          >
            <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="username" class="bg-white text-gray-600 px-1"
                  >Start date *</label
                >
              </p>
            </div>
            <p>
              <Datetime type="datetime" v-model="form.startdate"></Datetime>
            </p>
          </div>

          <!-- End date -->
          <div
            class="border col-span-1 xl:col-span-1 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
          >
            <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="username" class="bg-white text-gray-600 px-1"
                  >End date *</label
                >
              </p>
            </div>
            <p>
              <Datetime type="datetime" v-model="form.enddate"></Datetime>
            </p>
          </div>

          <div
            class="col-span-1 xl:col-span-3 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500"
          >
            <SelectAuctionItems v-show="form.id" :auctionId="form.id" />
          </div>

          <!-- Detail -->
          <div
            class="border col-span-1 xl:col-span-3 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
          >
            <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="username" class="bg-white text-gray-600 px-1"
                  >Detail description
                </label>
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
  </div>
</template>

<script>
import Datetime from '../ui/Datetime.vue';
import SelectAuctionItems from './SelectAuctionItems.vue';
import Editor from '../ui/Editor.vue';
import SaveButton from './SaveButton.vue';

export default {
  components: {
    Datetime,
    SelectAuctionItems,
    Editor,
    SaveButton,
  },
  data() {
    return {
      error: null,
      form: {
        title: '',
        desc: '',
        startprice: 0,
        detail: '',
        startdate: '',
        enddate: '',
      },
      editorEditable: true,
      auctionId: null,
    };
  },
  async mounted() {
    this.$refs.title.focus();
    this.auctionId = this.$route.params.auctionId;
    if (this.auctionId) {
      await this.fetchAuction(this.auctionId);
      this.$refs.editor.setContent(this.form.detail);
    }
  },
  methods: {
    async onClickSave() {
      try {
        const response = await this.$http.post('/auction/create', {
          auction: this.form,
        });
        this.form = response.data.body.auction;
        this.error = null;
      } catch (e) {
        console.error(`Error ${JSON.stringify(e.response.data)}`);
        this.error = e.response.data.error;
      }
    },
    async fetchAuction(auctionId) {
      try {
        const response = await this.$http.get(`/auction/${auctionId}`);
        this.form = response.data.auction;
      } catch (e) {
        console.error(`Error ${JSON.stringify(e.response.data)}`);
        this.error = e.response.data.error;
      }
    },
  },
};
</script>
