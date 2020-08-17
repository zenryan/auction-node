<template>
  <aside
    class="w-1/4 px-6 py-4 flex flex-col bg-orange-200 dark:bg-black
      dark:text-gray-400 rounded-r-lg overflow-y-auto"
  >
    <!-- Right side NavBar -->

    <div class="flex items-center justify-between">
      <!-- Info -->

      <a href="inbox/" class="relative">
        <!-- Left side -->

        <span>
          <svg
            class="h-5 w-5 hover:text-red-600 dark-hover:text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </span>

        <div class="absolute w-2 h-2 left-0 mb-6 ml-2 bottom-0">
          <span class="px-2 py-1 bg-red-600 rounded-full text-white text-xs">7</span>
        </div>
      </a>

      <div class="flex items-center">
        <!-- Right side -->

        <img
          class="h-10 w-10 rounded-full object-cover"
          src="https://i.pinimg.com/originals/68/e1/e1/68e1e137959d363f172dc3cc50904669.jpg"
          alt="tempest profile"
        />

        <button class="ml-1 focus:outline-none">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 192 512">
            <path
              d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72

72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72

72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0

352c0 39.8 32.2 72 72 72s72-32.2

72-72-32.2-72-72-72-72 32.2-72 72z"
            />
          </svg>
        </button>
      </div>
    </div>

    <span class="mt-4 text-gray-600">Yang lagi auction sekarang</span>
    <span class="mt-1 text-3xl font-semibold">200 Auctions</span>

    <div class="block rounded-t overflow-hidden bg-white text-center w-24">
      <div class="bg-red-600 text-white py-1">Feb</div>
      <div class="pt-1 border-l border-r">
        <span class="text-4xl font-bold">9</span>
      </div>
      <div class="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between">
        <span class="text-xs font-bold">Fri</span>
        <span class="text-xs font-bold">2018</span>
      </div>
    </div>

    <button
      class="mt-8 flex items-center py-4 px-3 text-white rounded-lg
        bg-green-400 shadow focus:outline-none"
    >
      <!-- Action -->

      <svg class="h-5 w-5 fill-current mr-2 ml-3" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>

      <span>Bill your Students</span>
    </button>

    <div class="mt-12 flex items-center">
      <!-- Payments -->
      <span>Payments</span>
      <button class="ml-2 focus:outline-none">
        <svg class="h-5 w-5 fill-current" viewBox="0 0 256 512">
          <path
            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9

0l-22.6-22.6c-9.4-9.4-9.4-24.6

0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3

103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1

34z"
          />
        </svg>
      </button>
    </div>

    <a
      href="/"
      class="mt-8 p-4 flex justify-between bg-gray-300 rounded-lg font-semibold capitalize"
    >
      <!-- link -->

      <div class="flex">
        <img
          class="h-10 w-10 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1RZ5sKLtFG-Q2xfXlLa5DbFsmF52Gc-C49B4s63CtSxLkzQY&s"
          alt="veldora profile"
        />

        <div class="flex flex-col ml-4">
          <span>veldora</span>
          <span class="text-sm text-gray-600">english</span>
        </div>
      </div>

      <span>$ 25</span>
    </a>

    <a
      href="/"
      class="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg font-semibold capitalize"
    >
      <!-- link -->

      <div class="flex">
        <img
          class="h-10 w-10 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1RZ5sKLtFG-Q2xfXlLa5DbFsmF52Gc-C49B4s63CtSxLkzQY&s"
          alt="accelerator profile"
        />

        <div class="flex flex-col ml-4">
          <span>accelerator</span>
          <span class="text-sm text-gray-600">english</span>
        </div>
      </div>

      <span>$ 25</span>
    </a>

    <a
      href="/"
      class="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg font-semibold capitalize"
    >
      <!-- link -->

      <div class="flex">
        <img
          class="h-10 w-10 rounded-full object-cover"
          src="../assets/logo.png"
          alt="syndicate profile"
        />

        <div class="flex flex-col ml-4">
          <span>syndicate</span>
          <span class="text-sm text-gray-600">english</span>
        </div>
      </div>

      <span>$ 25</span>
    </a>

    <div class="mt-4 flex justify-center capitalize text-blue-600">
      <a href="expenses-dashboard/">see all</a>
    </div>

    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
        hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >Button</button>

    <div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="/assets/images/logo.svg" alt="Logo" />
      </div>
      <div class="ml-6 pt-1">
        <h4 class="text-xl text-gray-900 leading-tight">ChitChat</h4>
        <p class="text-base text-gray-600 leading-normal">You have a new message!</p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      result: {},
      error: '',
    };
  },
  methods: {},
};
</script>
