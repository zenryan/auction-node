<template>
  <div class="bg-gray-100 relative pt-2">
    <div
      ref="messageContainer"
      class="text-xs overflow-y-auto"
      style="height: 50vh;"
      @click="clearOverlay"
    >
      <div
        :class="msg.own ? 'text-right' : false"
        v-for="msg in messages"
        v-bind:key="msg.id"
      >
        <template v-if="msg.type === 'SYSTEM'">
          <SystemMessage :message="msg.message" />
        </template>
        <template v-if="msg.type === 'BID'">
          <div class="p-3">
            <p>
              <label class="bg-blue-300 rounded-full p-2 text-bold text-xs">
                New bid : {{ msg.message }}
              </label>
            </p>
          </div>
        </template>
        <template v-if="msg.type === 'USER'">
          <UserMessage :name="msg.name" :message="msg.message" />
        </template>
      </div>
    </div>
    <div
      class="flex flex-wrap bottom-0 left-0 bg-gray-200 w-full h-12 item-center"
    >
      <input
        class="flex-1 typing-input m-2 py-2 px-4 text-xs rounded"
        type="text"
        placeholder="Type message here ..."
        v-model="inputMessage"
        @keyup.enter="sendMessage"
      />
      <div class="flex self-strecth rounded mx-3 py-3" @click="sendMessage">
        <Send />
      </div>
      <div class="flex self-strecth rounded mx-3 py-3" @click="toggleBidInput">
        <Window />
      </div>
    </div>
    <OnlineUsers
      class="absolute z-1 top-0 right-0 w-4/6 md:w-2/6"
      :auction="auction"
      :show="showOnlineUsers"
    />
    <div v-on:keyup.escape="clearOverlay">
      <BidInput
        class="bid-input absolute z-1 bottom-0 right-0 w-4/6 md:w-2/6"
        :show="showBidInput"
        :item="auction_item"
        @submitBid="onSubmitBid"
      />
    </div>
  </div>
</template>

<script>
import UserMessage from './UserMessage.vue';
import SystemMessage from './SystemMessage.vue';
import Send from './svg/Send.vue';
import Window from './svg/Window.vue';
import OnlineUsers from './OnlineUsers.vue';
import BidInput from './BidInput.vue';

export default {
  props: {
    auction: {
      type: Object,
      default() {
        return {};
      },
    },
    user: {
      required: true,
      default() {
        return {};
      },
    },
    showOnlineUsers: {
      default() {
        return false;
      },
    },
    auction_item: {
      type: Object,
      default() {
        return {
          bid_price: 0,
        };
      },
    },
  },
  components: {
    UserMessage,
    SystemMessage,
    Send,
    Window,
    OnlineUsers,
    BidInput,
  },
  data() {
    return {
      inputMessage: '',
      messages: [],
      showBidInput: true,
    };
  },
  watch: {
    auction(auction) {
      this.fetchMessages(auction.id);
    },
    user(user) {
      if (user.id) {
        this.joinChat();
      }
    },
  },

  sockets: {
    connect() {
      if (this.user) this.joinChat();
    },
  },

  created() {
    window.addEventListener('beforeunload', async () => {
      await this.$socket.emit('roomLeave', {
        type: 'auction',
        uuid: this.auction.uuid,
        user: this.user,
      });
    });
  },

  mounted() {
    if (this.auction) this.fetchMessages(this.auction.id);
  },

  methods: {
    async fetchMessages(auctionId) {
      try {
        if (!auctionId) return;
        const url = `/auction/${auctionId}/messages`;
        const response = await this.$http.get(url);
        this.messages = response.data.messages;
        this.scrollToLast();
      } catch (e) {
        console.error(e);
      }
    },

    scrollToLast() {
      this.$nextTick(() => {
        const content = this.$refs.messageContainer;
        content.scrollTop = content.scrollHeight;
      });
    },

    joinChat() {
      // join to auction room
      this.$socket.emit('roomJoin', {
        type: 'auction',
        uuid: this.auction.uuid,
        user: this.user,
      });

      this.sockets.subscribe('roomMsg', (message) => {
        this.messages.push(message);
        this.scrollToLast();
      });

      this.sockets.subscribe('bidMsg', (message) => {
        this.messages.push({
          id: `${new Date().getTime()}-${message.user_id}`,
          type: message.type,
          message: message.message,
          name: message.name,
        });
        this.$emit('setBidPrice', message.price);
        this.scrollToLast();
      });

      this.sockets.subscribe('userLeft', (user) => {
        this.messages.push({
          id: `${new Date().getTime()}-${user.id}`,
          type: 'SYSTEM',
          message: `${user.name} has left`,
          name: user.name,
        });
        this.scrollToLast();
      });

      this.sockets.subscribe('userJoined', (user) => {
        this.messages.push({
          id: `${new Date().getTime()}-${user.id}`,
          type: 'SYSTEM',
          message: `${user.name} has joined`,
          name: user.name,
        });
        this.scrollToLast();
      });
    },

    async sendMessage() {
      try {
        if (!this.inputMessage) return;

        const body = {
          type: 'auction',
          uuid: this.auction.uuid,
          user: this.user,
          message: this.inputMessage,
        };
        this.$socket.emit('roomMsg', body);
        this.inputMessage = '';
      } catch (e) {
        console.error(e);
      }
    },

    toggleBidInput() {
      this.showBidInput = !this.showBidInput;
    },

    onSubmitBid(price) {
      try {
        const { auction_item_id: auctionItemId } = this.auction_item;
        const url = `/bid/${auctionItemId}`;
        this.$http.post(url, {
          price,
          user_id: this.user.id,
        });
        this.$emit('setBidPrice', price);
      } catch (err) {
        console.error(err);
      }
    },
    clearOverlay() {
      this.showBidInput = false;
      this.$emit('hideOnlineUser');
    },
  },

  async beforeDestroy() {
    await this.$socket.emit('roomLeave', {
      type: 'auction',
      uuid: this.auction.uuid,
      user: this.user,
    });
  },
};
</script>

<style>
.bid-input {
  bottom: 42px;
}
</style>
