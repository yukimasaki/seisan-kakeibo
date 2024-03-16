import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaymentService } from './payment.service';
import { CreateTransactionComplex } from '@dto/create-transaction.dto';
import { CreatePaymentDto } from '@dto/create-payment.dto';

const prismaService = new PrismaService();
const paymentService = new PaymentService(prismaService);

const transactionId: number = 1;

const createTestTransactionComplex = (
  overrides?: Partial<CreateTransactionComplex>,
): CreateTransactionComplex => {
  return {
    creatorId: 1,
    amount: 1000,
    paymentDate: new Date(),
    title: 'テストデータ',
    memo: 'テストです。',
    status: 'PENDING',
    method: 'NONE',
    categoryId: 1,
    groupId: 1,
    member: [{ userId: 1, ratio: 1, finalBill: 1000, balance: 1000 }],
    ...overrides,
  };
};

describe('createPaymentDto', () => {
  // 正常系
  test('[1-A] 人数が1人の際、作成者が全額負担している場合にCreatePaymentDto[]型のデータを返却すること', () => {
    const createTransactionComplex = createTestTransactionComplex();

    const createPaymentDto: CreatePaymentDto[] =
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      });

    // 要素が1以上の配列を返すことを確認
    expect(Array.isArray(createPaymentDto)).toBeTruthy();
    expect(createPaymentDto.length).toBeGreaterThan(0);

    // 各要素が適切なプロパティを持っていることを確認
    createPaymentDto.forEach((dto) => {
      expect(dto).toHaveProperty('payerId');
      expect(dto).toHaveProperty('finalBill');
      expect(dto).toHaveProperty('balance');
      expect(dto).toHaveProperty('difference');
      expect(dto).toHaveProperty('ratio');
      expect(dto).toHaveProperty('transactionId');
    });
  });

  test('[1-A] 複数人でかつ、method=NONEの際、作成者が全額負担している場合にCreatePaymentDto[]型のデータを返却すること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [
        { userId: 1, ratio: 1, finalBill: 1000, balance: 1000 },
        { userId: 2, ratio: 0, finalBill: 0, balance: 0 },
      ],
    });

    const createPaymentDto: CreatePaymentDto[] =
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      });

    // 要素が1以上の配列を返すことを確認
    expect(Array.isArray(createPaymentDto)).toBeTruthy();
    expect(createPaymentDto.length).toBeGreaterThan(0);

    // 各要素が適切なプロパティを持っていることを確認
    createPaymentDto.forEach((dto) => {
      expect(dto).toHaveProperty('payerId');
      expect(dto).toHaveProperty('finalBill');
      expect(dto).toHaveProperty('balance');
      expect(dto).toHaveProperty('difference');
      expect(dto).toHaveProperty('ratio');
      expect(dto).toHaveProperty('transactionId');
    });
  });

  test('[1-B] 複数人でかつ、method=AMOUNT_BASISの場合にCreatePaymentDto[]型のデータを返却すること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      method: 'AMOUNT_BASIS',
      member: [
        { userId: 1, finalBill: 250, balance: 500 },
        { userId: 2, finalBill: 750, balance: 500 },
      ],
    });

    const createPaymentDto: CreatePaymentDto[] =
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      });

    // 要素が1以上の配列を返すことを確認
    expect(Array.isArray(createPaymentDto)).toBeTruthy();
    expect(createPaymentDto.length).toBeGreaterThan(0);

    // 各要素が適切なプロパティを持っていることを確認
    createPaymentDto.forEach((dto) => {
      expect(dto).toHaveProperty('payerId');
      expect(dto).toHaveProperty('finalBill');
      expect(dto).toHaveProperty('balance');
      expect(dto).toHaveProperty('difference');
      expect(dto).toHaveProperty('ratio');
      expect(dto).toHaveProperty('transactionId');
    });
  });

  // 異常系
  test('[1-A] ratioの指定が必要にもかかわらず未指定の場合に例外をスローすること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [{ userId: 1, finalBill: 1000, balance: 1000 }], // ratioが未指定の誤ったデータ
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('ratioの指定が必要です');
  });

  test('[1-A] 人数が1人の際、作成者が全額負担していない場合に例外をスローすること (case: finalBill !== amount)', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [{ userId: 1, ratio: 1, finalBill: 0, balance: 1000 }],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの金額の合計と総額が一致しません');
  });

  test('[1-A] 人数が1人の際、作成者が全額負担していない場合に例外をスローすること (case: finalBill !== balance)', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [{ userId: 1, ratio: 1, finalBill: 1000, balance: 0 }],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('作成者のfinalBillとbalanceが一致しません');
  });

  test('[1-A] 人数が1人の際、作成者が全額負担していない場合に例外をスローすること (case: ratio > 1)', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [{ userId: 1, ratio: 0, finalBill: 1000, balance: 1000 }],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの比率の合計が1ではありません');
  });

  test('[1-A] 複数人でかつ、作成者が全額負担していない場合に例外をスローすること (creator.ratio !== 1)', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [
        { userId: 1, ratio: 0.5, finalBill: 1000, balance: 1000 },
        { userId: 2, ratio: 0.5, finalBill: 0, balance: 0 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('作成者のratioが1未満です');
  });

  test('[1-A] 複数人でかつ、作成者が全額負担していない場合に例外をスローすること (creator.finalBill !== amount)', () => {
    const createTransactionComplex = createTestTransactionComplex({
      member: [
        { userId: 1, ratio: 1, finalBill: 1, balance: 1 },
        { userId: 2, ratio: 0, finalBill: 999, balance: 0 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('作成者のfinalBillと総額が一致しません');
  });

  test('[1-B] method=AMOUNT_BASISの際、一人当たりの金額の合計と総額が等しくない場合に例外をスローすること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      method: 'AMOUNT_BASIS',
      member: [
        { userId: 1, finalBill: 1, balance: 500 },
        { userId: 2, finalBill: 1, balance: 500 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの金額の合計と総額が一致しません');
  });

  test('[1-C] method=RATIOの際、一人当たりの比率の合計が1と等しくない場合に例外をスローすること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      method: 'RATIO',
      member: [
        { userId: 1, ratio: 0.25, finalBill: 500, balance: 500 },
        { userId: 2, ratio: 0, finalBill: 500, balance: 500 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの比率の合計が1ではありません');
  });

  test('[1-C] method=RATIOの際、一人当たりの金額の合計と総額が等しくない場合に例外をスローすること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      method: 'RATIO',
      member: [
        { userId: 1, ratio: 0.25, finalBill: 499, balance: 500 },
        { userId: 2, ratio: 0.75, finalBill: 500, balance: 500 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの金額の合計と総額が一致しません');
  });

  test('[1-C] method=EVENの際、一人当たりの比率の合計が1と等しくない場合に例外をスローすることと', () => {
    const createTransactionComplex = createTestTransactionComplex({
      method: 'EVEN',
      member: [
        { userId: 1, ratio: 0.25, finalBill: 500, balance: 500 },
        { userId: 2, ratio: 0, finalBill: 500, balance: 500 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの比率の合計が1ではありません');
  });

  test('[1-C] method=EVENの際、一人当たりの金額の合計と総額が等しくない場合に例外をスローすること', () => {
    const createTransactionComplex = createTestTransactionComplex({
      method: 'EVEN',
      member: [
        { userId: 1, ratio: 0.5, finalBill: 499, balance: 500 },
        { userId: 2, ratio: 0.5, finalBill: 500, balance: 500 },
      ],
    });

    expect(() =>
      paymentService.createPaymentDto({
        createTransactionComplex,
        transactionId,
      }),
    ).toThrow('一人当たりの金額の合計と総額が一致しません');
  });
});
