// Updated auth.ts for Apollo
export const getToken = () => localStorage.getItem('id_token');

export const setToken = (token: string) => {
  localStorage.setItem('id_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('id_token');
};
