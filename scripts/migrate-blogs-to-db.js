const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const blogPostsData = [
  {
    slug: 'choosing-the-perfect-paint-colors-for-your-home',
    title: 'Choosing the Perfect Paint Colours for Your Home',
    excerpt: 'Learn how to select the ideal paint colours that complement your home\'s architecture and reflect your personal style. Our expert guide walks you through the process.',
    content: `
<h2>Introduction</h2>
<p>Choosing the right paint colour for your home can be a daunting task. With thousands of shades available, it's easy to feel overwhelmed. But don't worry – with the right approach and some expert guidance, you can select colours that will transform your space and reflect your personal style.</p>

<h2>Understanding Colour Theory</h2>
<p>Before diving into specific colours, it's helpful to understand some basic colour theory. The colour wheel is your friend here. Complementary colours (opposite on the wheel) create vibrant contrasts, while analogous colours (next to each other) create harmonious, soothing schemes.</p>

<h2>Consider Your Home's Architecture</h2>
<p>Your home's architectural style should guide your colour choices. Traditional homes often look best with classic, muted tones, while modern architecture can handle bolder, more dramatic colours. Consider the existing elements like flooring, fixtures, and furniture when making your selection.</p>

<h2>Test Before You Commit</h2>
<p>Always test paint colours on your walls before making a final decision. Paint large swatches (at least 2x2 feet) and observe them at different times of day. Natural light changes throughout the day, and your colour may look different in morning light versus evening light.</p>

<h2>Room-by-Room Considerations</h2>
<p>Each room serves a different purpose and should be treated accordingly. Living rooms benefit from warm, inviting colours. Bedrooms should use calming, restful tones. Kitchens can handle brighter, energizing colours. Bathrooms work well with spa-like, serene shades.</p>

<h2>Final Tips</h2>
<ul>
<li>Start with neutrals if you're unsure – they're timeless and versatile</li>
<li>Use the 60-30-10 rule: 60% dominant colour, 30% secondary, 10% accent</li>
<li>Consider the mood you want to create in each space</li>
<li>Don't be afraid to use multiple colours, but ensure they work together</li>
</ul>
    `.trim(),
    author: 'Emma Johnson',
    readTime: '8',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2534&q=80',
    categories: ['Interior Painting', 'Colour Ideas'],
    published: true,
    metaDescription: 'Expert guide on choosing the perfect paint colours for your home. Learn colour theory, testing techniques, and room-specific recommendations.',
    metaKeywords: 'paint colours, home painting, colour selection, interior design',
    featuredOrder: 1,
  },
  {
    slug: 'how-to-prepare-walls-for-painting',
    title: 'How to Properly Prepare Walls for Painting',
    excerpt: 'Wall preparation is the most crucial step for achieving a flawless paint finish. Discover the professional techniques our painters use before applying the first coat.',
    content: `
<h2>Why Wall Preparation Matters</h2>
<p>Professional painters know that preparation is 80% of the job. A properly prepared surface ensures better paint adhesion, smoother finish, and longer-lasting results. Skipping this step will lead to peeling, cracking, and an unprofessional appearance.</p>

<h2>Step 1: Clear and Clean the Room</h2>
<p>Remove all furniture or move it to the center and cover with drop cloths. Take down wall decorations, switch plates, and outlet covers. Protect floors with canvas drop cloths or plastic sheeting.</p>

<h2>Step 2: Repair Surface Imperfections</h2>
<p>Fill holes and cracks with spackling paste or joint compound. For larger holes, use a patching kit. Allow repairs to dry completely, then sand smooth with 120-grit sandpaper. Remove sanding dust with a tack cloth or damp sponge.</p>

<h2>Step 3: Clean the Walls</h2>
<p>Wash walls with a solution of warm water and mild detergent to remove dirt, grease, and grime. Pay special attention to areas around light switches and high-traffic zones. Rinse with clean water and allow to dry completely.</p>

<h2>Step 4: Apply Primer</h2>
<p>Primer is essential for bare surfaces and dramatic color changes. It provides better adhesion, hides stains, and reduces the number of paint coats needed. Choose the right primer for your surface type – there are different primers for drywall, wood, and metal.</p>

<h2>Step 5: Final Preparations</h2>
<p>Apply painter's tape along ceiling edges, baseboards, and trim for clean lines. Cover any areas you don't want painted. Do a final inspection to ensure the surface is clean, dry, and smooth.</p>

<h2>Pro Tips</h2>
<ul>
<li>Use quality tools – cheap brushes and rollers will leave marks</li>
<li>Don't skip primer, especially on new drywall</li>
<li>Allow adequate drying time between steps</li>
<li>Work in good lighting to spot imperfections</li>
</ul>
    `.trim(),
    author: 'Michael Chen',
    readTime: '6',
    coverImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    categories: ['DIY Projects', 'Tips & Tricks'],
    published: true,
    metaDescription: 'Professional wall preparation techniques for perfect paint results. Learn how to clean, repair, and prime walls before painting.',
    metaKeywords: 'wall preparation, painting walls, primer, diy painting',
    featuredOrder: 2,
  },
  {
    slug: 'trending-exterior-paint-colors-for-2023',
    title: 'Trending Exterior Paint Colours for 2023',
    excerpt: 'Stay ahead of the curve with our roundup of the most popular exterior paint colours for this year. From bold statements to subtle elegance, find the perfect shade.',
    content: `
<h2>2023 Colour Trends Overview</h2>
<p>This year's exterior paint trends reflect a desire for connection with nature, timeless elegance, and bold self-expression. From earthy neutrals to vibrant statements, there's something for every architectural style.</p>

<h2>1. Warm Earth Tones</h2>
<p>Terracotta, clay, and warm beige tones are dominating the scene. These colours create a welcoming, grounded feel and work beautifully with natural landscaping. They're especially stunning on Mediterranean and contemporary homes.</p>

<h2>2. Deep Forest Greens</h2>
<p>Hunter green, sage, and deep emerald shades bring sophistication and connection to nature. These colours are perfect for homes surrounded by greenery and pair beautifully with natural wood accents.</p>

<h2>3. Classic Blues</h2>
<p>Navy, slate blue, and soft sky blue remain popular choices. These timeless colours work with virtually any architectural style and create a calming, elegant exterior.</p>

<h2>4. Modern Grays</h2>
<p>Charcoal, greige (gray-beige), and warm gray continue their popularity. These versatile neutrals provide a contemporary look and serve as an excellent backdrop for colourful landscaping.</p>

<h2>5. Bold Black</h2>
<p>Matte black exteriors are making a statement. When done right, black creates dramatic curb appeal and modern sophistication. Pair with white trim for classic contrast.</p>

<h2>Choosing the Right Shade</h2>
<p>Consider your neighbourhood, your home's architectural style, and your personal preference. Also think about maintenance – lighter colours show dirt less but may fade faster in direct sunlight.</p>
    `.trim(),
    author: 'Sarah Williams',
    readTime: '5',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    categories: ['Exterior Painting', 'Trends'],
    published: true,
    metaDescription: '2023 trending exterior paint colours from warm earth tones to bold blacks. Find the perfect colour for your home exterior.',
    metaKeywords: 'exterior paint trends, paint colours 2023, exterior painting ideas',
    featuredOrder: 3,
  },
  {
    slug: 'the-benefits-of-eco-friendly-paints',
    title: 'The Benefits of Eco-Friendly Paints',
    excerpt: 'Discover why more homeowners are choosing eco-friendly paints. Learn about their advantages for your health, home, and the environment.',
    content: `
<h2>What Are Eco-Friendly Paints?</h2>
<p>Eco-friendly paints, also known as low-VOC or zero-VOC paints, contain minimal or no volatile organic compounds. VOCs are chemicals that evaporate into the air and can cause health issues and environmental damage.</p>

<h2>Health Benefits</h2>
<p>Traditional paints release harmful fumes that can cause headaches, dizziness, and respiratory issues. Eco-friendly paints minimize these risks, making them ideal for homes with children, pets, or family members with allergies or asthma. You can often move back into painted rooms the same day.</p>

<h2>Environmental Impact</h2>
<p>Low-VOC paints reduce air pollution and are better for the environment. Many eco-friendly options are made from renewable resources and use recycled materials in their packaging. By choosing green paints, you're reducing your carbon footprint.</p>

<h2>Quality and Performance</h2>
<p>Modern eco-friendly paints perform just as well as traditional options. They offer excellent coverage, durability, and color retention. The technology has advanced significantly, and you no longer have to compromise on quality to go green.</p>

<h2>Cost Considerations</h2>
<p>While eco-friendly paints may cost slightly more upfront, they often save money long-term through better coverage (requiring fewer coats) and durability. Plus, you're investing in your family's health and the environment.</p>

<h2>Making the Switch</h2>
<p>Look for paints labeled "Low-VOC" (less than 50 grams per liter) or "Zero-VOC" (less than 5 grams per liter). Check for third-party certifications like Green Seal or Greenguard to ensure the product meets environmental standards.</p>
    `.trim(),
    author: 'David Martinez',
    readTime: '7',
    coverImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    categories: ['Interior Painting', 'Tips & Tricks'],
    published: true,
    metaDescription: 'Learn about eco-friendly paint benefits for health, environment, and performance. Guide to low-VOC and zero-VOC paints.',
    metaKeywords: 'eco-friendly paint, low voc paint, green paint, sustainable painting',
  },
  {
    slug: 'how-to-paint-kitchen-cabinets-like-a-pro',
    title: 'How to Paint Kitchen Cabinets Like a Pro',
    excerpt: 'Transform your kitchen without the cost of a full renovation. Our step-by-step guide shows you how to achieve professional-quality results when painting your cabinets.',
    content: `
<h2>Kitchen Cabinet Painting Overview</h2>
<p>Painting kitchen cabinets is one of the most cost-effective ways to update your kitchen. With proper preparation and technique, you can achieve results that rival professional refinishing at a fraction of the cost.</p>

<h2>Materials You'll Need</h2>
<ul>
<li>Screwdriver for removing hardware</li>
<li>TSP (trisodium phosphate) or degreaser</li>
<li>Sandpaper (120 and 220 grit)</li>
<li>Tack cloth</li>
<li>Primer (oil-based or shellac-based)</li>
<li>Cabinet paint (acrylic or oil-based)</li>
<li>Quality brushes and foam rollers</li>
<li>Painter's tape</li>
</ul>

<h2>Step 1: Remove and Label Everything</h2>
<p>Remove all cabinet doors, drawers, and hardware. Label each piece with painter's tape so you know where it goes back. This also makes painting much easier and ensures a professional finish.</p>

<h2>Step 2: Clean Thoroughly</h2>
<p>Kitchen cabinets accumulate grease and grime. Clean all surfaces with TSP or a strong degreaser. This is crucial for paint adhesion. Rinse well and allow to dry completely.</p>

<h2>Step 3: Sand and Prime</h2>
<p>Lightly sand all surfaces with 120-grit sandpaper to create tooth for the primer. Wipe clean with a tack cloth. Apply a quality primer – this step is non-negotiable for cabinets. Let dry completely.</p>

<h2>Step 4: Paint</h2>
<p>Apply thin, even coats of cabinet paint. Use a foam roller for flat surfaces and a high-quality brush for detailed areas. Allow proper drying time between coats (usually 12-24 hours). Apply 2-3 coats for best coverage.</p>

<h2>Step 5: Reassemble</h2>
<p>Once fully cured (wait at least 2-3 days), reattach hardware and hang doors. Consider upgrading to new hardware for an even more dramatic transformation.</p>

<h2>Pro Tips</h2>
<ul>
<li>Work in a well-ventilated area</li>
<li>Don't rush the drying process</li>
<li>Use high-quality paint designed for cabinets</li>
<li>Consider spraying for the smoothest finish</li>
</ul>
    `.trim(),
    author: 'Lisa Thompson',
    readTime: '10',
    coverImage: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    categories: ['DIY Projects', 'Interior Painting'],
    published: true,
    metaDescription: 'Step-by-step guide to painting kitchen cabinets like a professional. Transform your kitchen on a budget.',
    metaKeywords: 'paint kitchen cabinets, cabinet painting, kitchen renovation, diy cabinets',
  },
  {
    slug: 'paint-effects-that-add-texture-and-dimension',
    title: 'Paint Effects That Add Texture and Dimension',
    excerpt: 'Move beyond flat walls with these creative painting techniques. Learn how to add visual interest and texture to your spaces with special paint effects.',
    content: `
<h2>Beyond Basic Paint</h2>
<p>Flat, single-colour walls can feel boring. Special paint techniques and effects add depth, texture, and visual interest to any room. These professional techniques are easier than you think and can dramatically transform your space.</p>

<h2>1. Color Washing</h2>
<p>This technique creates a soft, translucent finish perfect for adding warmth and depth. Apply a glaze in a slightly different shade over your base coat using random, crisscross strokes. The result is subtle variation that adds character.</p>

<h2>2. Sponging</h2>
<p>Use a natural sea sponge to dab paint onto walls, creating an organic, textured look. You can use one or multiple colours. This technique is forgiving and great for hiding wall imperfections.</p>

<h2>3. Rag Rolling</h2>
<p>Roll a bunched-up rag through wet glaze to create soft, fabric-like texture. This sophisticated technique works beautifully in formal spaces like dining rooms.</p>

<h2>4. Stenciling</h2>
<p>Add patterns, borders, or accent designs using stencils. From simple geometric patterns to intricate designs, stenciling lets you customize your walls with precision.</p>

<h2>5. Ombre Effect</h2>
<p>Create a gradual color transition from dark to light. This trendy technique works especially well in modern spaces and can make ceilings appear higher.</p>

<h2>6. Stripes</h2>
<p>Horizontal stripes make rooms appear wider, while vertical stripes make ceilings seem taller. Use painter's tape for crisp, professional lines.</p>

<h2>Getting Started</h2>
<p>Practice your chosen technique on cardboard or poster board first. Start with a small accent wall before committing to an entire room. Remember, you can always paint over it if you don't like the result!</p>
    `.trim(),
    author: 'Robert Wilson',
    readTime: '6',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80',
    categories: ['Interior Painting', 'Colour Ideas'],
    published: true,
    metaDescription: 'Creative painting techniques to add texture and dimension to your walls. Learn sponging, rag rolling, stenciling and more.',
    metaKeywords: 'paint effects, textured walls, decorative painting, painting techniques',
  },
  {
    slug: 'best-paint-colors-for-small-spaces',
    title: 'Best Paint Colours for Small Spaces',
    excerpt: 'Make your compact rooms feel more spacious with strategic colour choices. Our guide helps you select paint colours that create an illusion of space and light.',
    content: `
<h2>The Power of Paint in Small Spaces</h2>
<p>The right paint colour can make a small room feel significantly larger and more open. Strategic use of colour, combined with proper lighting, can transform even the tiniest spaces into inviting, comfortable areas.</p>

<h2>Light and Bright Colours</h2>
<p>Whites, off-whites, and pale neutrals reflect light and make spaces feel more open. They're the go-to choice for small rooms. Consider warm whites for north-facing rooms and cool whites for south-facing spaces.</p>

<h2>Soft Pastels</h2>
<p>Pale blue, soft lavender, light pink, and mint green can make small spaces feel airy and fresh. These colours add personality while maintaining the spacious feel.</p>

<h2>The Monochromatic Approach</h2>
<p>Painting walls, trim, and even the ceiling the same colour eliminates visual breaks and makes the space feel larger. This technique is especially effective with light, neutral colours.</p>

<h2>Strategic Accent Walls</h2>
<p>Contrary to popular belief, darker accent walls can actually make small rooms feel larger by adding depth. Choose the wall furthest from the entrance and keep other walls light.</p>

<h2>Ceiling Colour Tricks</h2>
<p>Painting the ceiling a lighter shade than walls makes it appear higher. Alternatively, painting it the same colour as walls can make the space feel taller by eliminating the visual boundary.</p>

<h2>Colours to Avoid</h2>
<p>Very dark colours can make small spaces feel cramped. Avoid bold, busy patterns that overwhelm. Stay away from warm, dark reds and browns that can make rooms feel closed in.</p>

<h2>Additional Tips</h2>
<ul>
<li>Use glossy or semi-gloss finishes to reflect more light</li>
<li>Keep window treatments light and minimal</li>
<li>Use mirrors to amplify the effect</li>
<li>Maintain consistent flooring throughout to create flow</li>
</ul>
    `.trim(),
    author: 'Jennifer Adams',
    readTime: '5',
    coverImage: 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    categories: ['Interior Painting', 'Tips & Tricks'],
    published: true,
    metaDescription: 'Best paint colours to make small rooms feel larger. Expert tips on colour selection for compact spaces.',
    metaKeywords: 'small space painting, paint for small rooms, space-saving colours',
  },
  {
    slug: 'how-to-fix-common-paint-problems',
    title: 'How to Fix Common Paint Problems',
    excerpt: 'From peeling and cracking to bubbling and blistering, learn how to identify and resolve the most frequent painting issues that homeowners encounter.',
    content: `
<h2>Common Paint Problems and Solutions</h2>
<p>Even with careful application, paint problems can occur. The good news? Most are fixable. Here's how to identify and resolve the most common painting issues.</p>

<h2>1. Peeling and Flaking</h2>
<p><strong>Cause:</strong> Poor surface preparation, moisture, or painting over incompatible surfaces.</p>
<p><strong>Fix:</strong> Scrape off loose paint, sand smooth, prime the surface, and repaint. Address any moisture issues before repainting.</p>

<h2>2. Bubbling and Blistering</h2>
<p><strong>Cause:</strong> Painting in direct sunlight, moisture trapped under paint, or painting over dirty surfaces.</p>
<p><strong>Fix:</strong> Scrape blisters, sand smooth, prime if needed, and repaint. Ensure surface is clean and dry before painting.</p>

<h2>3. Cracking (Alligatoring)</h2>
<p><strong>Cause:</strong> Applying paint too thickly, incompatible paint layers, or natural aging.</p>
<p><strong>Fix:</strong> Remove cracked paint completely, sand surface, prime, and apply thin, even coats of new paint.</p>

<h2>4. Uneven Color or Patchy Finish</h2>
<p><strong>Cause:</strong> Poor surface preparation, low-quality paint, or inadequate number of coats.</p>
<p><strong>Fix:</strong> Apply additional coats until coverage is even. Use quality paint and proper primer next time.</p>

<h2>5. Visible Brush Marks</h2>
<p><strong>Cause:</strong> Low-quality brushes, paint too thick, or poor application technique.</p>
<p><strong>Fix:</strong> Sand lightly with 220-grit paper and apply another thin coat using a quality brush or foam roller.</p>

<h2>6. Mold and Mildew</h2>
<p><strong>Cause:</strong> Moisture and poor ventilation, especially in bathrooms and kitchens.</p>
<p><strong>Fix:</strong> Clean with bleach solution, fix moisture issues, apply mold-resistant primer and paint.</p>

<h2>Prevention Tips</h2>
<ul>
<li>Always prepare surfaces properly</li>
<li>Use quality paint and tools</li>
<li>Follow manufacturer's application instructions</li>
<li>Paint in appropriate weather conditions</li>
<li>Allow proper drying time between coats</li>
<li>Address moisture and ventilation issues</li>
</ul>
    `.trim(),
    author: 'Thomas Greene',
    readTime: '8',
    coverImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80',
    categories: ['DIY Projects', 'Tips & Tricks'],
    published: true,
    metaDescription: 'How to fix common paint problems like peeling, bubbling, cracking, and more. Expert solutions for painting issues.',
    metaKeywords: 'paint problems, peeling paint, paint repair, painting issues',
  },
  {
    slug: 'the-psychology-of-color-in-home-design',
    title: 'The Psychology of Colour in Home Design',
    excerpt: 'Colours affect our mood and behavior more than we realize. Explore how different paint colours can influence the atmosphere and emotional impact of each room.',
    content: `
<h2>How Colour Affects Us</h2>
<p>Colour psychology is the study of how colours influence human behavior and emotions. In home design, understanding these effects can help you create spaces that support your desired mood and activities.</p>

<h2>Warm Colours: Energy and Comfort</h2>
<p><strong>Red:</strong> Stimulating and energizing, increases appetite. Great for dining rooms but use sparingly in bedrooms.</p>
<p><strong>Orange:</strong> Friendly and cheerful, promotes creativity and conversation. Perfect for social spaces.</p>
<p><strong>Yellow:</strong> Uplifting and happy, stimulates mental activity. Ideal for kitchens and home offices.</p>

<h2>Cool Colours: Calm and Focus</h2>
<p><strong>Blue:</strong> Calming and serene, lowers blood pressure and heart rate. Excellent for bedrooms and bathrooms.</p>
<p><strong>Green:</strong> Balanced and refreshing, reduces stress and promotes concentration. Works well in any room.</p>
<p><strong>Purple:</strong> Luxurious and creative, can be calming (light shades) or dramatic (deep shades). Great for bedrooms or creative spaces.</p>

<h2>Neutral Colours: Versatility and Sophistication</h2>
<p><strong>White:</strong> Clean and spacious, promotes clarity and simplicity. Perfect for small spaces and modern designs.</p>
<p><strong>Gray:</strong> Sophisticated and neutral, provides a modern backdrop. Can feel cold if not balanced with warm elements.</p>
<p><strong>Beige/Taupe:</strong> Warm and welcoming, classic and versatile. Works in almost any space.</p>

<h2>Applying Colour Psychology</h2>
<p>Consider the room's purpose and desired mood. Bedrooms should promote rest (blues, soft greens). Home offices need focus (soft yellows, greens). Living rooms should be inviting (warm neutrals, soft warm colours).</p>

<h2>Cultural Considerations</h2>
<p>Remember that colour meanings can vary across cultures. What's calming in one culture might have different associations in another. Consider your personal and cultural background when choosing colours.</p>
    `.trim(),
    author: 'Olivia Peterson',
    readTime: '7',
    coverImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    categories: ['Colour Ideas', 'Interior Painting'],
    published: true,
    metaDescription: 'Understand colour psychology in home design. Learn how paint colours affect mood, behavior, and room atmosphere.',
    metaKeywords: 'colour psychology, paint colours mood, interior design psychology',
  },
];

async function migrateBlogsToDB() {
  try {
    console.log('🚀 Starting blog migration to database...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const blogData of blogPostsData) {
      try {
        // Check if blog with slug already exists
        const existing = await prisma.blogPost.findUnique({
          where: { slug: blogData.slug },
        });

        if (existing) {
          console.log(`⏭️  Skipped (already exists): ${blogData.title}`);
          continue;
        }

        // Create blog post
        const blog = await prisma.blogPost.create({
          data: {
            ...blogData,
            publishedAt: blogData.published ? new Date() : null,
          },
        });

        console.log(`✅ Migrated: ${blog.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate "${blogData.title}":`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Successfully migrated: ${successCount} blogs`);
    console.log(`   ❌ Failed: ${errorCount} blogs`);
    console.log('\n✨ Migration complete!');

  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateBlogsToDB();

