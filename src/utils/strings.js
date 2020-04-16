const strings = {
  LOGIN: 'LOGIN',
  LOGOUT: 'SAIR',
  SIGNUP: 'CADASTRE-SE',
  no: 'NÃO',
  yes: 'SIM',
  ok: 'OK',
  cancel: 'Cancelar',
  mandatory: '*',
  email: 'E-mail',
  emailPlaceholder: 'seuemail@host.com.br',
  password: 'Senha',
  passwordPlaceholder: 'Senha do usuário',
  origin: 'Origem',
  name: 'Nome',
  ADDRESS: 'Endereço',
  resident: 'Morador',
  lessee: 'Locatário',
  federalRegister: 'CPF',
  driverLicency: 'CNH',
  phone: 'Telefone',
  birthday: 'Data de Nascimento',
  help: 'Ajuda',
  checkin: 'Check-in',
  checkout: 'Check-out',
  total: 'Total',
  canceled: 'Cancelada',
  genericModalWithJustificative: {
    title: 'Tem certeza que deseja realizar esta operação?',
    placeholder: 'Motivo'
  },
  address: {
    street: 'Rua',
    zip: 'CEP',
    number: 'Número',
    address_formatted: 'Complemento',
    neighborhood: 'Bairro',
    city: 'Cidade',
    state: 'Estado'
  },
  login: {
    rememberMe: 'Lembrar de mim',
    signup: 'Cadastre-se',
    forgotPassword: 'Esqueceu sua senha?'
  },
  signup: {
    originPlaceholder: 'Selecione a origem',
    confirmPasswordPlaceholder: 'Confirme sua senha',
    namePlaceholder: 'Nome Completo',
    addressPlaceholder: 'Seu Endereço',
    federalRegisterPlaceholder: '111.111.111-11',
    driverLicencyPlaceholder: '11111111111',
    phonePlaceholder: '(ddd) nº',
    birthdayPlaceholder: 'dd/mm/yyyy'
  },
  profile: {
    data: 'Dados'
  },
  editModal: {
    edit: 'Editar',
    save: 'SALVAR',
    change: 'Alterar'
  },
  payments: {
    emptyCard: 'Nenhum cartão cadastrado',
    addCard: 'ADICIONAR CARTÃO',
    creditCards: 'Cartões de crédito',
    confirmDeleteMessage: 'Tem certeza que deseja excluir o cartão?',
    modalAddCard: {
      modalTitle: 'Novo cartão',
      number: 'Número do cartão',
      name: 'Nome (Como escrito no cartão)',
      month: 'Validade (Mês)',
      year: 'Validade (Ano)',
      cvv: 'CVV',
      flag: 'Selecione a bandeira do cartão',
      messages: {
        requiredField: 'Campo obrigatório',
        invalidNumber: 'Informe um número válido',
        invalidPasswordConfirmaion: 'As senhas precisam ser iguais',
        invalidMonth: 'Informe um mês válido (MM)',
        invalidYear: 'Informe um ano válido (YY)',
        invalidCVV: 'Informe um CVV válido',
        invalidName: 'Informe o sobrenome',
        upperLetters: 'Utilize letras em caixa alto'
      }
    }
  },
  forgotPassword: {
    currentPassword: 'Senha atual',
    newPassword: 'Nova senha',
    confirmNewPassword: 'Confirme sua nova senha'
  },
  helpScreen: {
    contactMessage: 'Contato para o caso de sinistro, manutenção ou outros:',
    numberLabel: '(31) 3317-2081',
    wppLabel: 'Whatsapp 24h',
    contactEmail: 'contato@usecargo.mobi',
    howToUse: 'Como usar:',
    videoAbstract:
      'O vídeo explicativo contém todos os passos para a utilização do aplicativo, para assisti-lo clique no botão abaixo.',
    videoLabel: 'Assistir vídeo',
    frequentsQuestions: 'Perguntas frequêntes:',
    externalLink: {
      phone: 'tel:+553133172081',
      whatsapp: 'http://api.whatsapp.com/send?phone=5531996571611',
      youtube: 'https://www.youtube.com/watch?v=uUDqWG4R_Xk&feature=youtu.be'
    },
    cadastro: 'Cadastro:',
    regras: 'Regras:',
    pontosImportantes: 'Pontos importantes:',
    reabastecimento: 'Reabastecimento:',
    valores: 'Valores:',
    cupons: 'Cupons',
    pagamentoReembolso: 'Pagamento / Reembolso',
    sinistros: 'Sinistro:',
    outros: 'Outros:'
  },
  ReservationHistoryDetailsModal: {
    title: 'Detalhes da reserva',
    reservationValue: 'Valor do período reservado',
    mileageTraveled: 'Quilometragem percorrida',
    mileageAmountCharged: 'Valor cobrado pela quilometragem',
    delayTime: 'Tempo de atraso',
    latePenalty: 'Multa por atraso'
  },
  reservations: {
    noActiveOrFutureReservation: 'Nenhuma reserva ativa ou futura.',
    newReservation: 'FAZER NOVA RESERVA',
    checkin: 'FAZER CHECK-IN',
    cancel: 'CANCELAR RESERVA',
    cancelModal: {
      title: 'Tem certeza que deseja cancelar a reserva?',
      placeholder: 'Motivo do cancelamento',
      successMessage: 'Sua reserva foi cancelada com sucesso !'
    }
  }
};

export default strings;
