/* eslint-disable no-useless-catch */
export const MainApi = {
  async getEnergy(tg_id: number) {
    try {
      const response = await fetch(
        `http://45.8.96.152:8083/ebergy/${tg_id}`,
      );
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
      const response = await fetch(`http://45.8.96.152:8083/reward`, {
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
      const response = await fetch(`http://45.8.96.152:8083/tap`, {
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
  async postFermi(tg_id: number) {
    try {
      const response = await fetch(`http://45.8.96.152:8083/fermi`, {
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
      const response = await fetch(
        `http://45.8.96.152:8083/time/${tg_id}`,
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
  async getGuccy(tg_id: number) {
    try {
      const response = await fetch(
        `http://45.8.96.152:8083/gucci/${tg_id}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.balance;
    } catch (err) {
      throw err;
    }
  },
  async getRenewTime(tg_id: number) {
    try {
      const response = await fetch(
        `http://45.8.96.152:8083/renew_time/${tg_id}`,
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
  async collectReward(tg_id: number) {
    try {
      const response = await fetch(
        `http://45.8.96.152:8083/rewardbutton/${tg_id}`,
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
