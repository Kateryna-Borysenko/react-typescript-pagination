export function getPaginationItems(
  currentPage: number,
  lastPage: number,
  maxLength: number
) {
  const res: Array<number> = []; //или const res: number[] = []

  /*
  данные для понимания логики
lastPage = 20;
 maxLength= 7;
  */

  // handle lastPage less than maxLength
  // console.log(getPaginationItems(1, 5, 7)); //[1, 2, 3, 4, 5]
  // console.log(getPaginationItems(5, 7, 7)); //[1, 2, 3, 4, 5, 6, 7]
  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i);
    }
  }

  // handle ellipsis logics - обрабатывать логику с многоточием вставляем его в середину

  // console.log(getPaginationItems(1, 10, 7)); //[1, 2, 3, NaN, 8, 9, 10]
  // console.log(getPaginationItems(9, 10, 7)); //[1, 2, 3, NaN, 8, 9, 10]

  //в этих случаях нам не нужно вставлять ... -  ellipses
  //currentPage = 1 firstPage = 1 | currentPage - firstPage = 0
  //currentPage = 9 lastPage = 10 | lastPage - currentPage = 1
  //currentPage = 2 firstPage = 1 | currentPage - firstPage = 1
  //currentPage = 10 lastPage = 10 | lastPage - currentPage = 0
  else {
    const firstPage = 1; //отображать будет 3 страницы начиная с первой
    const confirmedPagesCount = 3; //отображать будет 3 страницы
    const deductedMaxLength = maxLength - confirmedPagesCount; //вычитается 7 - 3 = 4
    const sideLength = deductedMaxLength / 2; //2
    // handle ellipsis in the middle
    //результат: previous 1 2 3 ... 8 9 10 next
    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        res.push(j); //выводит 1 2 3
      }

      res.push(NaN); //выводит условно ... NaN

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k); // выводит 8 9 10
      }
    }

    // handle two ellipsis
    // текущая страница в середине
    //результат: previous 1  ... 4 5 6 ... 10 next
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);
    }

    // handle ellipsis not in the middle
    //[1, NaN, 16, 17, 18, 19, 20]
    //[1, 2, 3, 4, 5, NaN, 20]
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          res.push(n);
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p--) {
          res.unshift(p);
        }
      }
    }
  }

  return res;
}
