import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceController } from './reference.controller';
import { ReferenceService } from './reference.service';

const createdAt = new Date();
const updatedAt = new Date();

describe('ReferenceController', () => {
  let referenceController: ReferenceController;
  let referenceService: ReferenceService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceController],
      providers: [
        {
          provide: ReferenceService,
          useValue: {
            create: jest.fn().mockImplementation((refUrl: string) =>
              Promise.resolve({
                id: '1',
                url: refUrl,
                created_at: createdAt,
                updated_at: updatedAt,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    referenceController = app.get<ReferenceController>(ReferenceController);
    referenceService = app.get<ReferenceService>(ReferenceService);
  });

  it('should be defined', () => {
    expect(referenceController).toBeDefined();
  });

  describe('create()', () => {
    const refUrl = 'http://www.google.com';
    it('should create a reference', () => {
      expect(referenceController.create(refUrl)).resolves.toEqual({
        id: '1',
        url: refUrl,
        created_at: createdAt,
        updated_at: updatedAt,
      });
    });
  });
});
