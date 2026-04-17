const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_NAME = process.env.DB_NAME || "practica7";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const FALLBACK_MESSAGE =
  process.env.FALLBACK_MESSAGE || "Aplicación desplegada correctamente en Render.";

async function getConnection() {
  return mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
}

app.use(express.static(__dirname));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/mensaje", async (_req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT mensaje FROM mensajes ORDER BY id DESC LIMIT 1"
    );

    const mensaje = rows.length
      ? rows[0].mensaje
      : "No hay mensajes en la base de datos.";

    res.json({ mensaje, source: "database" });
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
    res.json({
      mensaje: FALLBACK_MESSAGE,
      source: "fallback",
      detail: "No fue posible consultar la base de datos.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
