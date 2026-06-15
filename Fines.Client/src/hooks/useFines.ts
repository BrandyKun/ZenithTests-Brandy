import { useEffect, useState } from "react";
import { Fine } from "../types/fine";
import { Filters } from "../types/filters";

const API_URL = "http://localhost:5200/api";

function queryBuilder(filters: Filters) {
  const filterParams = new URLSearchParams();

  if(filters.fineDate)
    filterParams.append('Date', filters.fineDate)

  if(filters.fineType)
    filterParams.append('fineType', filters.fineType)

  if(filters.vehicleRegNo)
    filterParams.append('vehicleRegNo', filters.vehicleRegNo);
  return filterParams ? `?${filterParams}` : "";
}

export function useFines(filters: Filters) {
  const [fines, setFines] = useState<Fine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFines = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/fines${queryBuilder(filters)}`);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const raw = await response.json();
        const fines = raw.map((fine: any) => ({
          ...fine,
          fineDate: new Date(fine.fineDate),
        }));

        setFines(fines);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch fines");
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, [filters.fineDate, filters.fineType, filters.vehicleRegNo]);

  return { fines, loading, error };
}
