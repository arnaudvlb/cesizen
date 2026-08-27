export type FilterProps = {
  value: string;
  onChange: (value: string) => void;

  filterBy: string;
  onFilterByChange: (value: string) => void;

  options: {
    label: string;
    value: string;
  }[];
};