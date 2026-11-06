const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(value: number) {
  return brl.format(value);
}

export function installments(value: number, times = 10) {
  return `${times}x de ${formatBRL(value / times)} sem juros`;
}
