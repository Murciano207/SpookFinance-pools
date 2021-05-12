import merge from 'lodash/merge';
import registry_bsc from 'yogi-assets/generated/pm/registry.bsc.json';
import registry_polygon from 'yogi-assets/generated/pm/registry.polygon.json';
import bsc from '@/config/bsc.json';
import polygon from '@/config/polygon.json';

const configs = { bsc, polygon };
configs.bsc = merge(registry_bsc, configs.bsc);
configs.polygon = merge(registry_polygon, configs.polygon);
const network = process.env.VUE_APP_NETWORK || 'polygon';
const config = configs[network];
config.env = process.env.VUE_APP_ENV || 'production';
config.native = process.env.VUE_APP_NATIVE || 'native';

export default config;
