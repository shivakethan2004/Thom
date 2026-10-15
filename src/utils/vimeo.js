export async function fetchVimeoOEmbed(vimeoId, vimeoHash) {
  const vimeoUrl = `https://vimeo.com/${vimeoId}${
    vimeoHash ? `/${vimeoHash}` : ""
  }`;
  const response = await fetch(
    `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(vimeoUrl)}&width=1280`,
  );
  if (!response.ok) {
    throw new Error(`Vimeo oEmbed request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data?.thumbnail_url) {
    throw new Error("Vimeo oEmbed response did not include a thumbnail URL");
  }

  return data;
}

export function upgradeVimeoThumbnail(thumbnailUrl) {
  return thumbnailUrl.replace(/_\d+x\d+(?=\.[^./?#]+(?:[?#].*)?$)/, "_1280x720");
}
