import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";

import { ICurrencyData } from "@/interfaces";
import { getCurrencyRates } from "@/services";
import { FIXER_RESPONSE_MOCK } from "@/__mocks__/table.mocks";

export const useFetchCurrencies = () => {
  const [data, setData] = useState<ICurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const send = useCallback(async (currency?: string) => {
    setLoading(true);
    try {
      const response = await getCurrencyRates(currency);

      if (response.success) {
        setTimeout(() => setData(response), 1000);
      } else {
        toast.error("Falha ao buscar dados da API! Traremos dados mockados!");
        setTimeout(() => setData(FIXER_RESPONSE_MOCK), 1000);
      }
    } catch (err) {
      toast.error(`Erro ao fazer a requisição para a API: ${err}`);
      setData(FIXER_RESPONSE_MOCK);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  }, []);

  useEffect(() => {
    send();
  }, [send]);

  return { send, data, loading };
};
