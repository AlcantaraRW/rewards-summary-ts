export type UserLevel = 'Level1' | 'Level2';

export interface PointsSummary {
  pointsEarned: number;
}

export interface UserInfo {
  status: {
    userStatus: {
      availablePoints: number;
      levelInfo: {
        activeLevel: UserLevel;
        progress: number;
      };
    };
    pointsSummary: PointsSummary[];
  };
}
