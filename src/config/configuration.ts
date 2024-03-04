export interface databaseProp {
  host: string;
  port: number;
  password: string;
  username: string;
  database: string;
}

export interface envProp {
  [key: string]: any;
  database: databaseProp;
}

export interface configProp {
  [key: string]: any;
  dev: envProp;
  prod: envProp;
}

const common = {
  test: 'common data valid',
};

const configMap = {
  dev: {
    database: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: '123456',
      password: 'Lihuazou123!',
      database: 'blog',
    },
  },
  prod: {
    database: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'blog',
    },
  },
};

export default () => {
  const { NODE_ENV } = process.env;
  const env = NODE_ENV === 'development' ? 'dev' : 'prod';

  const config: Partial<configProp> = {
    ...common,
    ...configMap[env],
  };

  return config;
};
