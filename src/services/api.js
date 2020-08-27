
const url = 'https://api.github.com/search/users?q=';

async function api(name) {
  let response = await fetch(url + nome);
  let data = await response.json();
  console.log(data);
  return data;
}
export default api;
