import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

interface PlayerProps {
  token: string;
  trackUri?: string;
}

export const Player: React.FC<PlayerProps> = ({ token, trackUri }) => {
  if (!token) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-dark border-t border-brand-900/20 px-4 py-3 z-50">
      <SpotifyPlayer
        token={token}
        uris={trackUri ? [trackUri] : []}
        play={true}
        styles={{
          activeColor: '#8b5cf6',
          bgColor: '#0a0118',
          color: '#fff',
          loaderColor: '#8b5cf6',
          sliderColor: '#8b5cf6',
          trackArtistColor: '#a78bfa',
          trackNameColor: '#fff',
          height: 80,
        }}
      />

    </div>
  );
};
