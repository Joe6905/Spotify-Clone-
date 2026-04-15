import React from 'react';
import { Play, MoreHorizontal, Heart } from 'lucide-react';
import { Track } from '../types';
import { motion } from 'motion/react';

interface TrackCardProps {
  track: Track;
  onClick: (track: Track) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-surface-card p-4 rounded-2xl border border-brand-800/20 hover:border-brand-600/40 transition-all group cursor-pointer"
      onClick={() => onClick(track)}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
        <img 
          src={track.album.images[0]?.url || 'https://picsum.photos/seed/music/300/300'} 
          alt={track.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center shadow-xl shadow-brand-500/30 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play className="text-white fill-current w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-white truncate group-hover:text-brand-400 transition-colors">
          {track.name}
        </h3>
        <p className="text-sm text-brand-400 truncate">
          {track.artists.map(a => a.name).join(', ')}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-brand-400 hover:text-brand-300">
          <Heart className="w-5 h-5" />
        </button>
        <button className="text-brand-400 hover:text-brand-300">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
