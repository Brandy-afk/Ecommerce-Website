const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// const addAuthHeader = (headers: Headers) => {
//   const token = store.getState().token.token ?? "";
//   console.log(token);
//   if (token) {
//     headers.set("authorization", `Bearer ${token}`);
//   }
//   return headers;
// };

export { pause };
