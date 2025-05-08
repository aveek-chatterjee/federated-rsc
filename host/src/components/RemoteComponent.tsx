"use client";

import { useState, useEffect, useCallback } from "react";
import { RemoteComponentProps } from "@/types";

interface RemoteComponentWrapperProps extends RemoteComponentProps {
  initialHtml?: string;
}

export default function RemoteComponent({
  initialHtml,
  ...props
}: RemoteComponentWrapperProps) {
  const [html, setHtml] = useState(
    initialHtml || "Loading remote component..."
  );

  const [isAPIInvoked, setAPIInvoked] = useState(false);

  const fetchComponent = async () => {
    try {
      const response = await fetch("/api/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch remote component: ${response.status}`);
      }

      const result = await response.text();
      setHtml(result);
      setAPIInvoked(true);
    } catch (error) {
      console.error("Error loading remote component:", error);
      setHtml("<div>Error loading remote component</div>");
    }
  };

  useCallback(() => {
    fetchComponent();
  }, [initialHtml, fetchComponent]);

  useEffect(() => {
    if (!isAPIInvoked) {
      fetchComponent();
    }
  }, [initialHtml, props]);

  return !isAPIInvoked ? (
    <>{html}</>
  ) : (
    <div
      className="remote-component-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
