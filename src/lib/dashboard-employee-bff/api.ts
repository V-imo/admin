import { client, RegisterUser } from ".";

export const registerEmployee = async (user: RegisterUser) => {
  const response = await client.POST("/user", {
    body: user,
  });
  return response.data;
};

export const getEmployees = async (agencyId: string) => {
  const response = await client.GET("/user/{agencyId}", {
    params: {
      path: { agencyId },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
