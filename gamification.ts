import { UserData, Badge, FootprintEntry } from '../types';
import { availableBadges } from '../data/badges';

export const calculatePoints = (score: number): number => {
  // Lower scores get more points (better eco performance = more points)
  const basePoints = Math.max(0, 40 - score);
  return basePoints * 10;
};

export const checkAndAwardBadges = (userData: UserData, entry: FootprintEntry): Badge[] => {
  const newBadges: Badge[] = [];
  
  availableBadges.forEach(badge => {
    const userBadge = userData.badges.find(b => b.id === badge.id);
    if (userBadge && userBadge.earned) return;

    let shouldAward = false;

    switch (badge.id) {
      case 'eco-warrior':
        shouldAward = entry.score <= 15;
        break;
      case 'streak-master':
        shouldAward = userData.currentStreak >= 7;
        break;
      case 'green-commuter':
        shouldAward = entry.breakdown.transport <= 4;
        break;
      case 'plant-powered':
        shouldAward = entry.breakdown.diet <= 4;
        break;
      case 'energy-saver':
        shouldAward = entry.breakdown.energy <= 4;
        break;
      case 'mindful-consumer':
        shouldAward = entry.breakdown.habits <= 4;
        break;
    }

    if (shouldAward) {
      const awardedBadge: Badge = {
        ...badge,
        earned: true,
        earnedAt: new Date()
      };
      newBadges.push(awardedBadge);
      
      // Update user badge
      const badgeIndex = userData.badges.findIndex(b => b.id === badge.id);
      if (badgeIndex >= 0) {
        userData.badges[badgeIndex] = awardedBadge;
      } else {
        userData.badges.push(awardedBadge);
      }
    }
  });

  return newBadges;
};

export const updateStreak = (userData: UserData): void => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  const todayEntry = userData.history.find(entry => 
    new Date(entry.date).toDateString() === today
  );
  
  const yesterdayEntry = userData.history.find(entry => 
    new Date(entry.date).toDateString() === yesterday
  );

  if (todayEntry) {
    if (yesterdayEntry || userData.currentStreak === 0) {
      userData.currentStreak += 1;
    }
  } else {
    // Reset streak if no entry today and it's past midnight
    userData.currentStreak = 0;
  }

  if (userData.currentStreak > userData.longestStreak) {
    userData.longestStreak = userData.currentStreak;
  }
};