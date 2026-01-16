import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.text()

    const signature = request.headers.get("stripe")
}