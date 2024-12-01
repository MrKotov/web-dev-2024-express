const axios = require('axios');

async function testPatchRequest() {
  try {
    const response = await axios.patch('http://localhost:3000/user/1/university/2', {
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testPatchRequest();
