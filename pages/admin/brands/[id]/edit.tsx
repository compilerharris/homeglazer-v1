import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

export default function EditBrand() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      fetchBrand();
    }
  }, [id]);

  const fetchBrand = async () => {
    try {
      const response = await fetch(`/api/brands/${id}`);
      if (response.ok) {
        const brand: Brand = await response.json();
        setFormData({
          name: brand.name,
          slug: brand.slug,
          logo: brand.logo,
          description: brand.description,
        });
      } else {
        setError('Brand not found');
      }
    } catch (err) {
      setError('Failed to load brand');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: formData.slug || generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/brands');
      } else {
        setError(data.error || 'Failed to update brand');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading brand...</p>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-3xl font-bold mb-8">Edit Brand</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    placeholder="Brand Name"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="brand-slug"
                    pattern="[a-z0-9-]+"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only</p>
                </div>

                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Logo *
                  </label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        disabled={uploadingImage}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadingImage(true);
                            const formData = new FormData();
                            formData.append('image', file);
                            formData.append('type', 'brand');
                            
                            try {
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData,
                              });
                              
                              const data = await response.json();
                              if (data.success) {
                                setFormData(prev => ({ ...prev, logo: data.url }));
                              } else {
                                alert(data.error || 'Upload failed');
                              }
                            } catch (err) {
                              console.error('Upload error:', err);
                              alert('Failed to upload image');
                            } finally {
                              setUploadingImage(false);
                            }
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#299dd7] file:text-white hover:file:bg-[#237bb0]"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="logo"
                        value={formData.logo}
                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        placeholder="Or enter image URL (e.g., /uploads/brands/logo.webp)"
                        className="mt-2"
                        disabled={uploadingImage}
                        required
                      />
                      {uploadingImage && (
                        <p className="text-xs text-gray-500 mt-1">Uploading image...</p>
                      )}
                    </div>
                    {formData.logo && (
                      <div className="mt-3">
                        <img 
                          src={formData.logo} 
                          alt="Brand logo preview" 
                          className="h-32 w-auto object-contain border border-gray-200 rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Brand description"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-[#299dd7] hover:bg-[#237bb0] text-white"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

