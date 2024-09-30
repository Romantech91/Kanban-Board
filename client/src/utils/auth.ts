 import { JwtPayload, jwtDecode } from 'jwt-decode';

 class AuthService {
  // Gets the decoded token
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Check if the user is logged in by verifying the token's existence and validity
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        return true; // Token has expired
      }
      return false; // Token is still valid
    } catch (err) {
      return true; // If token decoding fails, consider it as expired
    }
  }

  // Retrieve the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string): void {
    localStorage.setItem('jwtToken', idToken);
    window.location.assign('/'); // Redirect to the home page
  }

  // Remove the JWT token from localStorage and redirect to the login page
  logout(): void {
    localStorage.removeItem('jwtToken');
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();