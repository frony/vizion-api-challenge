import { Test, TestingModule } from '@nestjs/testing';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

const createdAt = new Date();
const updatedAt = new Date();
const reference_id = 1;
const responseObj = {
  id: '1',
  reference_id,
  data: {
    title: 'A title',
    meta: [
      {
        name: 'Content-Type',
        value: 'application/json',
      },
    ],
  },
  created_at: createdAt,
  updated_at: updatedAt,
};

describe('ReferenceController', () => {
  let resultController: ResultController;
  let resultService: ResultService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResultController],
      providers: [
        {
          provide: ResultService,
          useValue: {
            getResult: jest
              .fn()
              .mockImplementation((id: string) => Promise.resolve(responseObj)),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resultController = app.get<ResultController>(ResultController);
    resultService = app.get<ResultService>(ResultService);
  });

  it('should be defined', () => {
    expect(resultController).toBeDefined();
  });

  describe('create()', () => {
    const id = '1';
    it('should create a reference', () => {
      expect(resultController.create(id)).resolves.toEqual(responseObj);
    });
  });
});
