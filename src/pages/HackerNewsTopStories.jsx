import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const top100Ids = storyIds.slice(0, 100);

  const storyPromises = top100Ids.map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) =>
      res.json()
    )
  );

  return Promise.all(storyPromises);
};

const HackerNewsTopStories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>Error fetching stories: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top 100 Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStories?.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <span>Upvotes: {story.score}</span>
                <Button
                  variant="link"
                  onClick={() => window.open(story.url, "_blank")}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HackerNewsTopStories;