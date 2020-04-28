const strings = {
  LOGIN: 'LOGIN',
  LOGOUT: 'SAIR',
  SIGNUP: 'CADASTRE-SE',
  no: 'Não',
  yes: 'Sim',
  ok: 'OK',
  send: 'ENVIAR',
  cancel: 'CANCELAR',
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
  observation: 'Observação',
  feedback: 'Feedback',
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
    toCheckIn: 'FAZER CHECK-IN',
    toCheckOut: 'FAZER CHECK-OUT',
    openDors: 'ABRIR PORTAS',
    cancel: 'CANCELAR RESERVA',
    openCloseDoorAgainSuccessMessage: 'Comando enviado com sucesso !',
    isDoorsOpen: 'As portas do carro se abriram?',
    closeDoors: 'TRANCAR PORTAS',
    keyLocation: 'A chave está no porta-luvas.',
    cancelModal: {
      title: 'Tem certeza que deseja cancelar a reserva?',
      placeholder: 'Motivo do cancelamento',
      successMessage: 'Sua reserva foi cancelada com sucesso !'
    },
    checkCarSides:
      'Percorra o carro e verifique se identifica alguma avaria (Opcional)',
    checkinScreen: {
      takeASelfie: '* Tire uma selfie segurando a sua CNH'
    },
    checkoutScreen: {
      takeAEstepePicture: '* Tire uma foto do estepe',
      feedbackForm: {
        insideCarState: 'Estado interno do carro',
        outsideCarState: 'Estado externo do carro',
        badSmell: 'O carro apresentou algum odor?',
        carDefect: 'O carro apresentou algum defeito?',
        othersObs: 'Outras observações',
        othersObsPlaceHolder: 'Alguma outra observação?',
        carDefectObs: 'Informe mais detalhes sobre o defeito',
        howWasTheExperience: '* Como foi sua experiência com o UseCar Go?',
        isDoorsClose: 'As portas do carro se trancaram?',
        areYouInTheCarTitle: 'Você ainda está dentro do carro?',
        areYouInTheCarMessage:
          'Caso esteja, coloque a chave no porta-luvas, e antes de sair verifique se pegou todos os seus pertences.',
        doYouHaveTheKeysTitle: 'A chave ainda está com você?',
        doYouHaveTheKeysMessage:
          'Não se esqueça de deixá-la dentro do porta-luvas.'
      }
    }
  }
};

export default strings;
