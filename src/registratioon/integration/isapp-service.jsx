import { CREATE_POST_ENDPOINT_URL, CREATE_USER_ENDPOINT_URL, GET_FACULTIES_ENDPOINT_URL, GET_FAVOURITES_POST_ENDPOINT_URL, GET_POSTS_BY_FACULTY_ENDPOINT_URL, GET_POSTS_BY_NO_ROOMS_ENDPOINT_URL, GET_POSTS_BY_PRICE_ENDPOINT_URL, GET_POSTS_ENDPOINT_URL, GET_POST_ENDPOINT_URL, GET_PROFILE_ENDPOINT_URL, GET_UNIVERSITIES_ENDPOINT_URL, GET_USERS_ENDPOINT_URL, GET_USER_ENDPOINT_URL, UPDATE_FAVOURITES_USER_ENDPOINT_URL, UPDATE_USER_ENDPOINT_URL } from "../config";
import { getReasonPhrase } from "http-status-codes";

/**
 * Makes a POST request to the application service create a user.
 * @param {string} email email.
 * @param {string} password password.
 * @returns the response.
 */
export async function createUser(name, password, email, phone) {
  let response = null;
  try {
    let resp = await fetch(CREATE_USER_ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,

      }),
    });
    if (resp.status !== 201) {
      response = {
        status: resp.status
      };
    } else {
      response = {
        status: resp.status
      };
    }

  } catch (err) {
    response = {
      status: 500
    };
  }


  return response;
}

export async function getUserByEmail(
  accessToken,
  userReference
) {
  let getUserUrl = GET_USER_ENDPOINT_URL(userReference);
  let response;

  await fetch(getUserUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}


export async function getUniversities() {
  let response;

  await fetch(GET_UNIVERSITIES_ENDPOINT_URL, {
    method: "GET"
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}

export async function getFaculties() {
  let response;

  await fetch(GET_FACULTIES_ENDPOINT_URL, {
    method: "GET"
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}

export async function updateUser(accessToken, email, name, phone, description, file, facultyId) {
  let data = new FormData();
  let user = '{name: "' + name + '", phone: "' + phone + '", description: "' + description + '", facultyId: "' + facultyId + '" }';
  console.log("useeeer", user)
  data.append("file", file)
  data.append("user", user);

  let updateUserUrl = UPDATE_USER_ENDPOINT_URL(email);
  let response;
  let resp = await fetch(updateUserUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken
    },
    body: data
  });


  if (resp.status !== 200) {
    response = {
      status: resp.status,
      statusText: getReasonPhrase(resp.status),
    };
  } else {
    let respData = await resp.json();

    response = {
      status: resp.status,
      data: respData,
    };
  }

  return response;
  //   if (resp.status !== 200) {
  //     response = {
  //       status: resp.status
  //     };
  //   } else {
  //     response = {
  //       status: resp.status
  //     };
  //   }

  // } catch (err) {
  //   response = {
  //     status: 500
  //   };
  // }

  // return response;
}

export async function getUsers() {
  let response;

  await fetch(GET_USERS_ENDPOINT_URL, {
    method: "GET"
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}


export async function createPost(accessToken, files, title, description, selectedUsers, owner, facultySet, lat, lng, price, noRooms) {
  let data = new FormData();

  for (const file of files) {
    data.append('files', file)
  }
  let post = '{"userSet": ' + selectedUsers + ', "description":"' + description + '", "title":"' + title + '", "price":' + price + ', "lat":' + lat + ',"lng":' + lng + ', "facultySet":' + facultySet +  ',"noRooms":' + noRooms+'}'
  data.append("post", post);


  let createdPost = CREATE_POST_ENDPOINT_URL(owner);
  let response;
  let resp = await fetch(createdPost, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken
    },
    body: data
  });

  if (resp.status !== 201) {
    response = {
      status: resp.status,
      statusText: getReasonPhrase(resp.status),
    };
  } else {
    let respData = await resp.json();

    response = {
      status: resp.status,
      data: respData,
    };
  }
  return response;
}


export async function getPostById(
  postId
) {
  let getPostUrl = GET_POST_ENDPOINT_URL(postId);
  let response;

  await fetch(getPostUrl, {
    method: "GET"
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}



export async function getAllPosts() {
  let response;

  await fetch(GET_POSTS_ENDPOINT_URL, {
    method: "GET",
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}

export async function markPostAsFavourite(accessToken, postId, userId) {
  let response = null;
  let getPostUrl = UPDATE_FAVOURITES_USER_ENDPOINT_URL(postId, userId);

  await fetch(getPostUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }).then(async (resp) => {
    response = {
      status: resp.status,
      statusText: resp.statusText || getReasonPhrase(resp.status),
    };

    return resp.json();
  })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });

  return response;
}
export async function getFavouritePosts(accessToken,userEmail) {
  let response = null;
  let getPostUrl = GET_FAVOURITES_POST_ENDPOINT_URL(userEmail);

  await fetch(getPostUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }).then(async (resp) => {
    response = {
      status: resp.status,
      statusText: resp.statusText || getReasonPhrase(resp.status),
    };

    return resp.json();
  })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });

  return response;
}

export async function getPostsByPrice(price) {
  let response;

  await fetch(GET_POSTS_BY_PRICE_ENDPOINT_URL(price), {
    method: "GET",
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}

export async function getPostsByRooms(noRoooms) {
  let response;

  await fetch(GET_POSTS_BY_NO_ROOMS_ENDPOINT_URL(noRoooms), {
    method: "GET",
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}


export async function getPostsByFaculty(faculty) {
  let response;

  await fetch(GET_POSTS_BY_FACULTY_ENDPOINT_URL(faculty), {
    method: "GET",
  })
    .then(async (resp) => {
      response = {
        status: resp.status,
        statusText: resp.statusText || getReasonPhrase(resp.status),
      };

      return resp.json();
    })
    .then((data) => {
      response = { ...response, data: data };
    })
    .catch((err) => {
      response = {
        status: 500,
        statusText: getReasonPhrase(500),
      };
    });


  return response;
}