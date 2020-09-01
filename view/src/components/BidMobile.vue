<template>
  <div class="container mx-auto">
    <AuctionCarousel
      :auction="auction"
      @auctionStatusChanged="setAuctionStatus"
    />

    <!-- page body -->
    <div class="flex items-strecth p-2 bg-blue-300">
      <div class="flex-1 text-left">
        <p>{{ auction.title }}</p>
      </div>
      <div class="flex-1 text-right">
        <button class="px-2" @click="toggleUser(true)">
          <TeamFill height="24" />
        </button>
        <router-link to="/app/bid/1/web">
          <button class="px-2">
            <Window />
          </button>
        </router-link>
        <template v-if="expandDetail">
          <button @click="setExpandDetail(false)">
            <Up />
          </button>
        </template>
        <template v-else>
          <button @click="setExpandDetail(true)">
            <Down />
          </button>
        </template>
      </div>
    </div>

    <!-- editor -->
    <div
      v-if="expandDetail"
      class="shadow-xl overflow-y-auto overflow-x-auto p-2 bg-blue-300"
      sytle="max-height:  50vh"
    >
      <Editor
        class="bg-white rounded"
        ref="editor"
        v-model="auction.detail"
        v-bind:editable="false"
      />
    </div>

    <!-- messages -->
    <Messages
      v-if="auctionStatus.status === 'STARTED'"
      :auction="auction"
      :user="user"
    >
    </Messages>
  </div>
</template>

<script>
import Down from './svg/Down.vue';
import Up from './svg/Up.vue';
import Window from './svg/Window.vue';
import TeamFill from './svg/TeamFill.vue';
import Editor from '../ui/Editor.vue';
import AuctionCarousel from './AuctionCarousel.vue';
import Messages from './Messages.vue';

export default {
  components: {
    Down,
    Up,
    Window,
    TeamFill,
    Editor,
    AuctionCarousel,
    Messages,
  },

  data() {
    return {
      user: null,
      expandDetail: false,
      auction: {
        title: '',
        desc: '',
        detail: '',
        startdate: '',
        enddate: '',
      },
      auctionStatus: {
        status: '',
        msg: '',
        timer: '',
      },
    };
  },

  computed: {
    showMessages() {
      return ['STARTED', 'STARTING'].indexOf(this.auctionStatus.status) >= 0;
    },
  },

  async mounted() {
    this.auctionId = this.$route.params.auctionId;
    if (this.auctionId) {
      await this.fetchAuction(this.auctionId);
      if (this.$refs.editor) this.$refs.editor.setContent(this.auction.detail);
    }
    // TODO: hard coded, refactor when login is implemented
    this.user = JSON.parse(localStorage.getItem('user'));
  },

  methods: {
    setExpandDetail(val) {
      this.expandDetail = val;
    },

    setAuctionStatus(auctionStatus) {
      this.auctionStatus = auctionStatus;
    },

    async fetchAuction(auctionId) {
      try {
        const url = `/auction/${auctionId}`;
        const response = await this.$http.get(url);
        if (response.data.auction) {
          this.auction = response.data.auction;
        }
      } catch (e) {
        console.error(e);
      }
    },

    toggleUser() {
      console.log('toggleUser');
    },
  },
};
</script>
