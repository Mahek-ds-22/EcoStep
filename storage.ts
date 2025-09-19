import { UserData, FootprintEntry } from '../types';

const STORAGE_KEYS = {
  USER_DATA: 'eco-footprint-user',
  CURRENT_ENTRY: 'eco-footprint-current'
};

export const loadUserData = (): UserData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const saveUserData = (userData: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const loadCurrentEntry = (): FootprintEntry | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_ENTRY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading current entry:', error);
    return null;
  }
};

export const saveCurrentEntry = (entry: FootprintEntry): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ENTRY, JSON.stringify(entry));
  } catch (error) {
    console.error('Error saving current entry:', error);
  }
};

export const clearCurrentEntry = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ENTRY);
  } catch (error) {
    console.error('Error clearing current entry:', error);
  }
};