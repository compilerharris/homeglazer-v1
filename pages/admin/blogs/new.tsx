import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const DEFAULT_STATUS = false;

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function NewBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'blockquote', 'code-block'],
        ['clean'],
      ],
    }),
    [],
  );
  const [form, setForm] = useState({
    title: '',
    slug: '',
    author: '',
    excerpt: '',
    content: '',
    coverImage: '',
    readTime: '',
    categoriesInput: '',
    published: DEFAULT_STATUS,
    metaDescription: '',
    metaKeywords: '',
    featuredOrder: '',
  });

  useEffect(() => {
    if (form.title && !form.slug) {
      setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const updateField = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const categories = form.categoriesInput
      .split(',')
      .map((cat) => cat.trim())
      .filter(Boolean);

    const payload: Record<string, any> = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      author: form.author,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      readTime: form.readTime,
      categories,
      published: form.published,
      metaDescription: form.metaDescription,
      metaKeywords: form.metaKeywords,
    };

    if (form.featuredOrder) {
      payload.featuredOrder = Number(form.featuredOrder);
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create blog');
      }

      setSuccess('Blog created successfully. Redirecting...');
      setTimeout(() => {
        router.push('/admin/blogs');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold">Create Blog Post</h1>
            <Button
              variant="outline"
              onClick={() => router.push('/admin/blogs')}
              className="border-[#299dd7] text-[#299dd7] hover:bg-[#299dd7] hover:text-white"
            >
              Back to Blogs
            </Button>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <Input
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <Input
                    value={form.slug}
                    onChange={(e) => updateField('slug', generateSlug(e.target.value))}
                    placeholder="auto-generated-if-empty"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                  <Input
                    value={form.author}
                    onChange={(e) => updateField('author', e.target.value)}
                    placeholder="Author name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                  <Input
                    value={form.readTime}
                    onChange={(e) => updateField('readTime', e.target.value)}
                    placeholder="e.g. 5 min"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      disabled={uploadingCover}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setUploadingCover(true);
                        const formData = new FormData();
                        formData.append('image', file);
                        formData.append('type', 'blog');

                        try {
                          const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          const data = await response.json();
                          if (response.ok && data.success) {
                            setForm((prev) => ({ ...prev, coverImage: data.url }));
                            setError(null);
                          } else {
                            console.error('Upload failed:', data);
                            setError(data.error || 'Failed to upload cover image');
                          }
                        } catch (err) {
                          console.error('Upload error:', err);
                          setError('Failed to upload cover image');
                        } finally {
                          setUploadingCover(false);
                          e.target.value = '';
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#299dd7] file:text-white hover:file:bg-[#237bb0]"
                    />
                    <Input
                      value={form.coverImage}
                      onChange={(e) => updateField('coverImage', e.target.value)}
                      placeholder="Or enter image URL (e.g., /uploads/blogs/cover.webp)"
                      disabled={uploadingCover}
                    />
                    {uploadingCover && (
                      <p className="text-xs text-gray-500">Uploading cover image...</p>
                    )}
                    {form.coverImage && (
                      <div className="mt-2">
                        <img
                          src={form.coverImage}
                          alt="Cover preview"
                          className="h-40 w-auto rounded-lg border border-gray-200 object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <Input
                    value={form.categoriesInput}
                    onChange={(e) => updateField('categoriesInput', e.target.value)}
                    placeholder="Comma separated e.g. Painting, Design"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                  <Textarea
                    value={form.excerpt}
                    onChange={(e) => updateField('excerpt', e.target.value)}
                    placeholder="Short summary for cards and previews"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <ReactQuill
                      value={form.content}
                      onChange={(value) => updateField('content', value)}
                      modules={quillModules}
                      className="min-h-[240px]"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: You can include formatted text, images, and embeds. The content will render on the public blog page.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">SEO Settings</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <Textarea
                    value={form.metaDescription}
                    onChange={(e) => updateField('metaDescription', e.target.value)}
                    rows={3}
                    placeholder="Optional SEO description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <Textarea
                    value={form.metaKeywords}
                    onChange={(e) => updateField('metaKeywords', e.target.value)}
                    rows={3}
                    placeholder="Comma separated keywords"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Publishing</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) => updateField('published', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#299dd7] focus:ring-[#299dd7]"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Order
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={form.featuredOrder}
                    onChange={(e) => updateField('featuredOrder', e.target.value)}
                    placeholder="Optional ordering for featured lists"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/blogs')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#299dd7] hover:bg-[#237bb0]"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Blog'}
              </Button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}


