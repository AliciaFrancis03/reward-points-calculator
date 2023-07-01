import rewards from "../data/rewards.json";

export const useRewardApi = () => ({
    getAllRewards: async () => new Promise(function(resolve, reject) {
        resolve(rewards);
    })
});