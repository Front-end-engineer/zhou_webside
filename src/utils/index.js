import { Decimal } from "decimal.js";

// 加
export function add(x, y) {
  if (!x) {
    x = 0;
  }
  if (!y) {
    y = 0;
  }
  const xx = new Decimal(x);
  const yy = new Decimal(y);
  return xx.plus(yy).toNumber();
}
// 减
export function sub(x, y) {
  if (!x) {
    x = 0;
  }
  if (!y) {
    y = 0;
  }
  const xx = new Decimal(x);
  const yy = new Decimal(y);
  return xx.sub(yy).toNumber();
}
// 除
export function div(x, y) {
  if (!x) {
    x = 0;
  }
  if (!y) {
    return 0;
  }
  const xx = new Decimal(x);
  const yy = new Decimal(y);
  return xx.div(yy).toNumber();
}
//乘
export function mul(x, y) {
  if (!x) {
    x = 0;
  }
  if (!y) {
    y = 0;
  }
  const xx = new Decimal(x);
  const yy = new Decimal(y);
  return xx.mul(yy).toNumber();
}
