import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchData = async () => {
  const response = await api.get('/data');
  return response.data;
};

export const useFetchData = () => {
  return useQuery({ queryKey: ['data'], queryFn: fetchData });
};
