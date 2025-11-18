export const runtime = "nodejs";

import "server-only";
import { NextResponse } from "next/server";
import { Buffer, Blob } from "buffer";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const projectId = process.env.INFURA_IPFS_PROJECT_ID;
    const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;

    const auth =
      "Basic " + Buffer.from(`${projectId}:${projectSecret}`).toString("base64");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = new FormData();
    data.append("file", new Blob([buffer]), file.name || "upload");

    const uploadRes = await fetch(
      "https://ipfs.infura.io:5001/api/v0/add",
      {
        method: "POST",
        headers: { Authorization: auth },
        body: data,
      }
    );

    const text = await uploadRes.text();
    console.log("INFURA RESPONSE:", text);

    const match = text.match(/Hash":\s*"([^"]+)"/);

    if (!match) {
      return NextResponse.json({ error: "Upload failed", raw: text }, { status: 500 });
    }

    return NextResponse.json({ url: "https://ipfs.infura.io/ipfs/" + match[1] });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
