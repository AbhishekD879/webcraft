export async function fetchEditorState(siteId: string) {
  const response = await fetch(`/api/editor?site=${siteId}`);
  const { data } = await response.json();
  return data;
}

export async function saveEditorState(siteId: string, savedJsonState: string, publishedJsonState: string) {
  const response = await fetch(`/api/editor?site=${siteId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      savedJsonState,
      publishedJsonState,
    }),
  });
  const { data } = await response.json();
  return data.success;
}
