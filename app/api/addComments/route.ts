import pool from "../../../database/db";
import {NextResponse} from "next/server";

export async function POST(req: any, res: any) {
    // // изчакваме req.json() да се изпълни и да ни върне body
    // const body = await req.json()
    // console.log('pesho body', body)
    // const {comments, id, email, name, time} = body;
    // try {
    //     const client = await pool.connect();
    //     const result = await client.query("INSERT INTO comments (comments,id,email,name, time) VALUES ($1,$2,$3,$4,$5)", [comments, id, email, name, time]);
    //     await client.end();
    //     console.log('newComment', result.rows);
    //     res.status(200).json({success: true, data: result.rows});
    // } catch (error) {
    //     return NextResponse.json({error: "Server error"});
    // }

}
