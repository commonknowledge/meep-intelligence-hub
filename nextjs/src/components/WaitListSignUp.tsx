"use client";

import IframeResizer from "iframe-resizer-react";

export default function WaitlistForm() {
  return (
    <IframeResizer
      src="https://us19.list-manage.com/survey?u=7d61a70102ab811e6282bee60&id=089628c6aa&attribution=false"
      className="rounded-md overflow-y-auto"
      style={{ width: "1px", minWidth: "100%", minHeight: 1800 }}
    />
  );
}
