"use client";

import { useState, useEffect } from "react";
import { RemoteComponentProps } from "@/types";

interface RemoteComponentWrapperProps extends RemoteComponentProps {
  initialHtml?: string;
}

export default function RemoteComponent({
  initialHtml,
  ...props
}: RemoteComponentWrapperProps) {
  const [html, setHtml] = useState(
    initialHtml || "<div>Loading remote component...</div>"
  );

  useEffect(() => {
    // If we don't have initial HTML (client-side navigation), fetch it
    // if (!initialHtml) {
    const fetchComponent = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/remote-component",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(props),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch remote component: ${response.status}`
          );
        }

        const result = await response.text();
        setHtml(result);
      } catch (error) {
        console.error("Error loading remote component:", error);
        setHtml("<div>Error loading remote component</div>");
      }
    };

    fetchComponent();
    // }
  }, [initialHtml, props]);

  return (
    <div
      className="remote-component-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
