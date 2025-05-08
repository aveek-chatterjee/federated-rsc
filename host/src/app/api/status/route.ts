import { NextRequest, NextResponse } from "next/server";
import { fetchRemoteComponent } from "@/lib/fetchRemoteComponent";
import { RemoteComponentProps } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const props: RemoteComponentProps = await request.json();
    const serverHTML = await fetchRemoteComponent(props);

    return new NextResponse(serverHTML, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Error in remote render API:", error);
    return NextResponse.json(
      { error: "Failed to render remote component" },
      { status: 500 }
    );
  }
}
