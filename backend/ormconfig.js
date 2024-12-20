module.exports = {
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_TABLE,
  entities: [join(__dirname, "..", "**", "*.db-entity.{ts,js}")],
  migrations: ["src/migrations"],
  migrationsTableName: "migrations",
}