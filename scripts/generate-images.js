const fs = require('fs');
const path = require('path');
const https = require('https');
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const products = [
  { name: 'mango', prompt: 'Professional product photography of a fresh ripe mango on white background, high resolution, photorealistic, commercial quality' },
  { name: 'apple', prompt: 'Professional product photography of a fresh red apple on white background, high resolution, photorealistic, commercial quality' },
  { name: 'banana', prompt: 'Professional product photography of fresh yellow bananas on white background, high resolution, photorealistic, commercial quality' },
  { name: 'green-grapes', prompt: 'Professional product photography of fresh green grapes bunch on white background, high resolution, photorealistic' },
  { name: 'black-grapes', prompt: 'Professional product photography of fresh black grapes bunch on white background, high resolution, photorealistic' },
  { name: 'guava', prompt: 'Professional product photography of a fresh whole guava fruit on white background, high resolution, photorealistic' },
  { name: 'lychee', prompt: 'Professional product photography of fresh lychee fruits on white background, high resolution, photorealistic' },
  { name: 'orange', prompt: 'Professional product photography of a fresh orange fruit on white background, high resolution, photorealistic' },
  { name: 'papaya', prompt: 'Professional product photography of a fresh papaya cut in half on white background, high resolution, photorealistic' },
  { name: 'pears', prompt: 'Professional product photography of fresh green pears on white background, high resolution, photorealistic' },
  { name: 'pineapple', prompt: 'Professional product photography of a fresh whole pineapple on white background, high resolution, photorealistic' },
  { name: 'pomegranate', prompt: 'Professional product photography of a fresh pomegranate on white background, high resolution, photorealistic' },
  { name: 'watermelon', prompt: 'Professional product photography of a fresh watermelon cut in half on white background, high resolution, photorealistic' },
  { name: 'cherry', prompt: 'Professional product photography of fresh red cherries with stem on white background, high resolution, photorealistic' },
  { name: 'mosambi', prompt: 'Professional product photography of fresh sweet lime (mosambi) on white background, high resolution, photorealistic' },
  { name: 'tomato', prompt: 'Professional product photography of fresh red tomatoes on white background, high resolution, photorealistic' },
  { name: 'onion', prompt: 'Professional product photography of fresh red onions on white background, high resolution, photorealistic' },
  { name: 'potato', prompt: 'Professional product photography of fresh clean potatoes on white background, high resolution, photorealistic' },
  { name: 'green-chilli', prompt: 'Professional product photography of fresh green chillies on white background, high resolution, photorealistic' },
  { name: 'lemon', prompt: 'Professional product photography of fresh yellow lemons on white background, high resolution, photorealistic' },
  { name: 'green-capsicum', prompt: 'Professional product photography of fresh green bell peppers on white background, high resolution, photorealistic' },
  { name: 'amla', prompt: 'Professional product photography of fresh Indian gooseberries (amla) on white background, high resolution, photorealistic' },
  { name: 'beetroot', prompt: 'Professional product photography of fresh whole beetroots on white background, high resolution, photorealistic' },
  { name: 'bitter-gourd', prompt: 'Professional product photography of fresh bitter gourds on white background, high resolution, photorealistic' },
  { name: 'bottle-gourd', prompt: 'Professional product photography of fresh bottle gourd on white background, high resolution, photorealistic' },
  { name: 'cabbage', prompt: 'Professional product photography of fresh green cabbage on white background, high resolution, photorealistic' },
  { name: 'carrot', prompt: 'Professional product photography of fresh orange carrots on white background, high resolution, photorealistic' },
  { name: 'cauliflower', prompt: 'Professional product photography of fresh cauliflower on white background, high resolution, photorealistic' },
  { name: 'coconut', prompt: 'Professional product photography of fresh whole coconut on white background, high resolution, photorealistic' },
  { name: 'coriander', prompt: 'Professional product photography of fresh green coriander leaves bunch on white background, high resolution, photorealistic' },
  { name: 'cucumber', prompt: 'Professional product photography of fresh green cucumbers on white background, high resolution, photorealistic' },
  { name: 'brinjal', prompt: 'Professional product photography of fresh purple brinjals (eggplants) on white background, high resolution, photorealistic' },
  { name: 'garlic', prompt: 'Professional product photography of fresh garlic bulbs on white background, high resolution, photorealistic' },
  { name: 'ginger', prompt: 'Professional product photography of fresh ginger root on white background, high resolution, photorealistic' },
  { name: 'pumpkin', prompt: 'Professional product photography of fresh whole pumpkin on white background, high resolution, photorealistic' },
  { name: 'spinach', prompt: 'Professional product photography of fresh spinach leaves bunch on white background, high resolution, photorealistic' },
  { name: 'green-peas', prompt: 'Professional product photography of fresh green peas on white background, high resolution, photorealistic' }
];

const outputDir = path.join(__dirname, '../public/resources/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

async function generateAllImages() {
  for (const product of products) {
    try {
      console.log(`Generating image for ${product.name}...`);
      const imageUrl = await generateImage(product.prompt);
      await downloadImage(imageUrl, path.join(outputDir, `${product.name}.jpg`));
      console.log(`Successfully generated and saved ${product.name}.jpg`);
      // Wait between generations to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to generate ${product.name}: ${error.message}`);
    }
  }
}

generateAllImages().then(() => {
  console.log('All images generated!');
}).catch((error) => {
  console.error('Script failed:', error);
}); 