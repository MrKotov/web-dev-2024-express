const axios = require('axios');

const BASE_URL = 'http://localhost:3000/heroes';

async function testAddHero() {
  try {
    const response = await axios.post(BASE_URL, {
      name: 'Mage',
      magicPoints: 50,
      killedMonsters: 20,
    });
    console.log('Add Hero Response:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Add Hero Error:', error.response ? error.response.data : error.message);
  }
}

async function testGetHeroesByMagicPoints(magicPoints) {
  try {
    const response = await axios.get(`${BASE_URL}/magic-points/${magicPoints}`);
    console.log(`Get Heroes by Magic Points (${magicPoints}) Response:`, response.data);
  } catch (error) {
    console.error('Get Heroes by Magic Points Error:', error.response ? error.response.data : error.message);
  }
}

async function testEditHero(heroId) {
  try {
    const response = await axios.put(`${BASE_URL}/${heroId}`, {
      name: 'Wizard',
      magicPoints: 60,
      killedMonsters: 25,
    });
    console.log('Edit Hero Response:', response.data);
  } catch (error) {
    console.error('Edit Hero Error:', error.response ? error.response.data : error.message);
  }
}

async function testDeleteHero(heroId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${heroId}`);
    console.log(`Delete Hero (${heroId}) Response:`, response.status);
  } catch (error) {
    console.error('Delete Hero Error:', error.response ? error.response.data : error.message);
  }
}

(async () => {
  const newHero = await testAddHero();
  if (!newHero) return; 

  await testGetHeroesByMagicPoints(50);

  await testEditHero(newHero.id);

  await testGetHeroesByMagicPoints(60);

  await testDeleteHero(newHero.id);

  await testGetHeroesByMagicPoints(60);
})();
