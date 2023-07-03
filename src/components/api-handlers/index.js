const BASE_URL = "http://localhost:3000/api";

// Fetch All Books
export const fetchAllBooks = async () => {
  try {
    const nfResponse = await fetch(`${BASE_URL}/nonfiction-books`);
    const nfData = await nfResponse.json();

    const ficResponse = await fetch(`${BASE_URL}/fiction-books`);
    const ficData = await ficResponse.json();

    const gnResponse = await fetch(`${BASE_URL}/graphic-books`);
    const gnData = await gnResponse.json();

    const clubResponse = await fetch(`${BASE_URL}/book-club-picks`);
    const clubData = await clubResponse.json();

    const childResponse = await fetch(`${BASE_URL}/childrens-books`);
    const childData = await childResponse.json();

    const allBooks = [].concat(
      ...nfData,
      ...ficData,
      ...gnData,
      ...clubData,
      ...childData
    );

    return allBooks;
  } catch (error) {
    console.log(error);
  }
};

fetchAllBooks();

// Fetch Reviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// User login
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

// User Registration
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
