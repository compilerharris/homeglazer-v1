import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  published: boolean;
  publishedAt: string | null;
  categories: string[];
  viewCount: number;
  createdAt: string;
}

export default function BlogsIndex() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  const fetchBlogs = async () => {
    try {
      let url = '/api/blogs';
      if (filter === 'published') url += '?published=true';
      
      const response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        if (filter === 'draft') {
          data = data.filter((blog: Blog) => !blog.published);
        }
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog deleted successfully');
        fetchBlogs();
      } else {
        alert('Failed to delete blog');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete blog');
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !blog.published }),
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        alert('Failed to update blog');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update blog');
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#ED276E]">Blog Posts</h1>
            <Link href="/admin/blogs/new">
              <Button className="bg-[#299dd7] hover:bg-[#237bb0]">
                + New Blog Post
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-[#299dd7]' : ''}
            >
              All ({blogs.length})
            </Button>
            <Button
              variant={filter === 'published' ? 'default' : 'outline'}
              onClick={() => setFilter('published')}
              className={filter === 'published' ? 'bg-[#299dd7]' : ''}
            >
              Published
            </Button>
            <Button
              variant={filter === 'draft' ? 'default' : 'outline'}
              onClick={() => setFilter('draft')}
              className={filter === 'draft' ? 'bg-[#299dd7]' : ''}
            >
              Drafts
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">No blogs found. Create your first blog post!</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categories
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                        <div className="text-sm text-gray-500">{blog.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {blog.categories.map((cat, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {blog.viewCount}
                      </td>
                      <td className="px-6 py-4">
                        {blog.published ? (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#299dd7] text-[#299dd7] hover:bg-[#299dd7] hover:text-white"
                            onClick={() => handleTogglePublish(blog)}
                          >
                            {blog.published ? 'Unpublish' : 'Publish'}
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-[#299dd7] text-[#299dd7] hover:bg-[#299dd7] hover:text-white"
                          >
                            <Link href={`/admin/blogs/${blog.id}/edit`}>Edit</Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(blog.id, blog.title)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

