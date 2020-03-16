#encoding: utf-8
#language: pt

Funcionalidade: Realizar o Check-In

O usuário poderá dentro da plataforma UseCar GO, realizar o check-in(retirada) do veículo
para o próprio usufruto.

Como usuário cadastrado
Eu quero realizar o check-in
Para destravar e usar o carro compartilhado UseCar GO

#Criar cenário de fundo

Background:
    Dado que é realizado uma reserva na plataforma
    E preencho no campo "Data e hora do check-in" com "3 Mar 2020, 11:15"
    E preencho no campo "Data e hora do check-out" com "3 Mar 2020, 14:15"
    E clico no botão "Próxima etapa"
    E seleciono o carro "VW-Virtus"
    E clico no botão "Próxima etapa"
    E seleciono no campo "Cartão" com " "
    E clico no botão "FAZER RESERVA"

    Quando clico em "FAZER CHECK-IN"   
      

#Comentário: NENHUM

#-------------------------------------------------------------------------------------------------------
# CASOS DE ERRO
#-------------------------------------------------------------------------------------------------------

# Cenário: OK - Frente

Cenario: realiza o Check-In, mas ao sinalizar uma avaria não tira foto da Frente do carro.
Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
E exibe uma nova janela "Check-in Etapa 1/5"
E uma pergunta "Existe alguma avaria na Frente do Carro?"
E clico em "SIM"
Então sou redirecionado a uma nova página "Check-in Etapa 1/5" 
Quando estou na tela "Check-in Etapa 1/5"
E leio a mensagem "Tire uma foto da Frente do carro"
E clico no "ícone de câmera"
E tiro uma foto
E clico no "x" para cancelar
Então não habilita o botão "Enviar"


#-------------------------------------------------------------------------------------------------------

# Cenário: OK - Lado direito

Cenario: realiza o Check-In, mas ao sinalizar uma avaria não tira foto do Lado direito do carro.
Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"
        
Quando estou na tela "Check-in Etapa 2/5"
    E leio a pergunta "Existe alguma avaria na Lado Direito do Carro?"
    E clico em "SIM"
    Então sou redirecionado a uma nova página "Check-in Etapa 2/5" 
    Quando estou na tela "Check-in Etapa 2/5"
    E leio a mensagem "Tire uma foto da Lado Direito do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" para cancelar
    Então não habilita o botão "Enviar"


#-------------------------------------------------------------------------------------------------------

# Cenário: OK - traseira

Cenario: realiza o Check-In, mas ao sinalizar uma avaria não tira foto da traseira do carro.
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
    Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando estou na página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
    Então sou redirecionado a uma nova página "Check-in Etapa 3/5"
        
Quando estou na tela "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "SIM"
    Então sou redirecionado a uma nova página "Check-in Etapa 3/5" 
    Quando estou na tela "Check-in Etapa 3/5"
    E leio a mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" para cancelar
    Então não habilita o botão "Enviar"

#-------------------------------------------------------------------------------------------------------

# Cenário: fazendo - Lado esquerdo

Cenario: realiza o Check-In, mas ao sinalizar uma avaria não tira foto da Lado Esquerdo do carro.
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
    Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando estou na página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
    Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"
        
Quando estou na tela "Check-in Etapa 4/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Esquedo do Carro?"
    E clico em "SIM"
    Então sou redirecionado a uma nova página "Check-in Etapa 4/5" 
    Quando estou na tela "Check-in Etapa 4/5"
    E leio a mensagem "Tire uma foto da Lado Direito do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" para cancelar
    Então não habilita o botão "Enviar"


#-------------------------------------------------------------------------------------------------------


# Cenário: OK

Cenario: realiza o Check-In, mas não tira uma selfie segurando a sua CNH
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 4/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Esquerdo do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 5/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 5/5"
    E é exibida uma informação "Tire uma Selfie segurando a sua CNH"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" para cancelar
        Então não habilita o botão "Fazer Check-in"

#-------------------------------------------------------------------------------------------------------

#Cenário: fazendo
#Obs.: esse cenário ainda não existe na aplicação uma vez que existe apenas um carro nos condomínios.

#Cenario: realiza o check-in, mas existe um check-out pendente.
   # E sou direcionado a tela "Dirija-se ao veículo:"
   # E exibe uma janela "Check-out pendente"
   # E uma mensagem "Você têm que finalizar o check-out antes de fazer um novo check-in."
   # E aperto "OK"
   # E exibe uma janela de processamento escrito "Aguarde"
   #     Então sou redirecionado a tela de "Reservas"


#-------------------------------------------------------------------------------------------------------
# CASOS DE SUCESSO
#-------------------------------------------------------------------------------------------------------

# Cenário: OK

Cenario: realiza o Check-In de forma correta sem nenhuma avaria.
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 4/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Esquerdo do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 5/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 5/5"
    E é exibida uma informação "Tire uma Selfie segurando a sua CNH"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    E habilita o botão de "Fazer Check-in"
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
    E exibe uma janela "As portas do carro abriram?"
    E clico no botão "SIM"
        Então exibe uma janela com um mesagem: "A chave está dentro do porta-luvas"

Quando clico no botão "OK" 
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
        Então sou redirecionado para a tela "Reserva atual"


#-------------------------------------------------------------------------------------------------------

# Cenário: OK

Cenario: realiza o Check-In de forma correta com alguma avaria (Frente).
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "SIM"
    E sou redirecionado a uma nova página
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
    Quando clico no botão "ENVIAR"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 2/5"
    E uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 4/5"
    E uma pergunta "Existe alguma avaria na Lado Esquerdo do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 5/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 5/5"
    E uma informação "Tire uma Selfie segurando a sua CNH"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    E habilita o botão de "Fazer Check-in"
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
    E exibe uma janela "As portas do carro abriram?"
    E clico no botão "SIM"
        Então exibe uma janela com um mesagem: "A chave está dentro do porta-luvas"

Quando clico no botão "OK" 
    E uma mensagem de processamento "Aguardo estamos processando os dados"
        Então sou redirecionado para a tela "Reserva atual"


#-------------------------------------------------------------------------------------------------------

# Cenário: OK

Cenario: realiza o Check-In de forma correta com alguma avaria (Lado Direito).
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E é exibida uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "SIM"
    E sou redirecionado a uma nova página
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
    Quando clico no botão "ENVIAR"
        Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 4/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Esquerdo do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 5/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 5/5"
    E é exibida uma informação "Tire uma Selfie segurando a sua CNH"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    E habilita o botão de "Fazer Check-in"
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
    E exibe uma janela "As portas do carro abriram?"
    E clico no botão "SIM"
        Então exibe uma janela com um mesagem: "A chave está dentro do porta-luvas"

Quando clico no botão "OK" 
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
        Então sou redirecionado para a tela "Reserva atual"


#-------------------------------------------------------------------------------------------------------

# Cenário: OK 

Cenario: realiza o Check-In de forma correta com alguma avaria (Traseira).
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E é exibida uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "SIM"
    E sou redirecionado a uma nova página
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
    Quando clico no botão "ENVIAR"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 4/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Esquerdo do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 5/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 5/5"
    E é exibida uma informação "Tire uma Selfie segurando a sua CNH"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    E habilita o botão de "Fazer Check-in"
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
    E exibe uma janela "As portas do carro abriram?"
    E clico no botão "SIM"
        Então exibe uma janela com um mesagem: "A chave está dentro do porta-luvas"

Quando clico no botão "OK" 
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
        Então sou redirecionado para a tela "Reserva atual"

#-------------------------------------------------------------------------------------------------------

# Cenário: OK

Cenario: realiza o Check-In de forma correta com alguma avaria (Lado Esquerdo). 
    Então exibe uma página: "Dirija-se até o veículo:"

Quando clico no botão "Próxima Etapa"
    E exibe uma nova janela "Check-in Etapa 1/5"
    E é exibida uma pergunta "Existe alguma avaria na Frente do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 2/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 2/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Direito do Carro?"
    # Pergunta com erro de português
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 3/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 3/5"
    E é exibida uma pergunta "Existe alguma avaria na Traseira do Carro?"
    E clico em "NÃO"
        Então sou redirecionado a uma nova página "Check-in Etapa 4/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 4/5"
    E é exibida uma pergunta "Existe alguma avaria na Lado Esquerdo do Carro?"
    # Pergunta com erro de português
    E clico em "SIM"
    E sou redirecionado a uma nova página
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
    Quando clico no botão "ENVIAR"
        Então sou redirecionado a uma nova página "Check-in Etapa 5/5"

Quando sou redirecionado para uma nova página "Check-in Etapa 5/5"
    E é exibida uma informação "Tire uma Selfie segurando a sua CNH"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    E habilita o botão de "Fazer Check-in"
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
    E exibe uma janela "As portas do carro abriram?"
    E clico no botão "SIM"
        Então exibe uma janela com um mesagem: "A chave está dentro do porta-luvas"

Quando clico no botão "OK" 
    E exibe uma mensagem de processamento "Aguardo estamos processando os dados"
        Então sou redirecionado para a tela "Reserva atual"

#-------------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------------
