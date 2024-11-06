import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

export const SearchForm: React.FC<{
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}> = ({ searchTerm, setSearchTerm }) => {
  return (
    <FormControl>
      <FormLabel>일정 검색</FormLabel>
      <Input
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </FormControl>
  );
};
