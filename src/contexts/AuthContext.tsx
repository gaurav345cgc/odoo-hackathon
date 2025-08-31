import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config } from '../config/environment';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  cgpa: number;
  current_semester: number;
  graduation_year: number;
  backlogs: number;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

interface RegisterData {
  email: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  department: string;
  cgpa: number;
  current_semester: number;
  graduation_year: number;
  backlogs: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [justRegistered, setJustRegistered] = useState(false);

  const API_BASE_URL = config.API_BASE_URL;

  // Network status check helper
  const checkNetworkStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return response.ok;
    } catch (error) {
      console.error('Network check failed:', error);
      return false;
    }
  };

  // Helper function to extract auth data from response
  const extractAuthData = (data: any) => {
    // Try different possible response structures
    if (data.data?.session?.access_token) {
      return {
        accessToken: data.data.session.access_token,
        refreshToken: data.data.session.refresh_token,
        user: data.data.user,
        profile: data.data.profile
      };
    } else if (data.data?.access_token) {
      return {
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
        user: data.data.user,
        profile: data.data.profile
      };
    } else if (data.access_token) {
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
        profile: data.profile
      };
    }
    return null;
  };

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      getCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Reset justRegistered flag after a delay
  useEffect(() => {
    if (justRegistered) {
      const timer = setTimeout(() => {
        setJustRegistered(false);
      }, 5000); // Reset after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [justRegistered]);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Skip if we just registered and already have user data
      if (justRegistered && user) {
        console.log('Skipping getCurrentUser - user data already available from registration');
        setIsLoading(false);
        return;
      }

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Fetching current user with token:', token.substring(0, 20) + '...');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('getCurrentUser response status:', response.status);
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data.user);
          setProfile(data.data.profile);
        } else {
          console.log('getCurrentUser failed:', data.message);
          // Only clear tokens and set error if we didn't just register
          if (!justRegistered) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setError(data.message || 'Failed to get user data');
          }
        }
      } else {
        console.log('getCurrentUser HTTP error:', response.status);
        // Only clear tokens and set error if we didn't just register
        if (!justRegistered) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setError('Failed to get user data');
        }
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Only clear tokens and set error if we didn't just register
      if (!justRegistered) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setError('Network error while fetching user data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      setIsLoading(true);

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Attempting login to:', `${API_BASE_URL}/auth/login`);
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Login response status:', response.status);
        console.log('Login response headers:', Object.fromEntries(response.headers.entries()));
      }

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        setError('Invalid response format from server');
        return false;
      }

      // Validate response structure
      if (!data || typeof data !== 'object') {
        console.error('Invalid response format:', data);
        setError('Invalid response from server');
        return false;
      }

      if (data.success) {
        // Extract authentication data using helper function
        const authData = extractAuthData(data);
        
        if (!authData || !authData.accessToken) {
          console.error('No access token in response:', data);
          setError('No access token received from server');
          return false;
        }

        localStorage.setItem('access_token', authData.accessToken);
        if (authData.refreshToken) {
          localStorage.setItem('refresh_token', authData.refreshToken);
        }
        
        if (authData.user) {
          setUser(authData.user);
        }
        if (authData.profile) {
          setProfile(authData.profile);
        }
        
        return true;
      } else {
        setError(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide specific error messages for common issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error instanceof Error) {
        setError(`Login error: ${error.message}`);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setError(null);
      setIsLoading(true);

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Attempting registration to:', `${API_BASE_URL}/auth/signup`);
        console.log('Registration data:', userData);
      }

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Registration response status:', response.status);
        console.log('Registration response headers:', Object.fromEntries(response.headers.entries()));
      }

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        setError('Invalid response format from server');
        return false;
      }

      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Registration response data:', data);
      }

      // Validate response structure
      if (!data || typeof data !== 'object') {
        console.error('Invalid response format:', data);
        setError('Invalid response from server');
        return false;
      }

      if (data.success) {
        // Extract authentication data using helper function
        const authData = extractAuthData(data);
        
        if (!authData || !authData.accessToken) {
          console.error('No access token in response:', data);
          setError('No access token received from server');
          return false;
        }

        localStorage.setItem('access_token', authData.accessToken);
        if (authData.refreshToken) {
          localStorage.setItem('refresh_token', authData.refreshToken);
        }
        
        if (authData.user) {
          setUser(authData.user);
        }
        if (authData.profile) {
          setProfile(authData.profile);
        }
        
        setJustRegistered(true); // Mark that we just registered
        setError(null); // Clear any previous errors
        return true;
      } else {
        if (data.errors) {
          const errorMessages = data.errors.map((err: any) => err.message).join(', ');
          setError(errorMessages);
        } else {
          setError(data.message || 'Registration failed');
        }
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Provide specific error messages for common issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error instanceof Error) {
        setError(`Registration error: ${error.message}`);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setProfile(null);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};