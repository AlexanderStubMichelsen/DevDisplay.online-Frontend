// YouTubeTrends.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../css/pages/YoutubeTrends.css"; // Import your CSS file
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4"; // Import the video file
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const countries = [
  { code: "US", name: "United States" },
  { code: "DK", name: "Denmark" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
];

const categories = [
  { id: "10", name: "Music" },
  { id: "20", name: "Gaming" },
  { id: "24", name: "Entertainment" },
  { id: "1", name: "Film & Animation" },
];

export default function YouTubeTrends() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedCategory, setSelectedCategory] = useState("10");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: "snippet,statistics",
              chart: "mostPopular",
              regionCode: selectedCountry,
              videoCategoryId: selectedCategory,
              maxResults: 10,
              key: API_KEY,
            },
          }
        );

        const data = response.data.items
          .map((item) => ({
            rawDate: new Date(item.snippet.publishedAt),
            date: new Date(item.snippet.publishedAt).toLocaleDateString(),
            views: parseInt(item.statistics.viewCount),
            title: item.snippet.title,
          }))
          .sort((a, b) => a.rawDate - b.rawDate);

        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch trending videos", err);
      }
    };

    fetchTrendingVideos();
  }, [selectedCountry, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>YouTube Trends Analyzer | Track Popular Videos</title>
        <meta
          name="description"
          content="Visualize trending YouTube videos by country and category with DevDisplay's interactive charts."
        />
      </Helmet>
      <div className="youtube-trends-bg">
        <NavBar />
        <div className="youtube-trends-wrapper">
          <div className="youtube-trends">
            <div className="video-container">
              <video autoPlay loop muted playsInline className="video-bg">
                <source src={abstractbackground} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="text-2xl font-bold mb-4">YouTube Trends Analyzer</h1>

            <div className="flex gap-4 mb-6 flex-wrap">
              <select
                className="border p-2 rounded"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={videos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.0)",
                    border: "none",
                    color: "#fff",
                  }}
                  itemStyle={{
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    `${value.toLocaleString()} views`,
                    "Views",
                  ]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      return `${label} — ${payload[0].payload.title}`;
                    }
                    return label;
                  }}
                />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
}
