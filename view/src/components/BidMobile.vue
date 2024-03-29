<template>
  <div class="container mx-auto">
    <AuctionCarousel
      :auction="auction"
      :items="auction_items"
      @auctionStatusChanged="setAuctionStatus"
      @itemChanged="handleItemChanged"
    />

    <!-- page body -->
    <div class="flex items-stretch p-2 bg-blue-300">
      <div class="flex-1 text-left">
        <p>{{ auction.title }}</p>
        <p class="text-xs ">{{ auction.desc }}</p>
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
      v-if="auctionStatus.status === 'STARTED' && auction_items.length"
      :auction="auction"
      :user="user"
      :showOnlineUsers="showOnlineUsers"
      :auction_item="auction_items[itemChoosen]"
      @setBidPrice="handleSetBidPrice"
      @hideOnlineUser="hideOnlineUser"
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
      auction_items: [],
      auctionStatus: {
        status: '',
        msg: '',
        timer: '',
      },
      itemChoosen: 0,
      showOnlineUsers: false,
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
      await this.fetchAuctionItems(this.auction.id);
    }
    // TODO: hard coded, refactor when login is implemented
    this.user = await JSON.parse(localStorage.getItem('user'));
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

    async fetchAuctionItems(auctionId) {
      const url = `/auction/${auctionId}/item`;
      const res = await this.$http.get(url);
      this.auction_items = res.data.items;
    },

    toggleUser() {
      this.showOnlineUsers = !this.showOnlineUsers;
    },

    hideOnlineUser() {
      this.showOnlineUsers = false;
    },

    handleItemChanged(idx) {
      this.itemChoosen = idx;
    },

    handleSetBidPrice(price) {
      this.auction_items[this.itemChoosen].bid_price = price;
    },
  },
};
</script>
