import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const YAML_CONFIG_COMMON = 'common.yaml';
const YAML_CONFIG_ENV = `${env}.yaml`;

export default () => {
  const commonVariety = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_COMMON), 'utf8'),
  ) as Record<string, any>;

  const envVariety = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_ENV), 'utf8'),
  ) as Record<string, any>;

  return {
    env,
    common: commonVariety,
    [env]: envVariety
  }
};