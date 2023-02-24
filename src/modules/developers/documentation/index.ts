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
  ApiProperty: {
    CreateDeveloper: {
      acceptedRemoteWork: {
        name: 'acceptedRemoteWork',
        example: true,
        description: 'If the developer accepts remote work',
        type: Boolean,
      },
      monthsOfExperience: {
        name: 'user_id',
        example: 10,
        description: 'User id',
        type: Number,
      },
      user_id: {
        name: 'user_id',
        example: 10,
        description: 'User id',
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
