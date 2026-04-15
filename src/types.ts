export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
  uri: string;
  preview_url: string | null;
}

export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
}

export interface UserProfile {
  display_name: string;
  images: { url: string }[];
}
