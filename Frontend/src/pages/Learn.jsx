import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VIDEO_DATA = [
  {
    id: 1,
    title: "Introduction to Budgeting",
    description: "Learn the basics of budgeting and how to manage your expenses effectively.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-1",
    thumbnail: "https://img.youtube.com/vi/your-video-id-1/0.jpg"
  },
  {
    id: 2,
    title: "Investing for Beginners",
    description: "A simple guide to understanding investments and growing your wealth.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-2",
    thumbnail: "https://img.youtube.com/vi/your-video-id-2/0.jpg"
  },
  {
    id: 3,
    title: "Debt Management Strategies",
    description: "Tips and strategies to effectively manage and reduce debt.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-3",
    thumbnail: "https://img.youtube.com/vi/your-video-id-3/0.jpg"
  },
  {
    id: 4,
    title: "How to Save Money Effectively",
    description: "Practical ways to save money and build financial security.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-4",
    thumbnail: "https://img.youtube.com/vi/your-video-id-4/0.jpg"
  },
  {
    id: 5,
    title: "Understanding Credit Scores",
    description: "A guide to understanding and improving your credit score.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-5",
    thumbnail: "https://img.youtube.com/vi/your-video-id-5/0.jpg"
  },
  {
    id: 6,
    title: "Building Passive Income Streams",
    description: "Ways to generate income without active involvement.",
    videoUrl: "https://www.youtube.com/embed/your-video-id-6",
    thumbnail: "https://img.youtube.com/vi/your-video-id-6/0.jpg"
  }
];

const advancedRecommendations = [
  "Introduction to Budgeting",
  "Investing for Beginners",
  "Debt Management Strategies",
  "How to Save Money Effectively",
  "Understanding Credit Scores",
  "Building Passive Income Streams"
];

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(VIDEO_DATA);
  const [filteredRecommendations, setFilteredRecommendations] = useState(advancedRecommendations);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      setFilteredVideos(
        VIDEO_DATA.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRecommendations(
        advancedRecommendations.filter((rec) =>
          rec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredVideos(VIDEO_DATA);
      setFilteredRecommendations(advancedRecommendations);
    }
  }, [searchTerm]);

  const handleRecommendationClick = (topic) => {
    setSearchTerm(topic);
  };

  return (
    <div className="p-10 space-y-6">
      <h2 className="font-bold text-3xl">Learning Materials</h2>
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search videos..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filteredRecommendations.map((rec, index) => (
                <Button key={index} variant="outline" onClick={() => handleRecommendationClick(rec)}>
                  {rec}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {activeVideo === video.id ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={video.videoUrl}
                    title={video.title}
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                  onClick={() => setActiveVideo(video.id)}
                />
              )}
              <p className="text-gray-500 mb-4">{video.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Learn;
