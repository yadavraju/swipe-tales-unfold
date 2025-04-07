
export interface Story {
  id: string;
  title: string;
  description: string;
  images: string[];
  audioUrl: string;
}

export const stories: Story[] = [
  {
    id: "1",
    title: "The Silent Peaks",
    description: "A journey through the majestic mountains where silence speaks louder than words. The crisp air carries whispers of ancient stories, telling tales of travelers who discovered themselves in the solitude of nature's grandeur.",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80"
    ],
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-432.mp3",
  },
  {
    id: "2",
    title: "Ocean's Embrace",
    description: "The rhythmic dance of waves against the shore tells a story of eternity. Each surge and retreat carries memories of countless souls who have stood at the edge of the vast blue expanse, finding comfort in its endless rhythm.",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80"
    ],
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3",
  },
  {
    id: "3",
    title: "Forest Whispers",
    description: "Deep within the ancient forest, sunbeams pierce through the canopy like golden threads connecting earth to sky. The forest holds secrets of time immemorial, a living monument to patience and resilience.",
    images: [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80"
    ],
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-forest-treasure-138.mp3",
  },
  {
    id: "4",
    title: "Urban Reflections",
    description: "The city awakens as lights reflect off glass and steel, creating a symphony of modern life. Between the concrete canyons and digital billboards, individual stories unfold in countless windows and doorways.",
    images: [
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80"
    ],
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
  },
  {
    id: "5",
    title: "Dawn's Promise",
    description: "As the first light breaks over the horizon, it brings with it the promise of new beginnings. The world transforms from monochrome to vivid color, reminding us that each day offers a fresh canvas for our dreams.",
    images: [
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504870712357-65ea720d6078?auto=format&fit=crop&q=80"
    ],
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-morning-114.mp3",
  }
];
