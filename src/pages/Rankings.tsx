import * as React from "react";
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/pages/Rankings/Pagination';

const Rankings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [ location.search]
  );
  const pageParam = Number(queryParams.get('page')) || 1;

  const [page, setPage] = useState(pageParam);

  // Simulação de dados de usuários
  const simulatedData = {
    pagination: {
      totalPages: 5, // Total de páginas simuladas
    },
    users: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      username: `User ${index + 1}`,
      level: Math.floor(Math.random() * 100), // Nível aleatório
      exp_percent: Math.floor(Math.random() * 100), // Porcentagem de experiência aleatória
      scores: Math.floor(Math.random() * 1000), // Pontuação aleatória
      top_score: Math.floor(Math.random() * 1000), // Pontuação mais alta aleatória
      total_score: Math.floor(Math.random() * 1000), // Pontuação total aleatória
      user_rank: Math.floor(Math.random() * 100), // Rank do usuário aleatório
      user_type: Math.random() < 0.5 ? 'admin' : 'user', // Tipo de usuário aleatório
    })),
  };

  useEffect(() => {
    queryParams.set('page', page.toString());
    navigate(`?${queryParams.toString()}`);
  }, [page, queryParams, navigate]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className='flex-grow container mx-auto px-2'>
      <Pagination
        currentPage={page}
        totalPages={simulatedData.pagination.totalPages}
        maxPageNumbers={3}
        onPageChange={handlePageChange}
      />
      {/* <RankTable data={{ data: simulatedData.users }} /> */}
      <Pagination
        currentPage={page}
        totalPages={simulatedData.pagination.totalPages}
        maxPageNumbers={3}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Rankings;