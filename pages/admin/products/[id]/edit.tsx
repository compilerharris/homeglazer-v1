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

interface Product {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  sheenLevel: string;
  surfaceType: string;
  usage: string;
  image: string;
  prices: {
    '1L': number;
    '4L': number;
    '10L': number;
    '20L': number;
  };
  colors: string[];
  features: string[];
  specifications: Record<string, string>;
  relatedProducts: Array<{
    relatedProduct: {
      id: string;
      name: string;
    };
  }>;
}

const SHEEN_LEVELS = ['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'] as const;

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchRelatedOptions(id as string);
    } else {
      fetchRelatedOptions();
    }
  }, [id, searchRelated]);

  // Debug: Log when relatedProductIds changes
  useEffect(() => {
    console.log('formData.relatedProductIds changed:', formData.relatedProductIds);
    console.log('relatedProductOptions count:', relatedProductOptions.length);
  }, [formData.relatedProductIds, relatedProductOptions]);

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

  const fetchProduct = async () => {
    console.log('🟢 FRONTEND: Fetching product for edit');
    try {
      console.log('  → STEP 1: Sending GET request to:', `/api/products/${id}`);
      const response = await fetch(`/api/products/${id}`);
      console.log('  → STEP 2: Response received');
      console.log('    → Status:', response.status);
      console.log('    → OK:', response.ok);
      
      if (response.ok) {
        const product: Product = await response.json();
        console.log('  → STEP 3: Product data parsed from JSON');
        console.log('    → Product ID:', product.id);
        console.log('    → Product name:', product.name);
        
        console.log('  → STEP 4: Checking relatedProducts in response');
        console.log('    → relatedProducts exists?:', product.relatedProducts !== undefined);
        console.log('    → relatedProducts type:', typeof product.relatedProducts);
        console.log('    → relatedProducts is array?:', Array.isArray(product.relatedProducts));
        console.log('    → relatedProducts length:', product.relatedProducts?.length || 0);
        console.log('    → Full relatedProducts:', JSON.stringify(product.relatedProducts, null, 2));
        
        // Check the structure of relatedProducts
        if (product.relatedProducts && product.relatedProducts.length > 0) {
          console.log('  → STEP 5: relatedProducts array has items');
          console.log('    → First item structure:', JSON.stringify(product.relatedProducts[0], null, 2));
          console.log('    → First item has relatedProduct?:', product.relatedProducts[0]?.relatedProduct !== undefined);
          console.log('    → First relatedProduct.id:', product.relatedProducts[0]?.relatedProduct?.id);
        } else {
          console.warn('  ⚠️ STEP 5: relatedProducts is empty or null!');
          console.warn('    → This means no related products were returned from API');
        }
        
        console.log('  → STEP 6: Extracting related product IDs');
        const extractedRelatedIds = product.relatedProducts?.map((rp, index) => {
          console.log(`    → Mapping item ${index}:`, rp);
          const relatedId = rp?.relatedProduct?.id;
          console.log(`    → Extracted ID ${index}:`, relatedId);
          if (!relatedId) {
            console.error(`    ❌ ERROR: Item ${index} has no relatedProduct.id!`);
            console.error(`    → Item structure:`, JSON.stringify(rp, null, 2));
          }
          return relatedId;
        }).filter(Boolean) || [];
        console.log('  → STEP 7: Extraction complete');
        console.log('    → Extracted IDs count:', extractedRelatedIds.length);
        console.log('    → Extracted IDs:', extractedRelatedIds);
        
        if (extractedRelatedIds.length === 0 && (product.relatedProducts?.length || 0) > 0) {
          console.error('  ❌ ERROR: relatedProducts exists but IDs extraction failed!');
          console.error('    → This means the structure is wrong');
          console.error('    → Expected: relatedProducts[].relatedProduct.id');
          console.error('    → Actual structure:', JSON.stringify(product.relatedProducts, null, 2));
        } else if (extractedRelatedIds.length > 0) {
          console.log('  ✅ STEP 7: Successfully extracted related product IDs');
        } else {
          console.log('  ℹ️ STEP 7: No related products to extract (empty array)');
        }
        
        console.log('  → STEP 8: Setting formData state');
        setFormData({
          brandId: product.brandId,
          name: product.name,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          category: product.category,
          sheenLevel: product.sheenLevel as typeof SHEEN_LEVELS[number],
          surfaceType: product.surfaceType,
          usage: product.usage,
          image: product.image,
          prices: product.prices,
          colors: product.colors && product.colors.length > 0 ? product.colors : [''],
          features: product.features && product.features.length > 0 ? product.features : [''],
          specifications: product.specifications || {},
          relatedProductIds: extractedRelatedIds,
        });
        
        console.log('  → STEP 9: Form data set');
        console.log('    → relatedProductIds in formData:', extractedRelatedIds);
        console.log('  ✅ FRONTEND: Product fetch complete');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch product. Status:', response.status);
        console.error('Error response:', errorData);
        setError('Product not found');
      }
    } catch (err) {
      console.error('Failed to load product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedOptions = async (excludeId?: string, search?: string) => {
    try {
      let url = '/api/products/related-options';
      const params = new URLSearchParams();
      if (excludeId) params.append('excludeId', excludeId);
      if (search) params.append('search', search);
      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRelatedProductOptions(data);
      }
    } catch (err) {
      console.error('Failed to fetch related products:', err);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: formData.slug || name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    });
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, ''] });
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
    setFormData({ ...formData, features: [...formData.features, ''] });
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
        specifications: { ...formData.specifications, [key]: '' },
      });
    }
  };

  const updateSpecification = (key: string, value: string) => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [key]: value },
    });
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    setFormData({ ...formData, specifications: rest });
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
    setSaving(true);

    try {
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

      console.log('Sending PUT request to:', `/api/products/${id}`);
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      let data;
      const responseText = await response.text();
      try {
        data = JSON.parse(responseText);
        console.log('🟢 RESPONSE DATA RECEIVED:');
        console.log('  → Full response:', JSON.stringify(data, null, 2));
        console.log('  → Has relatedProducts?:', 'relatedProducts' in data);
        console.log('  → relatedProducts:', data.relatedProducts);
        console.log('  → relatedProducts type:', typeof data.relatedProducts);
        console.log('  → relatedProducts is array?:', Array.isArray(data.relatedProducts));
        console.log('  → relatedProducts length:', data.relatedProducts?.length || 0);
        if (data.relatedProducts && data.relatedProducts.length > 0) {
          console.log('  → relatedProducts structure:', JSON.stringify(data.relatedProducts[0], null, 2));
        }
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', responseText);
        setError(`Server error (${response.status}): Invalid response format.`);
        return;
      }

      if (response.ok) {
        console.log('Product updated successfully, redirecting...');
        router.push('/admin/products');
      } else {
        console.error('Update failed with status:', response.status);
        console.error('Error data:', data);
        setError(data.error || 'Failed to update product');
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
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // Copy the form structure from new.tsx (same form, just different submit handler)
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-3xl font-bold text-[#ED276E] mb-8">Edit Product</h1>

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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <Input value={formData.name} onChange={handleNameChange} required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                      setFormData({ ...formData, slug: value });
                    }}
                    required
                    title="Slug must contain only lowercase letters, numbers, and hyphens"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                  <Textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sheen Level *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface Type *</label>
                  <Input
                    value={formData.surfaceType}
                    onChange={(e) => setFormData({ ...formData, surfaceType: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usage *</label>
                  <Input
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(['1L', '4L', '10L', '20L'] as const).map((size) => (
                    <div key={size}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{size}</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.prices[size]}
                        onChange={(e) => setFormData({
                          ...formData,
                          prices: { ...formData.prices, [size]: parseFloat(e.target.value) || 0 }
                        })}
                        required
                      />
                    </div>
                  ))}
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
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeColor(index)}>
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
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeFeature(index)}>
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
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeSpecification(key)}>
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
                    relatedProductOptions.map((product, index) => {
                      console.log(`🔵 CHECKBOX ${index + 1}/${relatedProductOptions.length}: ${product.name}`);
                      console.log(`  → Product ID: ${product.id}`);
                      console.log(`  → formData.relatedProductIds:`, formData.relatedProductIds);
                      const isChecked = formData.relatedProductIds.includes(product.id);
                      console.log(`  → includes check: formData.relatedProductIds.includes('${product.id}') = ${isChecked}`);
                      if (isChecked) {
                        console.log(`  ✅ CHECKBOX WILL BE CHECKED`);
                      } else {
                        console.log(`  ❌ CHECKBOX WILL BE UNCHECKED`);
                      }
                      return (
                        <label
                          key={product.id}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRelatedProduct(product.id)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">
                            {product.name} ({product.brand.name})
                          </span>
                        </label>
                      );
                    })
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
              <Button type="submit" disabled={saving} className="bg-[#299dd7] hover:bg-[#237bb0] text-white">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

