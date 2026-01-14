import axios from "axios";
import type { Patient, PatientNew, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const resp = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return resp.data;
};

const create = async (object: PatientNew) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (id: string, object: Entry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entry`,
    object
  );

  return data;
};


export default {
  getAll, getById, create, addEntry
};

