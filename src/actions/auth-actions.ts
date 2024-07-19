"use server";

import { cookies } from "next/headers";

export const setAccessToken = async () => {
  cookies().set(
    "access_token",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiMzYyODA2NTFjZTAzOGMxNTlhNGYyMTFmMWExODczOTZjNWU1OWE3MzY2MDFiMzczNmJlNjQzZjI5MThjYTE4ZmM1M2E0YTVkNjdiZTY4MGEiLCJpYXQiOjE3MTc5MDQxNjkuNDc0NzEzLCJuYmYiOjE3MTc5MDQxNjkuNDc0NzIsImV4cCI6MTc0OTQ0MDE2OS40NzAxNzEsInN1YiI6IjQ4MiIsInNjb3BlcyI6W119.X2kPBX5tj-xTMNJ2lCadYoEhqZC5FKefnxlK4HEF_mBZ0WfTAoP1QhmZJ7i_K43h3KOO4j3L371AYKtRNT9yKt65A4xvkZVR7JDDVfUmeFkyVumnPsukVku1UW-Dt3dBezTLnX_RcbWNOCzjVumyGaxUezZ_AZdv_1SGAQiDROG9nnYvLgWVANHTMZ4wFKSKQZarT2FdryLzojnuMEkdPP6zK-Cw4q9BmGPtkX8iHA7mN_YSUyJAQoY1466YjjaDL53uSKlQiYh5EAPZcnDe164nTeupHloy5kx43MCAzDO_aQ4wyMu2Prf7LV9wt9tTrodlhzTiAXGmsSdHqcxkcSNbikmCOPEVmcas__42KyO1kXwlOy7JfE9TjToRLuJQHJLFUscrEwYWcFforaQYw3dRpBcdXbadoFXAT3RL0Z9f7fY6T5-Y_zTVCNyGQIu1eooZOdw7fbNUebNfWSg_4bhRxRQUSVSaWAujunzpaG8SuL5zAnn1_Rq9HcwPsN1c_euekarYQIMjjAc0ED0-uxm62SDprOWV7tl2VtH6RB14bKFvOuS4pKouj3W5GuxOULarLV-NizG8szBhlS_9Re8fNI5kxD0jNq6e80YkDnF9mtiAyBtYucX8LfAyFcuevolhSfRAnBNPiaQURNbrUHGolrTuEQkl-0XHsiwb9Fc",
  );
};

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${code}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (res.ok) {
    const {
      data: { token },
    } = await res.json();

    return token;
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};
