/* eslint-disable no-useless-catch */
import { Oleg } from "./types";

export const MainApi = {
  async getEnergy(tg_id: number) {
    try {
      const response = await fetch(
        `https://api.tonbetcoin2024webapp.ru/ebergy/${tg_id}`,
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
      const response = await fetch(`https://api.tonbetcoin2024webapp.ru/reward`, {
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
      const response = await fetch(`https://api.tonbetcoin2024webapp.ru/tap`, {
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
      const response = await fetch(`https://api.tonbetcoin2024webapp.ru/fermi`, {
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
        `https://api.tonbetcoin2024webapp.ru/time/${tg_id}`,
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
        `https://api.tonbetcoin2024webapp.ru/gucci/${tg_id}`,
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
        `https://api.tonbetcoin2024webapp.ru/renew_time/${tg_id}`,
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
        `https://api.tonbetcoin2024webapp.ru/rewardbutton/${tg_id}`,
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
  async getOleg() {
    try {
      const response = await fetch(
        `https://api.tonbetcoin2024webapp.ru/oleg`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json() as Oleg[];
      return data ;
    } catch (err) {
      throw err;
    }
  },
  async buyOleg(id: string, tg_id: number) {
    try {
      const response = await fetch(`https://api.tonbetcoin2024webapp.ru/oleg/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "product_id": id,
          "user_id": tg_id
         }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (err) {
      throw err;
    }
  }, 
};
