import { mapState } from 'vuex';
import store from '@/store';
import config from '@/config';
import { shortenAddress, shorten, trunc, formatNumber } from '@/helpers/utils';

// @ts-ignore
const modules = Object.entries(store.state).map(module => module[0]);

const native = process.env.VUE_APP_NATIVE || 'bnb';

export default {
  data() {
    return {
      config
    };
  },
  computed: {
    ...mapState(modules)
  },
  methods: {
    _num(number, key) {
      return formatNumber(number, key);
    },
    _shortenAddress(str: string): string {
      return shortenAddress(str);
    },
    _shorten(str: string, max?): string {
      return shorten(str, max);
    },
    _trunc(value: number, decimals: number): number {
      return trunc(value, decimals);
    },
    _bscscanLink(str: string, type = 'address'): string {
      return `${config.explorer}/${type}/${str}`;
    },
    _ticker(address: string): string {
      if (address === 'native') return native.toUpperCase();
      const token = config.tokens[address];
      return token ? token.symbol : this._shortenAddress(address);
    },
    _precision(rawValue: number, address: string): number {
      const tokenConfig = config.tokens[address] || {};
      const precision = tokenConfig.precision || config.defaultPrecision;
      const value = rawValue.toFixed(precision);
      return parseFloat(value);
    }
  }
};
