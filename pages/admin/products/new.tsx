import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface ProductOption {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
}

const SHEEN_LEVELS = ['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'] as const;

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [relatedProductOptions, setRelatedProductOptions] = useState<ProductOption[]>([]);
  const [searchRelated, setSearchRelated] = useState('');
  const [formData, setFormData] = useState({
    brandId: '',
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: '',
    sheenLevel: 'Mat' as typeof SHEEN_LEVELS[number],
    surfaceType: '',
    usage: '',
    image: '',
    prices: {
      '1L': 0,
      '4L': 0,
      '10L': 0,
      '20L': 0,
    },
    colors: [''],
    features: [''],
    specifications: {} as Record<string, string>,
    relatedProductIds: [] as string[],
  });

  useEffect(() => {
    fetchBrands();
    fetchRelatedOptions();
  }, []);

  useEffect(() => {
    if (searchRelated) {
      fetchRelatedOptions(searchRelated);
    } else {
      fetchRelatedOptions();
    }
  }, [searchRelated]);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (err) {
      console.error('Failed to fetch brands:', err);
    }
  };

  const fetchRelatedOptions = async (search?: string) => {
    try {
      const url = search 
        ? `/api/products/related-options?search=${encodeURIComponent(search)}`
        : '/api/products/related-options';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRelatedProductOptions(data);
      }
    } catch (err) {
      console.error('Failed to fetch related products:', err);
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

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, ''],
    });
  };

  const removeColor = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData({ ...formData, colors: newColors });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addSpecification = () => {
    const key = prompt('Enter specification key:');
    if (key) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [key]: '',
        },
      });
    }
  };

  const updateSpecification = (key: string, value: string) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [key]: value,
      },
    });
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    setFormData({
      ...formData,
      specifications: rest,
    });
  };

  const toggleRelatedProduct = (productId: string) => {
    setFormData({
      ...formData,
      relatedProductIds: formData.relatedProductIds.includes(productId)
        ? formData.relatedProductIds.filter(id => id !== productId)
        : [...formData.relatedProductIds, productId],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Filter out empty colors and features
      const colors = formData.colors.filter(c => c.trim() !== '');
      const features = formData.features.filter(f => f.trim() !== '');

      const payload = {
        ...formData,
        colors,
        features,
        specifications: Object.fromEntries(
          Object.entries(formData.specifications).filter(([_, v]) => v.trim() !== '')
        ),
      };

      console.log('=== SUBMIT PAYLOAD DEBUG ===');
      console.log('formData.relatedProductIds:', formData.relatedProductIds);
      console.log('Payload relatedProductIds:', payload.relatedProductIds);
      console.log('Full payload:', JSON.stringify(payload, null, 2));
      console.log('=== END SUBMIT PAYLOAD DEBUG ===');

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data;
      const responseText = await response.text();
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        // If JSON parsing fails, use response text
        console.error('Failed to parse JSON response:', responseText);
        setError(`Server error (${response.status}): ${responseText || 'Invalid response format. Please try again.'}`);
        return;
      }

      if (response.ok) {
        router.push('/admin/products');
      } else {
        // Handle different error status codes with specific messages
        console.error('API Error:', response.status, data);
        if (response.status === 409) {
          setError(data.error || 'Product with this slug already exists for this brand. Please use a different slug.');
        } else if (response.status === 400) {
          // Validation errors
          const errorMessages = data.details 
            ? Array.isArray(data.details) 
              ? data.details.join(', ')
              : typeof data.details === 'string'
              ? data.details
              : Object.values(data.details).join(', ')
            : data.error || 'Validation failed. Please check your input.';
          setError(errorMessages);
        } else if (response.status === 404) {
          setError(data.error || 'Brand not found. Please select a valid brand.');
        } else if (response.status === 500) {
          const errorMessage = data.error || data.message || 'Server error occurred. Please try again later.';
          setError(errorMessage);
          console.error('Server error details:', data);
        } else {
          setError(data.error || `Failed to create product (${response.status}). Please try again.`);
        }
      }
    } catch (err: any) {
      console.error('Create product error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-3xl font-bold text-[#ED276E] mb-8">Create Product</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    placeholder="Product Name"
                  />
                </div>

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Slug *
                         </label>
                         <Input
                           value={formData.slug}
                           onChange={(e) => {
                             const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                             setFormData({ ...formData, slug: value });
                           }}
                           required
                           placeholder="product-slug"
                           title="Slug must contain only lowercase letters, numbers, and hyphens"
                         />
                       </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    placeholder="Full product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <Textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                    rows={2}
                    placeholder="Brief product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    placeholder="e.g., Interior Paint"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image *
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
                            formData.append('type', 'product');
                            
                            try {
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData,
                              });
                              
                              const data = await response.json();
                              if (data.success) {
                                setFormData(prev => ({ ...prev, image: data.url }));
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
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Or enter image URL (e.g., /uploads/products/image.webp)"
                        className="mt-2"
                        disabled={uploadingImage}
                      />
                      {uploadingImage && (
                        <p className="text-xs text-gray-500 mt-1">Uploading image...</p>
                      )}
                    </div>
                    {formData.image && (
                      <div className="mt-3">
                        <img 
                          src={formData.image} 
                          alt="Product preview" 
                          className="h-32 w-auto object-contain border border-gray-200 rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Product Specifications</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sheen Level *
                  </label>
                  <select
                    value={formData.sheenLevel}
                    onChange={(e) => setFormData({ ...formData, sheenLevel: e.target.value as typeof SHEEN_LEVELS[number] })}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  >
                    {SHEEN_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface Type *
                  </label>
                  <Input
                    value={formData.surfaceType}
                    onChange={(e) => setFormData({ ...formData, surfaceType: e.target.value })}
                    required
                    placeholder="e.g., Interior Wall"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage *
                  </label>
                  <Input
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    required
                    placeholder="e.g., Home"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">1L</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.prices['1L']}
                      onChange={(e) => setFormData({
                        ...formData,
                        prices: { ...formData.prices, '1L': parseFloat(e.target.value) || 0 }
                      })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">4L</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.prices['4L']}
                      onChange={(e) => setFormData({
                        ...formData,
                        prices: { ...formData.prices, '4L': parseFloat(e.target.value) || 0 }
                      })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">10L</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.prices['10L']}
                      onChange={(e) => setFormData({
                        ...formData,
                        prices: { ...formData.prices, '10L': parseFloat(e.target.value) || 0 }
                      })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">20L</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.prices['20L']}
                      onChange={(e) => setFormData({
                        ...formData,
                        prices: { ...formData.prices, '20L': parseFloat(e.target.value) || 0 }
                      })}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Colors</h2>
              <div className="space-y-3">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      placeholder="Color name"
                    />
                    {formData.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeColor(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addColor}>
                  + Add Color
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Features</h2>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature description"
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFeature}>
                  + Add Feature
                </Button>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <Input value={key} disabled className="flex-1" />
                    <Input
                      value={value}
                      onChange={(e) => updateSpecification(key, e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSpecification(key)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addSpecification}>
                  + Add Specification
                </Button>
              </div>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Related Products</h2>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchRelated}
                    onChange={(e) => setSearchRelated(e.target.value)}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-4 space-y-2">
                  {relatedProductOptions.length === 0 ? (
                    <p className="text-sm text-gray-500">No products found</p>
                  ) : (
                    relatedProductOptions.map((product) => (
                      <label
                        key={product.id}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={formData.relatedProductIds.includes(product.id)}
                          onChange={() => toggleRelatedProduct(product.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">
                          {product.name} ({product.brand.name})
                        </span>
                      </label>
                    ))
                  )}
                </div>
                {formData.relatedProductIds.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {formData.relatedProductIds.length} product(s) selected
                  </p>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#299dd7] hover:bg-[#237bb0] text-white"
              >
                {loading ? 'Creating...' : 'Create Product'}
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
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

