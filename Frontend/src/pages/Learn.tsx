import { useState, useEffect } from "react";
import { Search, Play, Clock, Users, Star, Filter, BookOpen, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VIDEO_DATA = [
  {
    id: 1,
    title: "Introduction to Budgeting",
    description: "Learn the basics of budgeting and how to manage your expenses effectively. Master the fundamentals of financial planning.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-1",
    thumbnail: "https://img.youtube.com/vi/your-video-id-1/0.jpg",
    duration: "12:30",
    views: "45.2K",
    rating: 4.8,
    category: "Budgeting",
    level: "Beginner",
    instructor: "Sarah Johnson"
  },
  {
    id: 2,
    title: "Investing for Beginners",
    description: "A comprehensive guide to understanding investments and growing your wealth through smart financial decisions.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-2",
    thumbnail: "https://img.youtube.com/vi/your-video-id-2/0.jpg",
    duration: "18:45",
    views: "78.1K",
    rating: 4.9,
    category: "Investing",
    level: "Beginner",
    instructor: "Michael Chen"
  },
  {
    id: 3,
    title: "Debt Management Strategies",
    description: "Advanced tips and proven strategies to effectively manage, reduce, and eliminate debt from your financial life.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-3",
    thumbnail: "https://img.youtube.com/vi/your-video-id-3/0.jpg",
    duration: "15:20",
    views: "32.7K",
    rating: 4.7,
    category: "Debt Management",
    level: "Intermediate",
    instructor: "Emily Rodriguez"
  },
  {
    id: 4,
    title: "How to Save Money Effectively",
    description: "Practical and actionable ways to save money, cut expenses, and build long-term financial security.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-4",
    thumbnail: "https://img.youtube.com/vi/your-video-id-4/0.jpg",
    duration: "14:15",
    views: "56.3K",
    rating: 4.6,
    category: "Saving",
    level: "Beginner",
    instructor: "David Park"
  },
  {
    id: 5,
    title: "Understanding Credit Scores",
    description: "Complete guide to understanding credit scores, how they work, and proven methods to improve your credit rating.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-5",
    thumbnail: "https://img.youtube.com/vi/your-video-id-5/0.jpg",
    duration: "16:30",
    views: "41.8K",
    rating: 4.8,
    category: "Credit",
    level: "Intermediate",
    instructor: "Lisa Thompson"
  },
  {
    id: 6,
    title: "Building Passive Income Streams",
    description: "Advanced strategies to generate multiple income streams without active daily involvement or management.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-6",
    thumbnail: "https://img.youtube.com/vi/your-video-id-6/0.jpg",
    duration: "22:10",
    views: "89.4K",
    rating: 4.9,
    category: "Investing",
    level: "Advanced",
    instructor: "Robert Kim"
  }
];

const categories = ["All", "Budgeting", "Investing", "Debt Management", "Saving", "Credit"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(VIDEO_DATA);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    let filtered = VIDEO_DATA;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== "All") {
      filtered = filtered.filter((video) => video.level === selectedLevel);
    }

    // Sort videos
    if (sortBy === "popular") {
      filtered = filtered.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredVideos(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  const getTrendingVideos = () => {
    return VIDEO_DATA.filter(video => parseFloat(video.views) > 50).slice(0, 3);
  };

  const getPopularCategories = () => {
    const categoryCounts = VIDEO_DATA.reduce((acc, video) => {
      acc[video.category] = (acc[video.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4)
      .map(([category]) => category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <BookOpen className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Learning Hub
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Master your finances with expert-led video tutorials, practical guides, and actionable strategies
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search by title, description, or instructor..."
                className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-blue-500 hover:bg-blue-600" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Level Filter */}
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className={selectedLevel === level ? "bg-purple-500 hover:bg-purple-600" : ""}
                  >
                    {level}
                  </Button>
                ))}
              </div>

              {/* Sort */}
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Trending Section */}
        {!searchTerm && selectedCategory === "All" && selectedLevel === "All" && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="text-orange-500" size={24} />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTrendingVideos().map((video) => (
                  <div key={video.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                       onClick={() => setActiveVideo(video.id)}>
                    <div className="w-16 h-12 bg-orange-200 rounded flex items-center justify-center">
                      <Play size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{video.title}</h4>
                      <p className="text-xs text-gray-600">{video.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular Categories */}
        {!searchTerm && selectedCategory === "All" && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getPopularCategories().map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <BookOpen size={20} />
                    <span className="text-sm">{category}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredVideos.length} of {VIDEO_DATA.length} videos
          </p>
          {(searchTerm || selectedCategory !== "All" || selectedLevel !== "All") && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                {activeVideo === video.id ? (
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={video.videoUrl}
                      title={video.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setActiveVideo(video.id)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/480x270/6366f1/ffffff?text=${encodeURIComponent(video.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4">
                        <Play size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Clock size={12} />
                      {video.duration}
                    </div>
                  </div>
                )}
                
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                    video.level === 'Beginner' ? 'bg-green-500' :
                    video.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {video.level}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {video.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {video.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      {video.rating}
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">{video.category}</span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    By <span className="font-medium">{video.instructor}</span>
                  </p>
                </div>

                {activeVideo !== video.id && (
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <Play size={16} className="mr-2" />
                    Watch Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No videos found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;