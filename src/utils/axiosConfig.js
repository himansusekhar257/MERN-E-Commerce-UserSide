// export const base_url = 'http://localhost:5000/api/'
// export const base_url = 'http://44.202.140.63:5000/api/'
export const base_url = process.env.BASE_URL
console.log("baseUrl",base_url);
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
