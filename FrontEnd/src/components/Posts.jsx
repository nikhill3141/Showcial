import { useSelector } from 'react-redux';
import Post from './Post';

const Posts = () => {
  const { posts } = useSelector(store => store.post);

  if (!Array.isArray(posts)) return <div>Error loading posts.</div>;
  if (posts.length === 0) return <div>No posts available</div>;

  return (
    <div className="flex flex-col gap-6">
      {posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Posts;
