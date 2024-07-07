import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Hacker News Top 100</h1>
      <p className="mb-6">Explore the top 100 stories from Hacker News.</p>
      <Button asChild>
        <Link to="/hacker-news">View Top Stories</Link>
      </Button>
    </div>
  );
};

export default Index;