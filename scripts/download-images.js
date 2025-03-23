const https = require('https');
const fs = require('fs');
const path = require('path');

const products = [
  { name: 'mango', query: 'fresh mango fruit isolated' },
  { name: 'apple', query: 'fresh red apple fruit isolated' },
  { name: 'banana', query: 'fresh banana fruit isolated' },
  { name: 'green-grapes', query: 'fresh green grapes isolated' },
  { name: 'black-grapes', query: 'fresh black grapes isolated' },
  { name: 'guava', query: 'fresh guava fruit isolated' },
  { name: 'lychee', query: 'fresh lychee fruit isolated' },
  { name: 'orange', query: 'fresh orange fruit isolated' },
  { name: 'papaya', query: 'fresh papaya fruit isolated' },
  { name: 'pears', query: 'fresh pear fruit isolated' },
  { name: 'pineapple', query: 'fresh pineapple fruit isolated' },
  { name: 'pomegranate', query: 'fresh pomegranate fruit isolated' },
  { name: 'watermelon', query: 'fresh watermelon fruit isolated' },
  { name: 'cherry', query: 'fresh cherry fruit isolated' },
  { name: 'mosambi', query: 'fresh sweet lime mosambi isolated' },
  { name: 'tomato', query: 'fresh tomato vegetable isolated' },
  { name: 'onion', query: 'fresh onion vegetable isolated' },
  { name: 'potato', query: 'fresh potato vegetable isolated' },
  { name: 'green-chilli', query: 'fresh green chilli isolated' },
  { name: 'lemon', query: 'fresh lemon fruit isolated' },
  { name: 'green-capsicum', query: 'fresh green bell pepper capsicum isolated' },
  { name: 'amla', query: 'fresh indian gooseberry amla isolated' },
  { name: 'beetroot', query: 'fresh beetroot vegetable isolated' },
  { name: 'bitter-gourd', query: 'fresh bitter gourd karela isolated' },
  { name: 'bottle-gourd', query: 'fresh bottle gourd lauki isolated' },
  { name: 'cabbage', query: 'fresh cabbage vegetable isolated' },
  { name: 'carrot', query: 'fresh carrot vegetable isolated' },
  { name: 'cauliflower', query: 'fresh cauliflower vegetable isolated' },
  { name: 'coconut', query: 'fresh coconut isolated' },
  { name: 'coriander', query: 'fresh coriander leaves isolated' },
  { name: 'cucumber', query: 'fresh cucumber vegetable isolated' },
  { name: 'brinjal', query: 'fresh purple brinjal eggplant isolated' },
  { name: 'garlic', query: 'fresh garlic bulb isolated' },
  { name: 'ginger', query: 'fresh ginger root isolated' },
  { name: 'pumpkin', query: 'fresh pumpkin vegetable isolated' },
  { name: 'spinach', query: 'fresh spinach leaves isolated' },
  { name: 'green-peas', query: 'fresh green peas isolated' }
];

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // You'll need to provide this
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

async function getUnsplashImage(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape`;
    
    https.get(url, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    }, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            resolve(result.results[0].urls.regular);
          } else {
            reject(new Error('No images found'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  for (const product of products) {
    try {
      console.log(`Downloading image for ${product.name}...`);
      const imageUrl = await getUnsplashImage(product.query);
      await downloadImage(imageUrl, path.join(outputDir, `${product.name}.jpg`));
      console.log(`Successfully downloaded ${product.name}.jpg`);
      // Wait a bit to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to download ${product.name}: ${error.message}`);
    }
  }
}

downloadAllImages().then(() => {
  console.log('All downloads completed!');
}).catch((error) => {
  console.error('Script failed:', error);
}); 