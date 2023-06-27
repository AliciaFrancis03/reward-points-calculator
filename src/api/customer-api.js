import customers from "../data/customers.json";

export const useCustomersApi = () => ({
  getAllCustomers: async () => new Promise.resolve(customers),
  getCustomerById: async (customerId) =>
    new Promise.resolve(
      customers.filter((customer) => customer.id === customerId)?.[0]
    ),
});
