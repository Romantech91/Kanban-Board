import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    const data: LoginResponse = await response.json();
    return data;

  } catch (error) {
    console.error('Error in login:', error);
    throw new Error('Unable to login. Please try again later.');
  }
};

export { login };
