import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
    Linking,
    Dimensions,
    Keyboard,
    Image, // <-- Correct component for images
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const YOUTUBE_API_KEY: string = '';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const FINANCE_SEARCH_TERMS = [
  'personal finance tips',
  'stock market analysis',
  'mutual funds 2025',
  'investment strategies',
  'cryptocurrency news',
  'financial planning',
  'retirement planning',
  'dividend investing',
  'market trends',
  'economic analysis'
];

const financeCategories = [
  'All', 'Stocks', 'Crypto', 'Personal Finance', 'Investing', 
  'Trading', 'Real Estate', 'Retirement', 'Budgeting', 'Economics'
];

interface Video {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  channelAvatar: string;
  views: string;
  time: string;
  duration: string;
  thumbnail: string;
  thumbnailUrl: string;
  verified: boolean;
  description: string;
}

const { width: screenWidth } = Dimensions.get('window');

const getChannelAvatar = (channelTitle: string) => {
  const financeAvatars = ['💰', '📈', '💎', '🏦', '💵', '📊', '🎯', '💳', '🏠', '📱'];
  const index = channelTitle.length % financeAvatars.length;
  return financeAvatars[index];
};

const formatViewCount = (viewCount: string) => {
  const count = parseInt(viewCount);
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
  return `${count} views`;
};

const formatPublishedTime = (publishedAt: string) => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
  if (diffInHours < 720) return `${Math.floor(diffInHours / 168)} weeks ago`;
  return `${Math.floor(diffInHours / 720)} months ago`;
};

const formatDuration = (duration: string) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
};

const mockFinanceVideos: Video[] = [
  {
    id: '1',
    title: 'Top 10 Dividend Stocks for 2025 - Passive Income Strategy',
    channel: 'Finance Pro',
    channelId: 'finance-pro',
    channelAvatar: '💰',
    views: '2.1M views',
    time: '1 day ago',
    duration: '18:45',
    thumbnail: 'bg-blue-200',
    thumbnailUrl: '',
    verified: true,
    description: 'Learn about the best dividend stocks for building passive income in 2025.'
  },
  {
    id: '2',
    title: 'Crypto Market Analysis - Bitcoin & Ethereum Price Prediction',
    channel: 'CryptoExpert',
    channelId: 'crypto-expert',
    channelAvatar: '💎',
    views: '1.8M views',
    time: '2 days ago',
    duration: '22:30',
    thumbnail: 'bg-purple-200',
    thumbnailUrl: '',
    verified: true,
    description: 'Complete analysis of cryptocurrency market trends and price predictions.'
  },
  {
    id: '3',
    title: 'How to Build Wealth in Your 20s - Complete Guide',
    channel: 'WealthBuilder',
    channelId: 'wealth-builder',
    channelAvatar: '📈',
    views: '956K views',
    time: '3 days ago',
    duration: '15:20',
    thumbnail: 'bg-green-200',
    thumbnailUrl: '',
    verified: true,
    description: 'Step-by-step guide to building wealth and financial independence.'
  },
  {
    id: '4',
    title: 'Real Estate Investing for Beginners - 2025 Strategy',
    channel: 'PropertyGuru',
    channelId: 'property-guru',
    channelAvatar: '🏠',
    views: '743K views',
    time: '4 days ago',
    duration: '25:12',
    thumbnail: 'bg-yellow-200',
    thumbnailUrl: '',
    verified: false,
    description: 'Everything you need to know about real estate investing in 2025.'
  }
];

const FinanceYouTubeDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const isFetching = useRef(false);

  const fetchVideos = useCallback(async (query: string = '', maxResults = 20) => {
    setLoading(true);
    try {
      if (isFetching.current) return;
      isFetching.current = true;

      if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY.trim() === '') {
        setVideos(mockFinanceVideos);
        return;
      }

      const searchQuery = query.trim() || FINANCE_SEARCH_TERMS[Math.floor(Math.random() * FINANCE_SEARCH_TERMS.length)];
      const financeKeywords = ['finance', 'investing', 'money', 'stock', 'economy'];
      const enhancedQuery = `${searchQuery} ${financeKeywords[Math.floor(Math.random() * financeKeywords.length)]}`;

      const searchUrl = `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(enhancedQuery)}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&order=relevance&publishedAfter=2023-01-01T00:00:00Z`;
      const searchResponse = await fetch(searchUrl);

      if (!searchResponse.ok) {
        setVideos(mockFinanceVideos);
        return;
      }

      const searchData = await searchResponse.json();
      if (!searchData.items || searchData.items.length === 0) {
        setVideos(mockFinanceVideos);
        return;
      }
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
      const detailsUrl = `${YOUTUBE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
      const detailsResponse = await fetch(detailsUrl);
      if (!detailsResponse.ok) {
        setVideos(mockFinanceVideos);
        return;
      }
      const detailsData = await detailsResponse.json();
      if (!detailsData.items || detailsData.items.length === 0) {
        setVideos(mockFinanceVideos);
        return;
      }

      const formattedVideos: Video[] = detailsData.items.map((item: any, index: number) => ({
        id: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        channelAvatar: getChannelAvatar(item.snippet.channelTitle),
        views: formatViewCount(item.statistics.viewCount || '0'),
        time: formatPublishedTime(item.snippet.publishedAt),
        duration: formatDuration(item.contentDetails.duration),
        thumbnail: `bg-${['blue', 'green', 'purple', 'indigo', 'yellow', 'red'][index % 6]}-200`,
        thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
        verified: Math.random() > 0.3,
        description: item.snippet.description || ''
      }));

      setVideos(formattedVideos);
    } catch (error) {
      setVideos(mockFinanceVideos);
    } finally {
      setLoading(false);
      setSearchLoading(false);
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleSearch = () => {
    if (searchText.trim()) {
      Keyboard.dismiss();
      setSearchLoading(true);
      fetchVideos(searchText);
    }
  };

  const handleCategoryPress = (category: string) => {
    if (category === 'All') {
      fetchVideos();
    } else {
      fetchVideos(category.toLowerCase());
    }
  };

  const handleVideoPress = (video: Video) => {
    setSelectedVideo(video);
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setSelectedVideo(null);
  };

  const VideoPlayer = ({ video }: { video: Video }) => {
    const [playing, setPlaying] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);

    const onStateChange = (state: string) => {
      if (state === 'ended') setPlaying(false);
    };

    return (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black', zIndex: 1000 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <TouchableOpacity onPress={closePlayer}>
              <Text style={{ color: 'white', fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 16, flex: 1, textAlign: 'center' }} numberOfLines={1}>
              {video.title}
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.id}`)}>
              <Text style={{ color: 'white', fontSize: 16 }}>YouTube</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <YoutubePlayer
              height={350}
              play={playing}
              videoId={video.id}
              onChangeState={onStateChange}
              onReady={() => setPlayerReady(true)}
            />
            {!playerReady && (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="white" />
                <Text style={{ color: 'white', marginTop: 10 }}>Loading player...</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <TouchableOpacity 
              onPress={() => setPlaying((prev) => !prev)}
              style={{ backgroundColor: '#FF0000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6, marginRight: 12 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                {playing ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.id}`)}
              style={{ backgroundColor: '#333', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 6 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>
                Open in YouTube
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16, backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              {video.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ color: '#ccc', fontSize: 14 }}>{video.channel}</Text>
              {video.verified && <Text style={{ color: '#4CAF50', marginLeft: 4 }}>✓</Text>}
            </View>
            <Text style={{ color: '#ccc', fontSize: 14 }}>
              {video.views} • {video.time}
            </Text>
            {video.description && (
              <Text style={{ color: '#aaa', fontSize: 12, marginTop: 8 }} numberOfLines={3}>
                {video.description}
              </Text>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  const VideoCard = React.memo(({ video }: { video: Video }) => (
    <TouchableOpacity className="mb-4" onPress={() => handleVideoPress(video)} activeOpacity={0.85}>
      <View className="relative">
        {video.thumbnailUrl ? (
          <View style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 12, width: '100%' }}>
            <Image
              source={{ uri: video.thumbnailUrl }}
              style={{ width: '100%', height: 192, resizeMode: 'cover' }}
              accessibilityLabel={video.title}
            />
            <View className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded">
              <Text className="text-white text-xs font-medium">{video.duration}</Text>
            </View>
          </View>
        ) : (
          <View className={`${video.thumbnail} h-48 rounded-xl items-center justify-center mb-3`}>
            <View className="w-16 h-16 bg-black bg-opacity-60 rounded-full items-center justify-center">
              <Text className="text-white text-2xl">▶️</Text>
            </View>
            <View className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded">
              <Text className="text-white text-xs font-medium">{video.duration}</Text>
            </View>
          </View>
        )}
      </View>
      <View className="flex-row">
        <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
          <Text className="text-lg">{video.channelAvatar}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold text-base leading-5 mb-1" numberOfLines={2}>
            {video.title}
          </Text>
          <View className="flex-row items-center mb-1">
            <Text className="text-gray-600 text-sm">{video.channel}</Text>
            {video.verified && (
              <Text className="text-green-600 text-xs ml-1">✓</Text>
            )}
          </View>
          <Text className="text-gray-500 text-sm">
            {video.views} • {video.time}
          </Text>
        </View>
        <TouchableOpacity className="p-2">
          <Text className="text-gray-500 text-lg">⋮</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));

  return (
    <>
      <SafeAreaView className="flex-1 bg-white pt-12">
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="px-4 py-2 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-900"> Finance Hub</Text>
        </View>
        <View className="px-4 py-3">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
            <TouchableOpacity onPress={handleSearch} className="mr-3" disabled={searchLoading}>
              <Text className="text-gray-500 text-lg">🔍</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Search finance videos..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              className="flex-1 text-gray-900 text-base"
              placeholderTextColor="#9CA3AF"
              returnKeyType="search"
              editable={!searchLoading}
              blurOnSubmit
              autoCorrect={false}
            />
            {searchLoading && (
              <ActivityIndicator size="small" color="#9CA3AF" className="ml-3" />
            )}
          </View>
        </View>
        <View className="mb-4">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-4"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {financeCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCategoryPress(category)}
                className={`mr-3 px-4 py-2 rounded-full ${
                  index === 0 ? 'bg-green-600' : 'bg-gray-100'
                }`}
                disabled={searchLoading || loading}
              >
                <Text
                  className={`text-sm font-medium ${
                    index === 0 ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {loading ? (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#16A34A" />
              <Text className="text-gray-600 mt-4">Loading finance videos...</Text>
            </View>
          ) : (
            videos.map((video) => (
              <VideoCard key={video.id + video.title} video={video} />
            ))
          )}
          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
      {showPlayer && selectedVideo && (
        <VideoPlayer video={selectedVideo} />
      )}
    </>
  );
};

export default FinanceYouTubeDashboard;