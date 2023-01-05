import { Balance, ItemToRedeem, WeekPoints } from '../models/Balance';
import { RedeemableOption, Reward } from '../models/Reward';
import { PointsSummary, UserLevel } from '../models/UserInfo';
import { currencyFormatter, dayFormatter, weekDayFormatter, numberFormatter } from './formatters';

export function getCardCost(card: RedeemableOption, userLevel: UserLevel) {
  if (userLevel === 'Level2') {
    return card.discountedPrice ?? card.fullPrice;
  }

  return card.fullPrice;
}

export function calculateBalance(
  availableCards: RedeemableOption[],
  availablePoints: number,
  userLevel: UserLevel
): Balance {
  let points = availablePoints;
  const itemsToRedeem: ItemToRedeem[] = [];

  for (let i = 0; i < availableCards.length; i++) {
    const card = availableCards[i];
    const lowerCard = availableCards[i + 1];

    const cost = getCardCost(card, userLevel);

    while (points > cost) {
      if (!!lowerCard) {
        const lowerCardDoublePrice = getCardCost(lowerCard, userLevel) * 2;

        if (lowerCardDoublePrice <= points && lowerCardDoublePrice > cost) {
          points -= lowerCardDoublePrice;
          lowerCard.quantity += 2;
        } else {
          points -= cost;
          card.quantity += 1;
        }
      } else {
        points -= cost;
        card.quantity += 1;
      }
    }

    const item: ItemToRedeem = {
      quantity: card.quantity,
      cost,
      value: card.value,
    };

    itemsToRedeem.push(item);
  }

  const totalWorth = itemsToRedeem.reduce((acc, item) => acc + item.quantity * item.value, 0);
  const pointsToNextCard = getCardCost(availableCards[availableCards.length - 1], userLevel) - points;

  const balance = {
    itemsToRedeem,
    totalWorth,
    remainingPoints: points,
    pointsToNextCard,
  };

  return balance;
}

export function calculateRemainingDays(date: Date): number {
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return endOfMonth.getDate() - date.getDate();
}

export function calculateValuePredictions(
  rewards: Reward[],
  totalPointsPrediction: number,
  userLevel: UserLevel
): string {
  return rewards
    .map((rew) => {
      const options = [...rew.options].map((opt) => ({
        ...opt,
        quantity: 0,
      }));

      const { totalWorth } = calculateBalance(options, totalPointsPrediction, userLevel);
      return currencyFormatter.format(totalWorth);
    })
    .join(' / ');
}

export function getWeekPoints(today: Date, pointsSummary: PointsSummary[]): WeekPoints[] {
  const currentDay = today.getDate();

  const weekPoints = pointsSummary.map((item, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), currentDay - index);

    const result: WeekPoints = {
      day: `${dayFormatter.format(date)}<br />(${weekDayFormatter.format(date).replace('.', '')})`,
      points: numberFormatter.format(item.pointsEarned),
    };

    return result;
  });

  return weekPoints.reverse();
}
