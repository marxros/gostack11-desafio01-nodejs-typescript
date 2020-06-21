import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const balanceOutcomes = outcomes.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    const balanceIncomes = incomes.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    return {
      income: balanceIncomes,
      outcome: balanceOutcomes,
      total: balanceIncomes - balanceOutcomes,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
