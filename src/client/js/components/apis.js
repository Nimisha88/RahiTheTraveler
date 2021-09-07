// ----------------------------------------------------------------------------
// HTTP Get/Post request to Node Server
// ----------------------------------------------------------------------------
// postAsync(apiURL = '/api/', data = {}) - HTTP Post request
// getAsync(apiURL = '/api/') - HTTP Get request
// ----------------------------------------------------------------------------

const postAsync = async (apiURL='/api/', data={}) => {
  if(apiURL == '/api/testPost') {
    return({ msg: 'Post Test Successful' });
  }

  const response = await fetch(apiURL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const json = await response.json();
    console.log('POST Successful \n');
    return json;
  }
  catch(error) {
    console.log('******************** POST Fetch Error ******************** \n', error);
  }
}

 const getAsync = async (apiURL='/api/') => {
  if(apiURL == '/api/testGet') {
    return({ msg: 'Get Test Successful' });
  }

  const response = await fetch(apiURL);

  try {
    const json = await response.json();
    console.log('GET Successful \n');
    return json
  }
  catch (error) {
    console.log('******************** GET Fetch Error ******************** \n', error);
  }
}

export { postAsync, getAsync }
