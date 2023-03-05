import { messages } from '../../../utils/message';

const developerDocumentation = {
  ApiOperation: {
    getDeveloperById: {
      summary: 'developer/getDeveloperById/:id',
      description:
        'Este endpoint recebe como param o id e retorna os dados do desenvolvedor.',
    },
    getTechnologyById: {
      summary: 'developer/getTechnologyById/:id',
      description:
        'Este endpoint recebe como param o id e retorna os dados da tecnologia.',
    },
    createTechnology: {
      summary: 'developer/createTechnology',
      description:
        'Este endpoint recebe como body os dados da nova tecnologia para serem salvos.',
    },
    createManyTechnologies: {
      summary: 'developer/createManyTechnologies',
      description:
        'Este endpoint recebe como body uma lista de novas tecnologias para serem salvos.',
    },
    createDeveloper: {
      summary: 'developer/createDeveloper',
      description:
        'Este endpoint recebe como body os dados do novo desenvolvedor para serem salvos.',
    },
    updateDeveloper: {
      summary: 'developer/updateDeveloper/:id',
      description:
        'Este endpoint recebe como body os dados do desenvolvedor a serem atualizados e o path como id.',
    },
  },
  ApiResponse: {
    getDeveloperById: {
      ok: {
        description: 'Retorna um desenvolvedor pelo id.',
        schema: {
          example: {
            id: 1,
            createdAt: '2023-03-03T14:33:39.367Z',
            updatedAt: '2023-03-03T15:47:28.130Z',
            deletedAt: null,
            acceptedRemoteWork: true,
            monthsOfExperience: 10,
            user_id: 1,
            user: {
              id: 1,
              createdAt: '2023-02-25T22:35:46.591Z',
              updatedAt: '2023-02-25T22:35:46.591Z',
              deletedAt: null,
              name: 'Pedro',
              email: 'pedro@gmail.com',
              salt: '$2b$12$1/awDuQnCaNz9Y.l2hMQlO',
              active: false,
              city_id: 1,
              password:
                '$2b$12$1/awDuQnCaNz9Y.l2hMQlOM6nbEep4hsqdKrdKWIQeZ2kxS6w5Pey',
            },
            technologies: [
              {
                id: 6,
                createdAt: '2023-03-03T14:29:22.451Z',
                updatedAt: '2023-03-03T14:29:22.451Z',
                deletedAt: null,
                name: 'Python',
              },
            ],
          },
        },
      },
      error: {
        description: 'Desenvolvedor não encontrado.',
        schema: {
          example: {
            statusCode: 404,
            message: messages.developerNotFound,
            error: 'Not Found',
            timestamp: '2023-03-03T18:17:15.294Z',
            path: '/developer/getDeveloperById/1',
          },
        },
      },
    },
    getTechnologyById: {
      ok: {
        description: 'Retorna uma tecnologia pelo id.',
        schema: {
          example: {
            id: 5,
            createdAt: '2023-03-03T14:14:38.136Z',
            updatedAt: '2023-03-03T14:14:38.136Z',
            deletedAt: null,
            name: 'Node.js',
          },
        },
      },
      error: {
        description: 'Tecnologia não encontrada.',
        schema: {
          example: {
            statusCode: 404,
            message: messages.technologyNotFound,
            timestamp: '2023-03-03T18:17:15.294Z',
            path: '/developer/getTechnologyById/1',
          },
        },
      },
    },
    createTechnology: {
      ok: {
        description: 'Cria uma tecnologia',
        schema: {
          example: {
            name: 'Nestjs',
            deletedAt: null,
            id: 7,
            createdAt: '2023-03-03T18:32:37.224Z',
            updatedAt: '2023-03-03T18:32:37.224Z',
          },
        },
      },
      error: {
        status: 400,
        description: 'Erro ao criar tecnologia',
        content: {
          'application/json': {
            examples: {
              'Parâmetros inválidos para a criação da tecnologia.': {
                value: {
                  statusCode: 400,
                  message: 'Erro não identificado, contatar o suporte',
                  timestamp: '2023-03-03T19:37:39.395Z',
                  path: '/developer/createTechnology',
                },
              },
              'Tecnologia já existente.': {
                value: {
                  statusCode: 400,
                  message: messages.entityWithArgumentsExists,
                  timestamp: '2023-03-03T19:37:39.395Z',
                  path: '/developer/createTechnology',
                },
              },
              'Falha ao cadastrar a tecnologia no Database.': {
                value: {
                  statusCode: 400,
                  message: messages.technologyNotFound,
                  timestamp: '2023-03-03T19:37:39.395Z',
                  path: '/developer/createTechnology',
                },
              },
            },
          },
        },
      },
    },
    createManyTechnologies: {
      ok: {
        description: 'Cria várias tecnologias',
        schema: {
          example: [
            {
              name: 'React',
              deletedAt: null,
              id: 8,
              createdAt: '2023-03-03T20:05:21.889Z',
              updatedAt: '2023-03-03T20:05:21.889Z',
            },
            {
              name: 'Next',
              deletedAt: null,
              id: 9,
              createdAt: '2023-03-03T20:05:21.889Z',
              updatedAt: '2023-03-03T20:05:21.889Z',
            },
          ],
        },
      },
      error: {
        description: 'Erro ao criar tecnologias.',
        schema: {
          example: {
            statusCode: 400,
            message: messages.entityWithArgumentsExists,
            timestamp: '2023-03-03T20:36:56.488Z',
            path: '/developer/createManyTechnologies',
          },
        },
      },
    },
    createDeveloper: {
      ok: {
        description: 'Cria um desenvolvedor',
        schema: {
          example: {
            statusCode: 201,
            timestamp: '2023-03-03T14:33:39.520Z',
            path: '/developer/createDeveloper',
            records: {
              acceptedRemoteWork: true,
              monthsOfExperience: 1,
              user_id: 1,
              technologies: [
                {
                  id: 5,
                  createdAt: '2023-03-03T14:14:38.136Z',
                  updatedAt: '2023-03-03T14:14:38.136Z',
                  deletedAt: null,
                  name: 'Node.js',
                },
              ],
              deletedAt: null,
              id: 1,
              createdAt: '2023-03-03T14:33:39.367Z',
              updatedAt: '2023-03-03T14:33:39.367Z',
            },
          },
        },
      },
      error: [
        {
          description: 'Erro ao criar desenvolvedor',
          content: {
            'application/json': {
              examples: {
                'Desenvolvedor já existente.': {
                  value: {
                    statusCode: 400,
                    message: messages.entityWithArgumentsExists,
                    timestamp: '2023-03-03T19:37:39.395Z',
                    path: '/developer/createDeveloper',
                  },
                },
                'Erro ao cadastrar o desenvolvedor no Database.': {
                  value: {
                    statusCode: 400,
                    message: messages.developerNotSave,
                    timestamp: '2023-03-03T19:37:39.395Z',
                    path: '/developer/createDeveloper',
                  },
                },
              },
            },
          },
        },
        {
          description: 'Tecnologia não encontrada.',
          schema: {
            example: {
              statusCode: 404,
              message: 'Tecnologia não encontrada',
              timestamp: '2023-03-03T18:17:15.294Z',
              path: '/developer/getTechnologyById/1',
            },
          },
        },
      ],
    },
    updateDeveloper: {
      ok: {
        description: 'Atualiza um desenvolvedor existente',
        schema: {
          example: {
            id: 1,
            createdAt: '2023-03-03T14:33:39.367Z',
            updatedAt: '2023-03-03T15:47:28.130Z',
            deletedAt: null,
            acceptedRemoteWork: true,
            monthsOfExperience: 10,
            user_id: 1,
            user: {
              id: 1,
              createdAt: '2023-02-25T22:35:46.591Z',
              updatedAt: '2023-02-25T22:35:46.591Z',
              deletedAt: null,
              name: 'Pedro',
              email: 'pedro@gmail.com',
              salt: '$2b$12$1/awDuQnCaNz9Y.l2hMQlO',
              active: false,
              city_id: 1,
              password:
                '$2b$12$1/awDuQnCaNz9Y.l2hMQlOM6nbEep4hsqdKrdKWIQeZ2kxS6w5Pey',
            },
            technologies: [
              {
                id: 6,
                createdAt: '2023-03-03T14:29:22.451Z',
                updatedAt: '2023-03-03T14:29:22.451Z',
                deletedAt: null,
                name: 'Python',
              },
            ],
          },
        },
      },
      error: [
        {
          description: 'Erro ao atualizar desenvolvedor',
          status: 400,
          schema: {
            example: {
              statusCode: 400,
              message: messages.developerNotUpdate,
              timestamp: '2023-03-03T18:17:15.294Z',
              path: '/developer/getTechnologyById/1',
            },
          },
        },
        {
          status: 404,
          description: 'Erro ao atualizar desenvolvedor',
          content: {
            'application/json': {
              examples: {
                'Desenvolvedor não encontrado.': {
                  value: {
                    statusCode: 404,
                    message: messages.developerNotFound,
                    timestamp: '2023-03-03T19:37:39.395Z',
                    path: '/developer/updateDeveloper',
                  },
                },
                'Tecnologia não encontrada.': {
                  value: {
                    statusCode: 404,
                    message: messages.technologyNotFound,
                    timestamp: '2023-03-03T19:37:39.395Z',
                    path: '/developer/updateDeveloper',
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
  ApiBody: {
    createManyTechnologies: {
      description: 'Cria várias tecnologias',
      isArray: true,
      schema: {
        example: [
          {
            name: 'Nestjs',
          },
          {
            name: 'Node.js',
          },
        ],
      },
    },
  },
  ApiProperty: {
    CreateDeveloper: {
      acceptedRemoteWork: {
        name: 'acceptedRemoteWork',
        example: true,
        description: 'If the developer accepts remote work',
        type: Boolean,
      },
      monthsOfExperience: {
        name: 'monthsOfExperience',
        example: 10,
        description: 'User id',
        type: Number,
      },
      user_id: {
        name: 'user_id',
        example: 5,
        description: 'User id',
        type: Number,
      },
      technologies: {
        name: 'technologies',
        example: [5, 6],
        isArray: true,
        type: Number,
        description: 'Technologies that the developer knows',
      },
    },
    CreateTechnology: {
      name: {
        name: 'name',
        example: 'Node.js',
        description: 'Name of the technology',
        type: String,
      },
    },
    UpdateDeveloper: {
      acceptedRemoteWork: {
        name: 'acceptedRemoteWork',
        example: true,
        description: 'If the developer accepts remote work',
        type: Boolean,
      },
      monthsOfExperience: {
        name: 'monthsOfExperience',
        example: 10,
        description: 'Months of experience',
        type: Number,
      },
      technologies: {
        name: 'technologies',
        example: [1, 2, 3],
        isArray: true,
        type: Number,
        description: 'Technologies that the developer knows',
      },
    },
  },
};

export { developerDocumentation };
