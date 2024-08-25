export interface IButton {
  id: number;
  value: string;
  type: 'number' | 'delete' | 'result' | 'operator' | 'reset';
}

export const buttons: IButton[] = [
  { id: 1, value: '7', type: 'number' },
  { id: 2, value: '8', type: 'number' },
  { id: 3, value: '9', type: 'number' },
  { id: 4, value: 'DEL', type: 'delete' },
  { id: 5, value: '4', type: 'number' },
  { id: 6, value: '5', type: 'number' },
  { id: 7, value: '6', type: 'number' },
  { id: 8, value: '+', type: 'operator' },
  { id: 9, value: '1', type: 'number' },
  { id: 10, value: '2', type: 'number' },
  { id: 11, value: '3', type: 'number' },
  { id: 12, value: '-', type: 'operator' },
  { id: 13, value: '.', type: 'number' },
  { id: 14, value: '0', type: 'number' },
  { id: 15, value: '/', type: 'operator' },
  { id: 16, value: 'x', type: 'operator' },
  { id: 17, value: 'RESET', type: 'reset' },
  { id: 18, value: '=', type: 'result' }
];
