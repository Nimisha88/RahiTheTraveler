import * as apiRequest from '../js/components/apis.js'

test('Test Post Request', async () => {
  const response = await apiRequest.postAsync("/api/testPost", {});
  expect(response.msg).toBe('Post Test Successful');
  expect(response.msg).not.toBe('POST request received.');
});

test('Test Get Request', async () => {
  const response = await apiRequest.getAsync("/api/testGet");
  expect(response.msg).toBe('Get Test Successful');
  expect(response.msg).not.toBe('GET request received.');
});
