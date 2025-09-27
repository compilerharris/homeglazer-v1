export interface GalleryItem {
  id: string
  title: string
  beforeImage: string
  afterImage: string
  description: string
  tags: string[]
}

export interface RoomCategory {
  id: string
  name: string
  description: string
  icon: string
  items: GalleryItem[]
}

export const galleryData: RoomCategory[] = [
  {
    id: 'bedroom',
    name: 'Bedrooms',
    description: 'Transform your bedroom into a peaceful retreat',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
    items: [
      {
        id: 'bedroom-1',
        title: 'Master Bedroom Makeover',
        beforeImage: '/assets/images/homeoffice/homeoffice1/homeoffice1.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice2/homeoffice2.jpg',
        description: 'Modern neutral tones with accent wall',
        tags: ['neutral', 'modern', 'accent-wall']
      },
      {
        id: 'bedroom-2', 
        title: 'Kids Bedroom Transformation',
        beforeImage: '/assets/images/homeoffice/homeoffice3/homeoffice3.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice4/homeoffice4.jpg',
        description: 'Bright and playful color scheme',
        tags: ['colorful', 'kids', 'playful']
      }
    ]
  },
  {
    id: 'living',
    name: 'Living Rooms',
    description: 'Create the perfect space for family gatherings',
    icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2-3v3m0 0v3m0-3h3m-3 0h-3',
    items: [
      {
        id: 'living-1',
        title: 'Open Concept Living',
        beforeImage: '/assets/images/homeoffice/homeoffice7/homeoffice7.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice8/homeoffice8.jpg',
        description: 'Warm earth tones for cozy atmosphere',
        tags: ['earth-tones', 'cozy', 'open-concept']
      },
      {
        id: 'living-2',
        title: 'Modern Living Space',
        beforeImage: '/assets/images/homeoffice/homeoffice9/homeoffice9.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice10/homeoffice10.jpg',
        description: 'Bold feature wall with contemporary colors',
        tags: ['modern', 'feature-wall', 'bold']
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchens',
    description: 'Modern kitchen transformations that inspire cooking',
    icon: 'M4 7v10c0 2.21 3.79 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.79 4 8 4s8-1.79 8-4M4 7c0-2.21 3.79-4 8-4s8 1.79 8 4',
    items: [
      {
        id: 'kitchen-1',
        title: 'Cabinet Color Change',
        beforeImage: '/assets/images/homeoffice/homeoffice3/homeoffice3.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice4/homeoffice4.jpg',
        description: 'From dated wood to modern white cabinets',
        tags: ['cabinets', 'white', 'modern']
      },
      {
        id: 'kitchen-2',
        title: 'Accent Wall Kitchen',
        beforeImage: '/assets/images/homeoffice/homeoffice5/homeoffice5.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice6/homeoffice6.jpg',
        description: 'Bold backsplash area transformation',
        tags: ['backsplash', 'bold', 'accent']
      }
    ]
  },
  {
    id: 'outdoor',
    name: 'Outdoor Spaces',
    description: 'Extend your living space with outdoor transformations',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    items: [
      {
        id: 'outdoor-1',
        title: 'Deck Staining Project',
        beforeImage: '/assets/images/homeoffice/homeoffice7/homeoffice7.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice8/homeoffice8.jpg',
        description: 'Weather-resistant stain and protection',
        tags: ['deck', 'staining', 'weather-resistant']
      },
      {
        id: 'outdoor-2',
        title: 'Fence Makeover',
        beforeImage: '/assets/images/homeoffice/homeoffice9/homeoffice9.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice10/homeoffice10.jpg',
        description: 'Fresh paint brings new life to old fencing',
        tags: ['fence', 'exterior', 'fresh']
      }
    ]
  },
  {
    id: 'office',
    name: 'Home Offices',
    description: 'Professional workspace transformations',
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7',
    items: [
      {
        id: 'office-1',
        title: 'Home Office Productivity',
        beforeImage: '/assets/images/homeoffice/homeoffice1/homeoffice1.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice2/homeoffice2.jpg',
        description: 'Calming colors to boost productivity',
        tags: ['productivity', 'calming', 'professional']
      },
      {
        id: 'office-2',
        title: 'Modern Workspace Design',
        beforeImage: '/assets/images/homeoffice/homeoffice3/homeoffice3.jpg',
        afterImage: '/assets/images/homeoffice/homeoffice4/homeoffice4.jpg',
        description: 'Contemporary office with vibrant accent walls',
        tags: ['modern', 'vibrant', 'contemporary']
      }
    ]
  }
]

// Preload hints for better performance
export const preloadImages = [
  '/assets/images/homeoffice/homeoffice1/homeoffice1.jpg',
  '/assets/images/homeoffice/homeoffice2/homeoffice2.jpg',
  '/assets/images/homeoffice/homeoffice3/homeoffice3.jpg',
  '/assets/images/homeoffice/homeoffice4/homeoffice4.jpg'
]
