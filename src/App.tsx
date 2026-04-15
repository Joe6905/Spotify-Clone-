import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Sidebar } from './components/Sidebar';
import { TokenInput } from './components/TokenInput';
import { Player } from './components/Player';
import { TrackCard } from './components/TrackCard';
import { Track, UserProfile } from './types';
import { Search, Bell, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const spotifyApi = new SpotifyWebApi();

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotify_token'));
  const [user, setUser] = useState<UserProfile | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
      fetchUserData();
      fetchTopTracks();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const data = await spotifyApi.getMe();
      setUser(data as any);
    } catch (error) {
      console.error('Error fetching user data', error);
      handleLogout();
    }
  };

  const fetchTopTracks = async () => {
    try {
      const data = await spotifyApi.getMyTopTracks({ limit: 20 });
      setTopTracks(data.items as any);
    } catch (error) {
      console.error('Error fetching top tracks', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      try {
        const data = await spotifyApi.searchTracks(query, { limit: 20 });
        setSearchResults(data.tracks.items as any);
      } catch (error) {
        console.error('Search error', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleTokenSubmit = (newToken: string) => {
    localStorage.setItem('spotify_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <TokenInput onTokenSubmit={handleTokenSubmit} />;
  }

  return (
    <div className="flex h-screen bg-surface-dark text-white overflow-hidden font-sans">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-surface-dark/80 backdrop-blur-md z-10">
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 w-5 h-5 group-focus-within:text-brand-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-brand-950/30 border border-brand-900/30 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-600/50 transition-all placeholder-brand-700"
            />
          </div>

          <div className="flex items-center gap-6 ml-8">
            <button className="relative p-2 text-brand-400 hover:text-brand-300 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-surface-dark"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-brand-900/20">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">{user?.display_name || 'Joi User'}</p>
                <p className="text-xs text-brand-500">Premium Plan</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-900/50 border border-brand-600/30 overflow-hidden flex items-center justify-center">
                {user?.images?.[0]?.url ? (
                  <img src={user.images[0].url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User className="text-brand-400 w-6 h-6" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-32">
          <AnimatePresence mode="wait">
            {searchQuery.length > 2 ? (
              <motion.section 
                key="search"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Search className="text-brand-500 w-6 h-6" />
                  <h2 className="text-2xl font-bold">Search Results</h2>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {searchResults.map((track) => (
                      <TrackCard key={track.id} track={track} onClick={setCurrentTrack} />
                    ))}
                  </div>
                )}
              </motion.section>
            ) : (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 space-y-12"
              >
                {/* Hero Section */}
                <section className="relative h-64 rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-600 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <img 
                    src="https://picsum.photos/seed/music-hero/1200/400" 
                    alt="Hero" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-brand-200 mb-4">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-bold tracking-widest uppercase">Editor's Choice</span>
                    </div>
                    <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                      Discover Your <br />
                      <span className="text-brand-300">Daily Rhythm</span>
                    </h1>
                    <p className="text-brand-100/80 max-w-md text-lg">
                      Explore the latest hits and curated playlists tailored just for you.
                    </p>
                  </div>
                </section>

                {/* Top Tracks */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Your Top Mixes</h2>
                    <button className="text-brand-400 hover:text-brand-300 text-sm font-bold">Show All</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {topTracks.map((track) => (
                      <TrackCard key={track.id} track={track} onClick={setCurrentTrack} />
                    ))}
                  </div>
                </section>

                {/* Categories/Moods */}
                <section>
                   <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Chill', 'Workout', 'Focus', 'Party'].map((mood, i) => (
                        <div key={mood} className={`h-32 rounded-2xl p-6 flex flex-col justify-end cursor-pointer hover:scale-[1.02] transition-transform bg-gradient-to-br ${
                          i === 0 ? 'from-blue-600 to-brand-600' :
                          i === 1 ? 'from-orange-600 to-red-600' :
                          i === 2 ? 'from-emerald-600 to-teal-600' :
                          'from-purple-600 to-pink-600'
                        }`}>
                          <span className="text-xl font-bold">{mood}</span>
                        </div>
                      ))}
                   </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player */}
        <Player token={token} trackUri={currentTrack?.uri} />
      </main>
    </div>
  );
}
