export const carpetAreaOptions = [
  { label: '1000-1200 Sq. ft.', value: 2500 },
  { label: '1201 - 1500 Sq. Ft.', value: 3000 },
  { label: '1501 - 1800 Sq. ft.', value: 3500 },
  { label: '1800 - 2200 Sq. ft.', value: 4200 },
  { label: '2201 - 2600 Sq. ft.', value: 4900 },
  { label: '2601 - 3000 Sq. ft.', value: 5700 },
  { label: '3001 - 3500 Sq. ft.', value: 6400 },
  { label: '3501 - 4000 Sq. ft.', value: 7200 },
  { label: '4000 - 4500 Sq. ft.', value: 7900 },
  { label: '4501 - 5000 Sq. ft.', value: 8800 },
  { label: '5001 - 5500 Sq. ft.', value: 9600 },
  { label: '5501 - 6000 Sq. ft.', value: 10500 },
  { label: '6001 - 6500 Sq. ft.', value: 11400 },
  { label: '6501 - 7000 Sq. ft.', value: 12300 },
  { label: '7001 - 7500 Sq. ft.', value: 13100 },
  { label: '7501 - 8000 Sq. ft.', value: 14000 },
  { label: '8001 - 8500 Sq. ft.', value: 14800 },
  { label: '8500 - 9000 Sq. ft.', value: 15700 },
  { label: '9001 - 9500 Sq. ft.', value: 16600 },
  { label: '9501 - 10000 Sq. ft', value: 17500 },
  { label: '10001 - 11000 Sq. ft', value: 19000 },
  { label: '11001 - 12000 Sq. ft.', value: 21000 },
  { label: '12001 - 13000 Sq. ft.', value: 23000 },
  { label: '13001 - 14000 Sq. ft.', value: 25000 },
  { label: '14001 - 15000 Sq. ft.', value: 27000 },
  { label: '15001 - 16000 Sq. ft.', value: 29000 },
  { label: '16001 - 17000 Sq. ft.', value: 31000 },
  { label: '17001 - 18000 Sq. ft.', value: 32000 },
  { label: '18001 - 19000 Sq. ft.', value: 34000 },
  { label: '19001 - 20000 Sq. ft', value: 35000 }
];

export const buildupAreaOptions = [
  { label: '1000-1200 Sq. ft.', value: 2200 },
  { label: '1201 - 1500 Sq. Ft.', value: 2650 },
  { label: '1501 - 1800 Sq. ft.', value: 3100 },
  { label: '1800 - 2200 Sq. ft.', value: 3700 },
  { label: '2201 - 2600 Sq. ft.', value: 4200 },
  { label: '2601 - 3000 Sq. ft.', value: 4900 },
  { label: '3001 - 3500 Sq. ft.', value: 5600 },
  { label: '3501 - 4000 Sq. ft.', value: 6300 },
  { label: '4000 - 4500 Sq. ft.', value: 7000 },
  { label: '4501 - 5000 Sq. ft.', value: 7700 },
  { label: '5001 - 5500 Sq. ft.', value: 8500 },
  { label: '5501 - 6000 Sq. ft.', value: 9250 },
  { label: '6001 - 6500 Sq. ft.', value: 10000 },
  { label: '6501 - 7000 Sq. ft.', value: 10750 },
  { label: '7001 - 7500 Sq. ft.', value: 11550 },
  { label: '7501 - 8000 Sq. ft.', value: 12350 },
  { label: '8001 - 8500 Sq. ft.', value: 13100 },
  { label: '8500 - 9000 Sq. ft.', value: 13900 },
  { label: '9001 - 9500 Sq. ft.', value: 14700 },
  { label: '9501 - 10000 Sq. ft', value: 15550 },
  { label: '10001 - 11000 Sq. ft', value: 17000 },
  { label: '11001 - 12000 Sq. ft.', value: 18500 },
  { label: '12001 - 13000 Sq. ft.', value: 20000 },
  { label: '13001 - 14000 Sq. ft.', value: 21750 },
  { label: '14001 - 15000 Sq. ft.', value: 23300 },
  { label: '15001 - 16000 Sq. ft.', value: 25000 },
  { label: '16001 - 17000 Sq. ft.', value: 26550 },
  { label: '17001 - 18000 Sq. ft.', value: 28200 },
  { label: '18001 - 19000 Sq. ft.', value: 30000 },
  { label: '19001 - 20000 Sq. ft', value: 31500 }
];

export type PaintOption = {
  value: string;
  name: string;
};

export interface WoodFinishOption {
  value: string;
  name: string;
}

export interface WoodFinishBrand {
  [brand: string]: WoodFinishOption[];
}

export interface WoodFinishOptions {
  [finishType: string]: WoodFinishBrand;
}

export type PaintCategory = {
  [key: string]: PaintOption[];
};

export type PaintOptions = {
  [key: string]: PaintCategory;
};

export const paintOptions: PaintOptions = {
  economical: {
    'asian-paints': [
      { value: '22', name: 'Tractor Emulsion (Recommended)' },
      { value: '23', name: 'Tractor Emulsion Advance' },
      { value: '23', name: 'Tractor Emulsion Shyne' },
      { value: '21', name: 'Tractor Emulsion Sparc' },
      { value: '21.5', name: 'Tractor Emulsion Sparc Advance' }
    ],
    'dulux': [
      { value: '22', name: 'Promise Interior (Recommended)' },
      { value: '21', name: 'Promise Interior Smart Choice' },
      { value: '23', name: 'Dulux Promise Sheen Interior' }
    ],
    'nerolac': [
      { value: '22', name: 'Nerolac Beauty Smooth Finish' },
      { value: '22', name: 'Nerolac Beauty Little Master' }
    ],
    'berger': [
      { value: '22', name: 'Berger Bison Acrylic Emulsion' },
      { value: '23', name: 'Berger Bison Glow Acrylic Emulsion' }
    ],
    'shalimar': [
      { value: '20', name: 'Shalimar Master Acrylic Emulsion' },
      { value: '20', name: 'Shalimar No. 1 Silk Acrylic Emulsion' }
    ],
    'jsw': [
      { value: '21', name: 'Pixa Joy Classic Interiors' },
      { value: '22', name: 'Pixa Elegant Interiors' },
      { value: '23', name: 'Pixa Elegant Interiors Silk' }
    ]
  },
  premium: {
    'asian-paints': [
      { value: '24', name: 'Apcolite Premium Emulsion (Recommended)' },
      { value: '24', name: 'Apcolite Premium Satin Emulsion' },
      { value: '26', name: 'Apcolite All Protek' },
      { value: '26', name: 'Apcolite Advance Shyne' },
      { value: '26', name: 'Apcolite Advanced Heavy Duty Emulsion' }
    ],
    'dulux': [
      { value: '24', name: 'Dulux Super Cover (Recommended)' },
      { value: '26', name: 'Dulux Super Clean' },
      { value: '27', name: 'Dulux Super Clean 3in1 (Recommended)' },
      { value: '26', name: 'Dulux Super Cover Sheen' }
    ],
    'nerolac': [
      { value: '24', name: 'Nerolac Pearls Emulsion' },
      { value: '24', name: 'Nerolac Pearls Luster Finish' },
      { value: '23', name: 'Nerolac Beauty Silver' },
      { value: '25', name: 'Nerolac Beauty Gold' },
      { value: '27', name: 'Nerolac Beauty Gold Washable (Recommended)' },
      { value: '26', name: 'Nerolac Beauty Sheen' },
      { value: '25', name: 'Nerolac Beauty Ceiling Emulsion' }
    ],
    'berger': [
      { value: '24', name: 'Berger Rangoli Total Care' }
    ],
    'shalimar': [
      { value: '22', name: 'Shalimar Superlac Advance' }
    ],
    'jsw': [
      { value: '24', name: 'Aurus Regal Interiors Lustre' },
      { value: '24', name: 'Aurus Regal Interiors' },
      { value: '26', name: 'Aurus Regal Interiors Silk' }
    ]
  },
  luxury: {
    'asian-paints': [
      { value: '34', name: 'Royale Luxury Emulsion (Recommended)' },
      { value: '35', name: 'Royale Lustre' },
      { value: '35', name: 'Royale Advanced' },
      { value: '34', name: 'Royale Matt (Recommended)' },
      { value: '36', name: 'Royale Shyne Luxury Emulsion' },
      { value: '38', name: 'Royale Health Shield' },
      { value: '40', name: 'Royale Aspira (Recommended)' },
      { value: '41', name: 'Royale Glitz' },
      { value: '38', name: 'Royale Atmos' }
    ],
    'dulux': [
      { value: '34', name: 'Dulux Velvet Touch Pearl Glo (Recommended)' },
      { value: '36', name: 'Dulux Velvet Touch Diamond Glo' },
      { value: '36', name: 'Dulux Velvet Touch Platinum Glo (Recommended)' },
      { value: '38', name: 'Dulux Ambiance Velvet Touch Elastoglo (Recommended)' },
      { value: '38', name: 'Dulux Better Living Air Biobased' }
    ],
    'nerolac': [
      { value: '34', name: 'Impressions Kashmir (Recommended)' },
      { value: '36', name: 'Impression Ultra HD' },
      { value: '36', name: 'Nerolac Impressions HD (Recommended)' },
      { value: '37', name: 'Impression Ultra Fresh' }
    ],
    'berger': [
      { value: '34', name: 'Berger Easy Clean (Recommended)' },
      { value: '36', name: 'Berger Easy Clean Fresh' },
      { value: '36', name: 'Berger Silk Glow' },
      { value: '38', name: 'Berger Silk Glamor Soft Sheen (Recommended)' },
      { value: '38', name: 'Berger Silk Glamor High Sheen' },
      { value: '38', name: 'Berger Silk Breathe Easy' }
    ],
    'shalimar': [
      { value: '31', name: 'Shalimar Superlac Stay Clean' },
      { value: '32', name: 'Shalimar Signature' }
    ],
    'jsw': [
      { value: '34', name: 'Vogue Astoniq' },
      { value: '38', name: 'Halo Majestic Interiors - Silk (Recommended)' },
      { value: '38', name: 'Halo Majestic Interiors Shine' }
    ]
  }
};

export const brandMap: { [key: string]: string } = {
  'asian-paints': 'Asian Paints',
  'dulux': 'Dulux',
  'nerolac': 'Nerolac',
  'berger': 'Berger',
  'shalimar': 'Shalimar',
  'jsw': 'JSW'
};

export const woodFinishOptions: WoodFinishOptions = {
  Lacquer: {
    'Wembley': [{ value: '80', name: 'Wembley' }],
    'Asian Paints': [{ value: '80', name: 'Asian Paints' }],
  },
  'Melamine Matt': {
    'Jubliant': [{ value: '180', name: 'Jubliant' }],
    'Dulux': [{ value: '180', name: 'Dulux' }],
    'Asian Paints': [{ value: '180', name: 'Asian Paints' }],
    'Berger': [{ value: '180', name: 'Berger' }],
  },
  'Melamine Gloss': {
    'Jubliant': [{ value: '180', name: 'Jubliant' }],
    'Dulux': [{ value: '180', name: 'Dulux' }],
    'Asian Paints': [{ value: '180', name: 'Asian Paints' }],
    'Berger': [{ value: '180', name: 'Berger' }],
  },
  'PU Clear Matt': {
    'Asian Paints WoodTech PU Luxury Clear': [{ value: '320', name: 'Asian Paints WoodTech PU Luxury Clear' }],
    'Asian Paints WoodTech Emporio PU Clear': [{ value: '350', name: 'Asian Paints WoodTech Emporio PU Clear' }],
    'ICA Coatings': [{ value: '350', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '350', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '300', name: 'Woodver' }],
    'Kapci': [{ value: '310', name: 'Kapci' }],
    'MRF': [{ value: '340', name: 'MRF' }],
    'Nerolac': [{ value: '330', name: 'Nerolac' }],
    'Berger': [{ value: '330', name: 'Berger' }],
    'Akzonobel': [{ value: '330', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '320', name: 'Sherim Willams' }],
    'Unico Sirca': [{ value: '300', name: 'Unico Sirca' }],
  },
  'PU Clear High Gloss': {
    'Asian Paints Luxury WoodTech PU Clear': [{ value: '375', name: 'Asian Paints Luxury WoodTech PU Clear' }],
    'Asian Paints WoodTech Emporio PU Clear': [{ value: '420', name: 'Asian Paints WoodTech Emporio PU Clear' }],
    'ICA Coatings': [{ value: '420', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '420', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '370', name: 'Woodver' }],
    'Kapci': [{ value: '380', name: 'Kapci' }],
    'MRF': [{ value: '400', name: 'MRF' }],
    'Nerolac': [{ value: '400', name: 'Nerolac' }],
    'Berger': [{ value: '400', name: 'Berger' }],
    'Akzonobel': [{ value: '400', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '400', name: 'Sherim Willams' }],
    'Unico Sirca': [{ value: '370', name: 'Unico Sirca' }],
  },
  'Water Based Clear PU': {
    'Asian Paints': [{ value: '200', name: 'Asian Paints' }],
    'Dulux': [{ value: '200', name: 'Dulux' }],
    'MRF': [{ value: '200', name: 'MRF' }],
  },
  'DUCO Paint': {
    'AkzoNobel': [{ value: '200', name: 'AkzoNobel' }],
  },
  'PU Paint Matt (Pigment)': {
    'Asian Paints PU Palette Interior': [{ value: '340', name: 'Asian Paints PU Palette Interior' }],
    'ICA Coatings': [{ value: '370', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '370', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '330', name: 'Woodver' }],
    'Kapci': [{ value: '340', name: 'Kapci' }],
    'MRF': [{ value: '350', name: 'MRF' }],
    'Nerolac': [{ value: '350', name: 'Nerolac' }],
    'Berger': [{ value: '350', name: 'Berger' }],
    'Akzonobel': [{ value: '350', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '350', name: 'Sherim Willams' }],
    'Asian Paints EMPORIO PU Palette': [{ value: '370', name: 'Asian Paints EMPORIO PU Palette' }],
    'UNICO Sirca': [{ value: '330', name: 'UNICO Sirca' }],
  },
  'PU High Gloss Paint (Pigment)': {
    'Asian Paints PU Palette Interior': [{ value: '380', name: 'Asian Paints PU Palette Interior' }],
    'ICA Coatings': [{ value: '420', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '420', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '380', name: 'Woodver' }],
    'Kapci': [{ value: '390', name: 'Kapci' }],
    'MRF': [{ value: '395', name: 'MRF' }],
    'Nerolac': [{ value: '395', name: 'Nerolac' }],
    'Berger': [{ value: '395', name: 'Berger' }],
    'Akzonobel': [{ value: '395', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '395', name: 'Sherim Willams' }],
    'Asian Paints EMPORIO PU Palette': [{ value: '420', name: 'Asian Paints EMPORIO PU Palette' }],
    'UNICO Sirca': [{ value: '380', name: 'UNICO Sirca' }],
  },
  'Polyester Clear': {
    'ICA': [{ value: '550', name: 'ICA' }],
    'Sirca': [{ value: '550', name: 'Sirca' }],
    'Asian Paints': [{ value: '550', name: 'Asian Paints' }],
  },
  'Polyester Pigment': {
    'ICA': [{ value: '650', name: 'ICA' }],
    'Sirca': [{ value: '650', name: 'Sirca' }],
    'Asian Paints': [{ value: '650', name: 'Asian Paints' }],
  },
  'Enamel Paint (Satin or Gloss)': {
    'Asian Paints': [{ value: '30', name: 'Asian Paints' }],
    'Berger': [{ value: '30', name: 'Berger' }],
    'Dulux': [{ value: '30', name: 'Dulux' }],
    'Nerolac': [{ value: '30', name: 'Nerolac' }],
    'Shalimar': [{ value: '30', name: 'Shalimar' }],
  },
};
