import { NextRequest, NextResponse } from "next/server";
import { builder } from "@builder.io/sdk";

builder.init("f154bf67d18c42acae68604617b93b4b");

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.searchParams.get("pathname") || "/";

  const content = await builder
    .get("page", {
      userAttributes: { urlPath: pathname },
    })
    .toPromise();

  if (!content) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
