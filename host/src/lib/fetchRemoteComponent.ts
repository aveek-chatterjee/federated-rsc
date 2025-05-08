import { RemoteComponentProps } from "@/types";

const REMOTE_COMPONENT_URL =
  process.env.NEXT_PUBLIC_REMOTE_COMPONENT_URL || "http://localhost:3001";

export async function fetchRemoteComponent(
  props: RemoteComponentProps = {}
): Promise<string> {
  try {
    // Back to using the original endpoint which now uses the template-based approach
    const response = await fetch(
      `${REMOTE_COMPONENT_URL}/api/remote-component`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch remote component: ${response.status}`);
    }

    const html = await response.text();
    return html;
  } catch (error) {
    console.error("Error fetching remote component:", error);
    return `<div>Error loading remote component</div>`;
  }
}
