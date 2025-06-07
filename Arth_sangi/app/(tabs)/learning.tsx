import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const YouTubeDashboardScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: 'React Native Tutorial - Build Amazing Apps',
      channel: 'TechGuru',
      channelAvatar: '👨‍💻',
      views: '1.2M views',
      time: '2 days ago',
      duration: '15:42',
      thumbnail: 'bg-blue-200',
      verified: true
    },
    {
      id: 2,
      title: 'JavaScript ES2024 Features You Need to Know',
      channel: 'CodeMaster',
      channelAvatar: '🚀',
      views: '856K views',
      time: '1 week ago',
      duration: '12:18',
      thumbnail: 'bg-yellow-200',
      verified: true
    },
    {
      id: 3,
      title: 'How to Build a Full Stack App in 2025',
      channel: 'DevLife',
      channelAvatar: '💻',
      views: '2.1M views',
      time: '3 days ago',
      duration: '28:35',
      thumbnail: 'bg-green-200',
      verified: false
    },
    {
      id: 4,
      title: 'UI/UX Design Trends That Will Dominate',
      channel: 'DesignHub',
      channelAvatar: '🎨',
      views: '445K views',
      time: '5 days ago',
      duration: '9:22',
      thumbnail: 'bg-purple-200',
      verified: true
    },
    {
      id: 5,
      title: 'Machine Learning for Beginners - Complete Guide',
      channel: 'AIExplained',
      channelAvatar: '🤖',
      views: '3.8M views',
      time: '1 month ago',
      duration: '45:17',
      thumbnail: 'bg-red-200',
      verified: true
    },
    {
      id: 6,
      title: 'Docker Containerization Made Simple',
      channel: 'CloudTech',
      channelAvatar: '☁️',
      views: '789K views',
      time: '2 weeks ago',
      duration: '18:44',
      thumbnail: 'bg-indigo-200',
      verified: false
    }
  ];

  const categories = [
    'All', 'JavaScript', 'React', 'Programming', 'Tech Reviews', 
    'Tutorial', 'Web Development', 'Mobile Apps', 'AI/ML'
  ];

  const tabs = ['Home', 'Shorts', 'Subscriptions', 'Library'];

  const VideoCard = ({ video }:any) => (
    <TouchableOpacity className="mb-4">
      {/* Thumbnail */}
      <View className="relative">
        <View className={`${video.thumbnail} h-48 rounded-xl items-center justify-center mb-3`}>
          <View className="w-16 h-16 bg-black bg-opacity-60 rounded-full items-center justify-center">
            <Text className="text-white text-2xl">▶️</Text>
          </View>
          {/* Duration Badge */}
          <View className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded">
            <Text className="text-white text-xs font-medium">{video.duration}</Text>
          </View>
        </View>
      </View>
      
      {/* Video Info */}
      <View className="flex-row">
        {/* Channel Avatar */}
        <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
          <Text className="text-lg">{video.channelAvatar}</Text>
        </View>
        
        {/* Video Details */}
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold text-base leading-5 mb-1" numberOfLines={2}>
            {video.title}
          </Text>
          
          <View className="flex-row items-center mb-1">
            <Text className="text-gray-600 text-sm">{video.channel}</Text>
            {video.verified && (
              <Text className="text-gray-600 text-xs ml-1">✓</Text>
            )}
          </View>
          
          <Text className="text-gray-500 text-sm">
            {video.views} • {video.time}
          </Text>
        </View>
        
        {/* More Options */}
        <TouchableOpacity className="p-2">
          <Text className="text-gray-500 text-lg">⋮</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-12">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Search Bar */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Text className="text-gray-500 text-lg mr-3">🔍</Text>
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-gray-900 text-base"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity className="ml-3">
            <Text className="text-gray-500 text-lg">🎤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View className="mb-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className={`mr-3 px-4 py-2 rounded-full ${
                index === 0 ? 'bg-gray-900' : 'bg-gray-100'
              }`}
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

      {/* Video List */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
        
        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default YouTubeDashboardScreen;