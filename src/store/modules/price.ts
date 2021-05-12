import Vue from 'vue';
import config from '@/config';

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
  loadPricesBySymbol: async ({ commit }) => {
    commit('GET_PRICE_REQUEST');

    let data;
    try {
      const url = `https://mirror.yogi.fi/prices`;
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
      if (!address) {
        continue;
      }
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
