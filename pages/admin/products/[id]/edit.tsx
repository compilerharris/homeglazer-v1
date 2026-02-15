import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORY_OPTIONS, SUB_CATEGORY_OPTIONS, SIZE_UNIT_OPTIONS } from '@/lib/product-constants';

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
  subCategory?: string | null;
  sheenLevel: string;
  surfaceType: string;
  usage: string;
  image: string;
  bannerImage?: string | null;
  prices: Record<string, number>;
  colors: string[];
  features: string[];
  specifications: Record<string, string>;
  pisHeading?: string;
  pisDescription?: string;
  pisFileUrl?: string;
  showPisSection?: boolean;
  userGuideSteps?: Array<{title: string, description: string}>;
  userGuideMaterials?: string[];
  userGuideTips?: string[];
  showUserGuide?: boolean;
  faqs?: Array<{question: string, answer: string}>;
  showFaqSection?: boolean;
  relatedProducts: Array<{
    relatedProduct: {
      id: string;
      name: string;
    };
  }>;
  suggestedBlogs?: Array<{
    blog: {
      id: string;
      title: string;
      categories: string[];
    };
  }>;
}

const SHEEN_LEVELS = ['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'] as const;
const SURFACE_TYPES = ['Interior Wall', 'Exterior Wall', 'Wood', 'Metal'] as const;
const USAGE_TYPES = ['Home', 'Commercial'] as const;

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBannerImage, setUploadingBannerImage] = useState(false);
  const [uploadingPis, setUploadingPis] = useState(false);
  const [error, setError] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [relatedProductOptions, setRelatedProductOptions] = useState<ProductOption[]>([]);
  const [searchRelated, setSearchRelated] = useState('');
  const [blogOptions, setBlogOptions] = useState<Array<{id: string, title: string, categories: string[]}>>([]);
  const [formData, setFormData] = useState({
    brandId: '',
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: '',
    subCategory: '',
    sheenLevel: 'Mat' as typeof SHEEN_LEVELS[number],
    surfaceType: 'Interior Wall' as typeof SURFACE_TYPES[number],
    usage: 'Home' as typeof USAGE_TYPES[number],
    image: '',
    bannerImage: '',
    sizeUnit: 'L' as 'L' | 'K' | 'P',
    availableSizes: ['1', '4', '10', '20'],
    colors: [''],
    features: [''],
    specifications: {} as Record<string, string>,
    relatedProductIds: [] as string[],
    suggestedBlogIds: [] as string[],
    pisHeading: '',
    pisDescription: '',
    pisFileUrl: '',
    showPisSection: false,
    userGuideSteps: [] as Array<{title: string, description: string}>,
    userGuideMaterials: [''],
    userGuideTips: [''],
    showUserGuide: false,
    faqs: [] as Array<{question: string, answer: string}>,
    showFaqSection: false,
  });

  useEffect(() => {
    fetchBrands();
    fetchBlogs();
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

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogOptions(data.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          categories: Array.isArray(blog.categories) ? blog.categories : [],
        })));
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
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
        
        // Extract suggested blog IDs
        const extractedBlogIds = product.suggestedBlogs?.map((sb: any) => sb.blog.id).filter(Boolean) || [];
        console.log('  → Extracted blog IDs:', extractedBlogIds);
        
        console.log('  → STEP 8: Setting formData state');
        setFormData({
          brandId: product.brandId,
          name: product.name,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          category: CATEGORY_OPTIONS.includes(product.category as any)
            ? product.category
            : 'Interior & Exterior Both',
          subCategory: product.subCategory && SUB_CATEGORY_OPTIONS.includes(product.subCategory as any)
            ? product.subCategory
            : '',
          sheenLevel: product.sheenLevel as typeof SHEEN_LEVELS[number],
          surfaceType: product.surfaceType as typeof SURFACE_TYPES[number],
          usage: product.usage as typeof USAGE_TYPES[number],
          image: product.image,
          bannerImage: product.bannerImage || '',
          sizeUnit: (() => {
            const keys = product.prices && typeof product.prices === 'object'
              ? Object.keys(product.prices).filter((k) => product.prices[k])
              : [];
            const first = keys[0] || '';
            if (/K$/i.test(first)) return 'K';
            if (/P$/i.test(first)) return 'P';
            return 'L';
          })(),
          availableSizes: product.prices && typeof product.prices === 'object'
            ? Object.keys(product.prices)
                .filter((k) => product.prices[k])
                .map((k) => k.replace(/^(\d+(?:\.\d+)?)[LKP]$/i, '$1') || k)
                .sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0))
            : ['1', '4', '10', '20'],
          colors: product.colors && product.colors.length > 0 ? product.colors : [''],
          features: product.features && product.features.length > 0 ? product.features : [''],
          specifications: product.specifications || {},
          relatedProductIds: extractedRelatedIds,
          suggestedBlogIds: extractedBlogIds,
          pisHeading: product.pisHeading || '',
          pisDescription: product.pisDescription || '',
          pisFileUrl: product.pisFileUrl || '',
          showPisSection: product.showPisSection || false,
          userGuideSteps: (product.userGuideSteps as Array<{title: string, description: string}>) || [],
          userGuideMaterials: (product.userGuideMaterials as string[]) || [''],
          userGuideTips: (product.userGuideTips as string[]) || [''],
          showUserGuide: product.showUserGuide || false,
          faqs: (product.faqs as Array<{question: string, answer: string}>) || [],
          showFaqSection: product.showFaqSection || false,
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

  const addSize = () => {
    setFormData({ ...formData, availableSizes: [...formData.availableSizes, ''] });
  };

  const removeSize = (index: number) => {
    setFormData({
      ...formData,
      availableSizes: formData.availableSizes.filter((_, i) => i !== index),
    });
  };

  const updateSize = (index: number, value: string) => {
    const newSizes = [...formData.availableSizes];
    newSizes[index] = value;
    setFormData({ ...formData, availableSizes: newSizes });
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

  const toggleSuggestedBlog = (blogId: string) => {
    setFormData({
      ...formData,
      suggestedBlogIds: formData.suggestedBlogIds.includes(blogId)
        ? formData.suggestedBlogIds.filter(id => id !== blogId)
        : [...formData.suggestedBlogIds, blogId],
    });
  };

  // User Guide helper functions
  const addStep = () => {
    setFormData({
      ...formData,
      userGuideSteps: [...formData.userGuideSteps, { title: '', description: '' }],
    });
  };

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      userGuideSteps: formData.userGuideSteps.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index: number, field: 'title' | 'description', value: string) => {
    const newSteps = [...formData.userGuideSteps];
    newSteps[index][field] = value;
    setFormData({ ...formData, userGuideSteps: newSteps });
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      userGuideMaterials: [...formData.userGuideMaterials, ''],
    });
  };

  const removeMaterial = (index: number) => {
    setFormData({
      ...formData,
      userGuideMaterials: formData.userGuideMaterials.filter((_, i) => i !== index),
    });
  };

  const updateMaterial = (index: number, value: string) => {
    const newMaterials = [...formData.userGuideMaterials];
    newMaterials[index] = value;
    setFormData({ ...formData, userGuideMaterials: newMaterials });
  };

  const addTip = () => {
    setFormData({
      ...formData,
      userGuideTips: [...formData.userGuideTips, ''],
    });
  };

  const removeTip = (index: number) => {
    setFormData({
      ...formData,
      userGuideTips: formData.userGuideTips.filter((_, i) => i !== index),
    });
  };

  const updateTip = (index: number, value: string) => {
    const newTips = [...formData.userGuideTips];
    newTips[index] = value;
    setFormData({ ...formData, userGuideTips: newTips });
  };

  // FAQ handlers
  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }],
    });
  };

  const removeFaq = (index: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== index),
    });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const colors = formData.colors.filter(c => c.trim() !== '');
      const features = formData.features.filter(f => f.trim() !== '');
      const userGuideMaterials = formData.userGuideMaterials.filter(m => m.trim() !== '');
      const userGuideTips = formData.userGuideTips.filter(t => t.trim() !== '');
      const userGuideSteps = formData.userGuideSteps.filter(s => s.title.trim() !== '' || s.description.trim() !== '');
      const faqs = formData.faqs.filter(f => f.question.trim() !== '' || f.answer.trim() !== '');

      const unit = formData.sizeUnit || 'L';
      const rawSizes = formData.availableSizes
        .filter((s) => s.trim() !== '')
        .map((s) => {
          const t = s.trim();
          const m = t.match(/^(\d+(?:\.\d+)?)[LKP]$/i);
          return m ? m[1] : t;
        });
      const uniqueSizes = Array.from(new Set(rawSizes));
      const prices = Object.fromEntries(uniqueSizes.map((s) => [`${s}${unit}`, 1]));

      const { availableSizes, ...restFormData } = formData;
      const payload = {
        ...restFormData,
        prices,
        colors,
        features,
        specifications: Object.fromEntries(
          Object.entries(formData.specifications).filter(([_, v]) => v.trim() !== '')
        ),
        userGuideMaterials,
        userGuideTips,
        userGuideSteps,
        faqs,
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
        setError(data?.message || data?.error || 'Failed to update product');
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
          <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Basic Information</h2>
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
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof CATEGORY_OPTIONS[number] })}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                  <select
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  >
                    <option value="">Select sub category (optional)</option>
                    {SUB_CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
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
                                credentials: 'include',
                              });
                              
                              const data = await response.json().catch(() => ({}));
                              if (response.ok && data.success) {
                                setFormData(prev => ({ ...prev, image: data.url }));
                              } else {
                                alert(data.error || `Upload failed (${response.status})`);
                              }
                            } catch (err) {
                              console.error('Upload error:', err);
                              alert(err instanceof Error ? err.message : 'Failed to upload image');
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        disabled={uploadingBannerImage}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadingBannerImage(true);
                            const fd = new FormData();
                            fd.append('image', file);
                            fd.append('type', 'product');
                            try {
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                body: fd,
                                credentials: 'include',
                              });
                              const data = await response.json().catch(() => ({}));
                              if (response.ok && data.success) {
                                setFormData(prev => ({ ...prev, bannerImage: data.url }));
                              } else {
                                alert(data.error || `Upload failed (${response.status})`);
                              }
                            } catch (err) {
                              console.error('Upload error:', err);
                              alert(err instanceof Error ? err.message : 'Failed to upload image');
                            } finally {
                              setUploadingBannerImage(false);
                            }
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#299dd7] file:text-white hover:file:bg-[#237bb0]"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        value={formData.bannerImage}
                        onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                        placeholder="Or enter image URL (e.g., /media/products/banner.jpg)"
                        className="mt-2"
                        disabled={uploadingBannerImage}
                      />
                      {uploadingBannerImage && (
                        <p className="text-xs text-gray-500 mt-1">Uploading image...</p>
                      )}
                    </div>
                    {formData.bannerImage && (
                      <div className="mt-3 max-w-2xl">
                        <img 
                          src={formData.bannerImage} 
                          alt="Banner preview" 
                          className="w-full h-auto object-contain border border-gray-200 rounded-lg"
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
              <h2 className="text-lg font-bold mb-4">Product Specifications</h2>
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
                  <select
                    value={formData.surfaceType}
                    onChange={(e) => setFormData({ ...formData, surfaceType: e.target.value as typeof SURFACE_TYPES[number] })}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  >
                    {SURFACE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usage *</label>
                  <select
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value as typeof USAGE_TYPES[number] })}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  >
                    {USAGE_TYPES.map((usage) => (
                      <option key={usage} value={usage}>
                        {usage}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Available Sizes */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Available Sizes</h2>
              <div className="flex gap-6 mb-4">
                {SIZE_UNIT_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sizeUnit"
                      value={opt.value}
                      checked={formData.sizeUnit === opt.value}
                      onChange={() => setFormData({ ...formData, sizeUnit: opt.value })}
                      className="w-4 h-4 text-[#299dd7]"
                    />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Add the sizes available for this product (e.g. 1, 4, 10, 20)
              </p>
              <div className="space-y-3">
                {formData.availableSizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={size}
                      onChange={(e) => updateSize(index, e.target.value)}
                      placeholder={formData.sizeUnit === 'K' ? 'Size (e.g. 1, 5, 25)' : formData.sizeUnit === 'P' ? 'Size (e.g. 1, 5, 10)' : 'Size (e.g. 1, 4, 10, 20)'}
                    />
                    {formData.availableSizes.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSize(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addSize}>
                  + Add Size
                </Button>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Colors</h2>
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
              <h2 className="text-lg font-bold mb-4">Features</h2>
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
              <h2 className="text-lg font-bold mb-4">Specifications</h2>
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
              <h2 className="text-lg font-bold mb-4">Related Products</h2>
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

            {/* Suggested Blog Articles */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Suggested Blog Articles</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select blog articles to show in the "Want some suggestion?" section on the product page
              </p>
              <div className="max-h-60 overflow-y-auto border rounded-lg p-4 space-y-2">
                {blogOptions.length === 0 ? (
                  <p className="text-sm text-gray-500">No blogs found</p>
                ) : (
                  blogOptions.map((blog) => {
                    const isChecked = formData.suggestedBlogIds.includes(blog.id);
                    return (
                      <label
                        key={blog.id}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSuggestedBlog(blog.id)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium">{blog.title}</span>
                          {blog.categories.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {blog.categories.map((cat, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                  {cat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
              {formData.suggestedBlogIds.length > 0 && (
                <p className="text-sm text-gray-600 mt-4">
                  {formData.suggestedBlogIds.length} blog(s) selected
                </p>
              )}
            </div>

            {/* User Guide */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">User Guide</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="showUserGuide"
                    checked={formData.showUserGuide}
                    onChange={(e) => setFormData({ ...formData, showUserGuide: e.target.checked })}
                    className="w-4 h-4 text-[#299dd7] rounded"
                  />
                  <label htmlFor="showUserGuide" className="text-sm font-medium text-gray-700">
                    Enable User Guide section
                  </label>
                </div>

                {formData.showUserGuide && (
                  <>
                    {/* Steps */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Step-by-Step Process
                      </label>
                      <div className="space-y-3">
                        {formData.userGuideSteps.map((step, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-2">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm font-semibold text-gray-700">Step {index + 1}</span>
                              {formData.userGuideSteps.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeStep(index)}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <Input
                              value={step.title}
                              onChange={(e) => updateStep(index, 'title', e.target.value)}
                              placeholder="Step title (e.g., Surface Preparation)"
                            />
                            <Textarea
                              value={step.description}
                              onChange={(e) => updateStep(index, 'description', e.target.value)}
                              placeholder="Step description"
                              rows={3}
                            />
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addStep}>
                          + Add Step
                        </Button>
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Materials You'll Need
                      </label>
                      <div className="space-y-3">
                        {formData.userGuideMaterials.map((material, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={material}
                              onChange={(e) => updateMaterial(index, e.target.value)}
                              placeholder="Material name"
                            />
                            {formData.userGuideMaterials.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeMaterial(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addMaterial}>
                          + Add Material
                        </Button>
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tips
                      </label>
                      <div className="space-y-3">
                        {formData.userGuideTips.map((tip, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={tip}
                              onChange={(e) => updateTip(index, e.target.value)}
                              placeholder="Tip description"
                            />
                            {formData.userGuideTips.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeTip(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addTip}>
                          + Add Tip
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="showFaqSection"
                    checked={formData.showFaqSection}
                    onChange={(e) => setFormData({ ...formData, showFaqSection: e.target.checked })}
                    className="w-4 h-4 text-[#299dd7] rounded"
                  />
                  <label htmlFor="showFaqSection" className="text-sm font-medium text-gray-700">
                    Enable FAQ section
                  </label>
                </div>

                {formData.showFaqSection && (
                  <>
                    {/* FAQs */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        FAQs
                      </label>
                      <div className="space-y-3">
                        {formData.faqs.map((faq, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-2">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm font-semibold text-gray-700">FAQ {index + 1}</span>
                              {formData.faqs.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeFaq(index)}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <Input
                              value={faq.question}
                              onChange={(e) => updateFaq(index, 'question', e.target.value)}
                              placeholder="Question (e.g., What is the coverage area of this paint?)"
                            />
                            <Textarea
                              value={faq.answer}
                              onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                              placeholder="Answer"
                              rows={3}
                            />
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addFaq}>
                          + Add FAQ
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Information Sheet */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Product Information Sheet (PIS)</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="showPisSection"
                    checked={formData.showPisSection}
                    onChange={(e) => setFormData({ ...formData, showPisSection: e.target.checked })}
                    className="w-4 h-4 text-[#299dd7] rounded"
                  />
                  <label htmlFor="showPisSection" className="text-sm font-medium text-gray-700">
                    Enable Product Information Sheet section
                  </label>
                </div>

                {formData.showPisSection && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIS Heading (Optional)
                      </label>
                      <Input
                        value={formData.pisHeading}
                        onChange={(e) => setFormData({ ...formData, pisHeading: e.target.value })}
                        placeholder="Leave empty to use default heading"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Default: "Download Product Information Sheet for [Brand] [Product Name]"
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIS Description (Optional)
                      </label>
                      <Textarea
                        value={formData.pisDescription}
                        onChange={(e) => setFormData({ ...formData, pisDescription: e.target.value })}
                        rows={2}
                        placeholder="Leave empty to use default description"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Default: "Get detailed technical specifications, application guidelines, and safety information for this product."
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIS PDF File
                      </label>
                      <div className="space-y-3">
                        <div>
                          <input
                            type="file"
                            accept="application/pdf"
                            disabled={uploadingPis}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setUploadingPis(true);
                                const formData = new FormData();
                                formData.append('image', file);
                                formData.append('type', 'document');
                                
                                try {
                                  const response = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData,
                                    credentials: 'include',
                                  });
                                  
                                  const data = await response.json().catch(() => ({}));
                                  if (response.ok && data.success) {
                                    setFormData(prev => ({ ...prev, pisFileUrl: data.url }));
                                  } else {
                                    alert(data.error || `Upload failed (${response.status})`);
                                  }
                                } catch (err) {
                                  console.error('Upload error:', err);
                                  alert(err instanceof Error ? err.message : 'Failed to upload PDF');
                                } finally {
                                  setUploadingPis(false);
                                }
                              }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#299dd7] file:text-white hover:file:bg-[#237bb0]"
                          />
                        </div>
                        <div>
                          <Input
                            type="text"
                            value={formData.pisFileUrl}
                            onChange={(e) => setFormData({ ...formData, pisFileUrl: e.target.value })}
                            placeholder="Or enter PDF URL (e.g., /uploads/documents/file.pdf)"
                            className="mt-2"
                            disabled={uploadingPis}
                          />
                          {uploadingPis && (
                            <p className="text-xs text-gray-500 mt-1">Uploading PDF...</p>
                          )}
                        </div>
                        {formData.pisFileUrl && (
                          <div className="mt-3">
                            <a
                              href={formData.pisFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#299dd7] hover:underline flex items-center gap-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                              </svg>
                              Preview PDF
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
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

