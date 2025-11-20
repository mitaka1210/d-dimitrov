import pool from "../../../database/db";
import {NextResponse} from "next/server";
import {transferTodosToArticles} from "../../Helper-components/checkTablesInDB/comapreTablesInDB";

export async function POST(req: any, res: any) {
  // изчакваме req.json() да се изпълни и да ни върне body
  // const body = await req.json()
  // console.log('pesho', body)
  // const {dislikes, id} = body;
  // try {
  //   await transferTodosToArticles();
  //   const client = await pool.connect();
  //   const result = await client.query("UPDATE articles SET dislikes = $1 WHERE id = $2 RETURNING *", [dislikes, id]);
  //   await client.end();
  //   res.status(200).json({success: true, data: result.rows[0]});
  // } catch (error) {
  //   return NextResponse.json({error: "Server error"});
  // }

}

