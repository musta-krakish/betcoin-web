/* eslint-disable no-useless-catch */
export const MainApi = {
  async getEnergy(tg_id: number) {
    try {
      const response = await fetch(`https://scam.322228.xyz/ebergy/${tg_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: number = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },
  async postReward(tg_id: number) {
    try {
      const response = await fetch(`https://scam.322228.xyz/reward`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tgid: tg_id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },
  async postTap(tg_id: number) {
    try {
      const response = await fetch(`https://scam.322228.xyz/tap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tgid: tg_id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },
  async getTime(tg_id: number) {
    try {
      const response = await fetch(`https://scam.322228.xyz/time/${tg_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },
  async getGuccy(tg_id: number) {
    try {
      const response = await fetch(`https://scam.322228.xyz/gucci/${tg_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },
  async getRenewTime(tg_id: number) {
    try {
      const response = await fetch(
        `https://scam.322228.xyz/renew_time/${tg_id}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },
};
