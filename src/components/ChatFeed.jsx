import React, { useEffect, useMemo, useState } from 'react';
import { ThumbsUp, Users, BadgeCheck } from 'lucide-react';

const PostCard = ({ post, onJoin }) => {
  const isRide = post.mode === 'ride';
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-semibold">
        {post.user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900">
            {post.user.name}
          </p>
          {post.user.verified && <BadgeCheck className="w-4 h-4 text-blue-600" />}
          <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        {isRide ? (
          <p className="text-gray-700 mt-1">
            🚗 From <span className="font-medium">{post.data.source}</span> → <span className="font-medium">{post.data.destination}</span> | {post.data.time} | {post.data.seats} seats
          </p>
        ) : (
          <p className="text-gray-700 mt-1">
            🍕 <span className="font-medium">{post.data.restaurant}</span> | Items: {post.data.items} | {post.data.type} | {post.data.time}
          </p>
        )}
        <div className="mt-3 flex items-center gap-4">
          <button onClick={() => onJoin(post.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-black text-sm">
            <ThumbsUp className="w-4 h-4" /> Join
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="w-4 h-4" /> {post.joiners.length} joined
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatFeed = ({ mode, user }) => {
  const storageKey = useMemo(() => `unishare_${mode}_posts`, [mode]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setPosts(list);
  }, [storageKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      const list = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setPosts(list);
    }, 2500);
    return () => clearInterval(interval);
  }, [storageKey]);

  const handleJoin = (id) => {
    const list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const idx = list.findIndex((p) => p.id === id);
    if (idx > -1) {
      const already = list[idx].joiners?.some((j) => j.email === user?.email);
      if (!already) {
        list[idx].joiners = [...(list[idx].joiners || []), { name: user?.name || 'Student', email: user?.email }];
        localStorage.setItem(storageKey, JSON.stringify(list));
        setPosts(list);
      }
    }
  };

  if (!posts.length) {
    return (
      <div className="text-center text-gray-500 py-10">No posts yet. Be the first to share!</div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onJoin={handleJoin} />)
      )}
    </div>
  );
};

export default ChatFeed;
