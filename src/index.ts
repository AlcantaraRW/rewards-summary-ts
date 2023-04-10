import { rewards } from './data/rewards';
import { getUserInfo } from './utils/api';
import { currencyFormatter, dateFormatter, numberFormatter } from './utils/formatters';
import { calculateBalance, calculateRemainingDays, calculateValuePredictions, getWeekPoints } from './utils/helpers';
import { createContainer, createDivider, createLabel, createStrong, createTable } from './utils/ui';

const ORIGINS = ['https://rewards.microsoft.com', 'https://rewards.bing.com'];
const INTERVAL_TIMEOUT = 1000;

const interval = setInterval(async () => {
  const statusElement =
    document.querySelector('mee-rewards-user-status') || document.querySelector('mee-rewards-user-status-banner');

  if (!statusElement) return;
  clearInterval(interval);

  const { origin } = location;

  if (!ORIGINS.includes(origin)) return;

  const userInfo = await getUserInfo(origin);

  const info = {
    availablePoints: userInfo.status.userStatus.availablePoints,
    currentMonthPoints: userInfo.status.userStatus.levelInfo.progress,
    userLevel: userInfo.status.userStatus.levelInfo.activeLevel,
    pointsSummary: userInfo.status.pointsSummary,
  };

  const today = new Date();
  const pointsPerDay = info.currentMonthPoints / today.getDate();
  const daysRemaining = calculateRemainingDays(today);
  const potentialPoints = Math.floor(pointsPerDay * daysRemaining);
  const thisMonthPointsPrediction = info.currentMonthPoints + potentialPoints;
  const totalPointsPrediction = info.availablePoints + potentialPoints;
  const lastSevenDaysTotalPoints = info.pointsSummary.reduce((acc, cur) => acc + cur.pointsEarned, 0);

  const weekPoints = getWeekPoints(today, info.pointsSummary);

  const container = createContainer(statusElement);
  createStrong(container, `CARTÕES A COMPRAR COM ${numberFormatter.format(info.availablePoints)} PONTOS:`);

  rewards.forEach((rew) => {
    const { itemsToRedeem, totalWorth, remainingPoints, pointsToNextCard } = calculateBalance(
      rew.options,
      info.availablePoints,
      info.userLevel
    );

    const tableItems = itemsToRedeem.map((item) => ({
      value: currencyFormatter.format(item.value),
      cost: numberFormatter.format(item.cost),
      quantity: numberFormatter.format(item.quantity),
      total: currencyFormatter.format(item.quantity * item.value),
    }));

    createStrong(container, rew.name);

    createTable(container, ['Valor', 'Custo', 'Qtde', 'Total'], tableItems);
    createStrong(container, `TOTAL: ${currencyFormatter.format(totalWorth)}`);
    createStrong(
      container,
      `Sobrariam ${numberFormatter.format(remainingPoints)} pontos (${numberFormatter.format(
        pointsToNextCard
      )} pontos para um próximo cartão).`
    );
  });

  createDivider(container);

  createStrong(container, dateFormatter.format(today).toUpperCase());

  createLabel(
    container,
    `<b>${numberFormatter.format(
      info.currentMonthPoints
    )}</b> pontos adquiridos em <b>${today.getDate()}</b> dias (média de <b>${numberFormatter.format(
      pointsPerDay
    )}</b> pontos ao dia)`
  );

  if (daysRemaining > 0) {
    createLabel(
      container,
      `${daysRemaining} dias restantes x ${numberFormatter.format(pointsPerDay)} pontos = <b>${numberFormatter.format(
        potentialPoints
      )}</b> potenciais pontos`
    );

    createLabel(
      container,
      `Previsão de pontos ao longo do mês: <b>${numberFormatter.format(thisMonthPointsPrediction)}</b>`
    );

    createLabel(
      container,
      `Previsão do total de pontos ao fim do mês: <b>${numberFormatter.format(
        totalPointsPrediction
      )} (${calculateValuePredictions(rewards, totalPointsPrediction, info.userLevel)})</b>.`
    );
  }

  createDivider(container);

  createStrong(container, `PONTOS DOS ÚLTIMOS 7 DIAS (${numberFormatter.format(lastSevenDaysTotalPoints)})`);

  createTable(
    container,
    weekPoints.map((wp) => wp.day),
    weekPoints.map((wp) => wp.points)
  );
}, INTERVAL_TIMEOUT);
