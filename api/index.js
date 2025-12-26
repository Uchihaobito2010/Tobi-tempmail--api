const axios = require('axios');

module.exports = async (req, res) => {
  // 🔥 यहाँ अपना नाम लिखें
  const YOUR_NAME = "Paras Chourasiya / @Aotpy"; // अपना नाम यहाँ डालें
  
  // CORS enable
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Ashlynn API से डेटा fetch
    const response = await axios.get(
      'https://socialdown.itz-ashlynn.workers.dev/tempmail?action=list',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    const originalData = response.data;
    
    // पूरा नया रिस्पॉन्स - सोर्स API की कोई जानकारी नहीं
    const yourResult = {
      status: "ACTIVE",
      message: `✅ TempMail API Successfully Running`,
      hosted_by: YOUR_NAME,
      hosted_on: "Vercel",
      timestamp: new Date().toISOString(),
      
      // केवल जरूरी डेटा
      domains: originalData.domains,
      total_domains: originalData.domains.length,
      
      // एक्स्ट्रा फीचर्स
      generated_email: `${generateRandomString()}@${originalData.domains[0]}`,
      quick_email: `user${Math.floor(Math.random() * 9999)}@${originalData.domains[0]}`,
      
      // मार्गदर्शन
      instructions: {
        method: "GET /",
        use_email: "Use above email for temporary signups",
        note: "Email expires after some time"
      }
    };
    
    res.status(200).json(yourResult);
    
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      hosted_by: YOUR_NAME,
      error: "Service temporarily unavailable",
      timestamp: new Date().toISOString(),
      support: "Check back in few minutes"
    });
  }
};

// Helper function for random string
function generateRandomString() {
  const chars = 'abcdefghijklmnopqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
