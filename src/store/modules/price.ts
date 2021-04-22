import Vue from 'vue';
import config from '@/config';

const ENDPOINT = 'https://api.coingecko.com/api/v3';

const state = {
  values: {}
};

const mutations = {
  GET_PRICE_REQUEST() {
    console.debug('GET_PRICE_REQUEST');
  },
  GET_PRICE_SUCCESS(_state, payload) {
    for (const address in payload) {
      const price = payload[address];
      Vue.set(_state.values, address, price);
    }
    console.debug('GET_PRICE_SUCCESS');
  }
};

const actions = {
  loadPricesById: async ({ commit }, payload) => {
    commit('GET_PRICE_REQUEST');
    const idString = payload.join('%2C');
    let data;
    try {
      const url = `${ENDPOINT}/simple/price?ids=${idString}&vs_currencies=usd`;
      const response = await fetch(url);
      data = await response.json();
    } catch (e) {
      return;
    }
    const idToAddressMap = {};
    for (const address in config.tokens) {
      const id = config.tokens[address].id;
      if (!id) {
        continue;
      }
      idToAddressMap[id] = address;
    }
    const prices = {};
    for (const id in data) {
      const price = data[id].usd;
      const address = idToAddressMap[id];
      prices[address] = price;
    }
    commit('GET_PRICE_SUCCESS', prices);
  },

  loadPricesByAddress: async ({ commit }, payload) => {
    commit('GET_PRICE_REQUEST');
    // FIXME: implement a method that calculates the asset price based on a contract hash.
    commit('GET_PRICE_SUCCESS', {});
  },

  loadPricesBySymbol: async ({ commit }, payload) => {
    commit('GET_PRICE_REQUEST');

    console.log('loadPriceBySymbol [payload: ', payload, ']');

    let data;
    try {
      const url = `https://mirror.yogi.fi/pancakeswap`;
      const response = await fetch(url);
      data = await response.json();
    } catch (e) {
      return;
    }

    const symToAddressMap = {};
    for (const address in config.tokens) {
      const sym = config.tokens[address].symbol;
      if (!sym) {
        continue;
      }
      symToAddressMap[sym] = address;
    }

    const prices = {};
    for (const id in data) {
      const price = data[id];
      const address = symToAddressMap[id];
      prices[address] = price;
    }

    commit('GET_PRICE_SUCCESS', prices);
  }
};

export default {
  state,
  mutations,
  actions
};
