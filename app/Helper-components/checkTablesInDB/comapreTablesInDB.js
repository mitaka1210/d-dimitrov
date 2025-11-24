import pool from "../../../database/db";

export const transferTodosToArticles = async () => {
  try {
    // Стъпка 1: Извличане на всички записи от `todos`
    const allArticle = await pool.query("SELECT * FROM article");
    const article = await pool.query("SELECT * FROM articles");
    // console.log("pesho allArticle", allArticle.rows);
    // console.log("pesho article", article.rows);
    // Стъпка 2 и 3: Вмъкване на данни в `articles`
    if (allArticle.rows.length !== article.rows.length) {
      // Начало на транзакция
      await pool.query("BEGIN");

      // Изчистване на таблицата
      await pool.query(`TRUNCATE TABLE ${"articles"} RESTART IDENTITY`);

      // Завършване на транзакцията
      await pool.query("COMMIT");
      for (const todo of allArticle.rows) {
        await pool.query(
          "INSERT INTO articles (id) VALUES ($1)",
          [todo.todo_id] // Предполага се, че структурата на `articles` включва `title`, `content`, и `date_published`
        );
      }
    }
    console.log("Data transferred successfully.");
  } catch (err) {
    console.error("Error transferring data", err);
    throw err;
  }
};
