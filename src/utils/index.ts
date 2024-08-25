export const isOnlyZerosAndDots = (str: string): boolean => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '0' && str[i] !== '.') {
      return false;
    }
  }
  return true;
};

export const isMissingDecimal = (str: string): boolean => {
  return str.slice(-1) === '.';
};

export const convertArrStringToNumber = (strArr: string[]) => {
  const newArr = strArr.map((item) => {
    if (Number.isNaN(Number(item))) {
      return item;
    }
    return Number(item);
  });
  return newArr;
};

export const findOperatorIndex = (arr: (string | number)[], operators: string[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (operators.includes(arr[i] as string)) {
      return i;
    }
  }
  return -1;
};

export const formatNumber = (number: number, index = 5): number => {
  return Number(number.toFixed(index));
};
