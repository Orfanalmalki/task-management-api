import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UserService;
  //   let prisma: PrismaService;

  const prismaMock = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // prisma = module.get<PrismaService>(PrismaService);
    prismaMock.user.findUnique.mockClear();
    prismaMock.user.findMany.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const allUserMock = [
        {
          id: 'abd03f14-97f8-40f5-89c4-9bbb6d320ff6',
          email: 'user@example.com',
          password:
            '$2b$10$yOLl9oYn0CvgxX45dhJQ5.PIGIDzzRbntRAzTNFk8hP2YTGokotOO',
          name: 'Orfan',
          createdAt: new Date('2025-07-24T08:01:24.581Z'),
          updatedAt: new Date('2025-07-24T08:01:24.581Z'),
        },
        {
          id: 'cdc56634-593a-4092-8039-fce585a72b16',
          email: 'orfan@example.com',
          password:
            '$2b$10$9WR9CmIrlzWRV9OXm22vC.H6wyY0S.hL0622owHDw0lZXKCEdA/Me',
          name: 'Orfan',
          createdAt: new Date('2025-07-24T13:09:29.116Z'),
          updatedAt: new Date('2025-07-24T13:09:29.116Z'),
        },
      ];

      prismaMock.user.findMany.mockResolvedValue(allUserMock);

      const result = await service.findAll();

      expect(result).toEqual(allUserMock);
      expect(prismaMock.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a single user by ID', async () => {
      const mockUser = {
        id: 'abd03f14-97f8-40f5-89c4-9bbb6d320ff6',
        email: 'user@example.com',
        password:
          '$2b$10$yOLl9oYn0CvgxX45dhJQ5.PIGIDzzRbntRAzTNFk8hP2YTGokotOO',
        name: 'Orfan',
        createdAt: new Date('2025-07-24T08:01:24.581Z'),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findById').mockImplementation((id: string) => {
        if (id === mockUser.id) return Promise.resolve(mockUser);
        return Promise.resolve(null);
      });

      const result = await service.findById(
        'abd03f14-97f8-40f5-89c4-9bbb6d320ff6',
      );

      expect(result).toEqual(mockUser);
    });
  });
});
