import { Session } from "next-auth";
import { Agency, client } from "./index";
import { getClientHeaders } from "@/lib/utils";

export const getAgency = async (agencyId: string, session: Session) => {
  const headers = getClientHeaders(session);
  const response = await client.GET(`/agency/{agencyId}`, {
    params: { path: { agencyId } },
    headers,
  });
  return response.data as Agency;
};

export const createAgency = async (agency: Agency, session: Session) => {
  const headers = getClientHeaders(session);
  const response = await client.POST("/agency", {
    body: agency,
    headers,
  });
  return response.data;
};

export const updateAgency = async (agency: Agency, session: Session) => {
  const headers = getClientHeaders(session);
  const response = await client.PATCH(`/agency`, {
    body: agency,
    headers,
  });
  return response.data;
};

export const deleteAgency = async (agencyId: string, session: Session) => {
  const headers = getClientHeaders(session);
  const response = await client.DELETE(`/agency/{agencyId}`, {
    params: {
      path: { agencyId },
    },
    headers,
  });
  return response.data;
};

export const getAgencies = async (session: Session) => {
  const headers = getClientHeaders(session);
  const response = await client.GET("/agency", {
    headers,
  });
  return response.data;
};
