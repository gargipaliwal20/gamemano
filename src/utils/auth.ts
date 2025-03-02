export const login = (username: string, password: string) => {
    localStorage.setItem("user", JSON.stringify({ username, password }));
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
  };
  
  export const isAuthenticated = (): boolean => {
    return localStorage.getItem("user") !== null;
  };
  