import merge from 'lodash/merge';
import registry from 'yogi-assets/generated/pm/registry.bsc.json';
import bsc from '@/config/bsc.json';

const configs = { bsc };
configs.bsc = merge(registry, configs.bsc);
const network = process.env.VUE_APP_NETWORK || 'bsc';
const config = configs[network];
config.env = process.env.VUE_APP_ENV || 'production';

export default config;
