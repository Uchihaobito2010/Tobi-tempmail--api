const axios = require('axios');

module.exports = async (req, res) => {
  // 🔥 यहाँ अपना नाम लिखें
  const YOUR_NAME = "Paras Chourasiya / tg - @Aotpy"; // अपना नाम डालें
  
  // CORS enable
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Ashlynn API से डेटा fetch
    const response = await axios.get(
      'https://socialdown.itz-ashlynn.workers.dev/tempmail?action=list',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Vercel-TempMail-Proxy/1.0)'
        }
      }
    );
    
    const originalData = response.data;
    
    // आपका कस्टम रिस्पॉन्स
    const yourResult = {
      status: "SUCCESS",
      message: `🚀 TempMail API Hosted by ${YOUR_NAME}`,
      developer: YOUR_NAME,
      timestamp: new Date().toISOString(),
      server: "Vercel",
      
      // मुख्य डेटा
      available_domains: originalData.domains,
      total_domains: originalData.domains.length,
      api_provider: originalData.creator,
      last_updated: originalData.timestamp,
      
      // एक्स्ट्रा फीचर्स
      generate_random_email: `${generateRandomString()}@${originalData.domains[0]}`,
      generate_username_email: `user${Math.floor(Math.random() * 1000)}@${originalData.domains[0]}`,
      source_api: "https://socialdown.itz-ashlynn.workers.dev",
      
      // उपयोग के निर्देश
      usage: {
        method: "GET",
        endpoint: "/",
        example: "https://your-project.vercel.app/"
      }
    };
    
    res.status(200).json(yourResult);
    
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      developer: YOUR_NAME,
      error: error.message,
      note: "Source API might be down",
      timestamp: new Date().toISOString()
    });
  }
};

// Helper functions
function generateRandomString() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
      }
