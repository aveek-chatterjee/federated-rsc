import { RemoteComponentProps } from "@/types";

export async function fetchRemoteComponent(
  props: RemoteComponentProps = {}
): Promise<string> {
  try {
    // Back to using the original endpoint which now uses the template-based approach
    const response = await fetch("http://localhost:3001/api/remote-component", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });
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
