interface baseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  secretKey: string;
}
const config: baseConfig = {
  host: 'localhost',
  port: 3306,
  database: 'web',
  username: 'root',
  password: 'root123',
  secretKey: 'kstar@#123',
};

export default config;
