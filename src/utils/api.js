const domain = "https://dog.ceo/api";

const callApi = async (url) => {
  try {
    const response = await fetch(`${domain}/${url}`);
    const { message } = await response.json();
    return message;
  } catch {
    return null;
  }
};

const apis = {
  breeds: async () => {
    const result = (await callApi("breeds/list/all")) || [];
    return Object.keys(result);
  },
  breedImages: async (breed) =>
    (await callApi(`breed/${breed}/images/random/4`)) || [],
};

export default apis;
