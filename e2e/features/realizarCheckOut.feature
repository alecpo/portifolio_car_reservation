#encoding: utf-8
#language: pt

Funcionalidade: Realizar o Check-Out

O usuário poderá dentro da plataforma UseCar GO, realizar o check-out(entrega) do veículo
no condomínio de origem.

Como usuário cadastrado
Eu quero realizar o check-out
Para devolver o carro para que um próximo usuário faça o uso.

# Criar Cenário de Fundo

Background:
    Dado que exista a seguinte reserva vigente:
    | Data e hora do check-in | Data e hora do check-out | Veículo          |
    | 27 Feb 2020, 16:30      | 27 Feb 2020, 20:30       | VW - VIRTUS      |

    Quando clico em "FAZER CHECK-OUT"   
      

#Comentário: NENHUM

#-------------------------------------------------------------------------------------------------------
# CASOS DE ERRO
#-------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out, mas não tira foto do Estepe do carro na Etapa 1/5.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E exibe uma nova janela "Check-out Etapa 1/5"
    E uma pergunta "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" de cancelamento
    Então não habilita o botão de "ENVIAR"

#-------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out, mas não tira foto da Traseira do carro na Etapa 2/5.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E sou redirecionado a tela "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou direcionado a tela "Check-out Etapa 2/5"
    E exibe uma mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" de cancelamento
    Então não habilita o botão de "ENVIAR"

#--------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out, mas não tira foto da Frente do carro na Etapa 3/5.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E sou redirecionado a tela "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 2/5"
    E exibe uma mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou direcionado a tela "Check-out Etapa 3/5"
    E exibe uma mensagem "Tire uma foto da Frente do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" de cancelamento
    Então não habilita o botão de "ENVIAR"

#-------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out, mas não tira foto da Lado Direito do carro na Etapa 4/5.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E sou redirecionado a tela "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 2/5"
    E exibe uma mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 3/5"
    E exibe uma mensagem "Tire uma foto da Frente do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou direcionado a tela "Check-out Etapa 4/5"
    E exibe uma mensagem "Tire uma foto da Lado Direito do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" de cancelamento
    Então não habilita o botão de "ENVIAR"

#-------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out, mas não tira foto da Lado Esquerdo do carro na Etapa 5/5.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E sou redirecionado a tela "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 2/5"
    E exibe uma mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 3/5"
    E exibe uma mensagem "Tire uma foto da Frente do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 4/5"
    E exibe uma mensagem "Tire uma foto da Lado Direito do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou direcionado a tela "Check-out Etapa 5/5"
    E exibe uma mensagem "Tire uma foto da Lado Esquerdo do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "x" de cancelamento
    Então não habilita o botão de "Fazer Check-out"

#-------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out, mas não preecho as estrelas do feedback.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E sou redirecionado a tela "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 2/5"
    E exibe uma mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 3/5"
    E exibe uma mensagem "Tire uma foto da Frente do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 4/5"
    E exibe uma mensagem "Tire uma foto da Lado Direito do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou direcionado a tela "Check-out Etapa 5/5"
    E exibe uma mensagem "Tire uma foto da Lado Esquerdo do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "Fazer Check-out"

    Quando clico no botão "Fazer Check-out"
    Então exibe uma janela na tela com uma mensagem: "Você ainda está dentro do carro? Se estiver dentro do carro, saia e feche a porta para podermos realizar o travamento"

    Quando clico no botão "TRANCAR O CARRO"
    E exibe uma mensagem de processamento "Aguarde, estamos processando os dados"
    E exibe uma mensagem de confirmação: "Check-out realizado com sucesso!"
    E abre uma janela: "As portas do carro trancaram?"
    E clico em "SIM"
    Então exibe uma janela de "Feedback"

    Quando abre a tela de "Feedback" 
    E não seleciono "1" estrela no campo "Como foi sua experiência com o Pick'n'Go?"
    # colocar o preenchimento do feedback no fluxo?
    # E o botão "AVALIE A SUA EXPERIÊNCIA" não muda para "ENVIAR FEEDBACK"
    # dúvida nesse processo acima
    Então não habilita o botão "AVALIE A SUA EXPERIÊNCIA"

#-------------------------------------------------------------------------------------------------------

# Cenário: Ok

Cenario: realiza o check-out e o preenchimento do feedback, mas não preeche as estrelas do feedback.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

    Quando clico no botão "OK"
    E sou redirecionado a tela "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 2/5"
    E exibe uma mensagem "Tire uma foto da Traseira do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 3/5"
    E exibe uma mensagem "Tire uma foto da Frente do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou redirecionado a tela "Check-out Etapa 4/5"
    E exibe uma mensagem "Tire uma foto da Lado Direito do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "ENVIAR"

    Quando clico no botão "ENVIAR"
    E sou direcionado a tela "Check-out Etapa 5/5"
    E exibe uma mensagem "Tire uma foto da Lado Esquerdo do carro"
    E clico no "ícone de câmera"
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão de "Fazer Check-out"

    Quando clico no botão "Fazer Check-out"
    Então exibe uma janela na tela com uma mensagem: "Você ainda está dentro do carro? Se estiver dentro do carro, saia e feche a porta para podermos realizar o travamento"

    Quando clico no botão "TRANCAR O CARRO"
    E exibe uma mensagem de processamento "Aguarde, estamos processando os dados"
    E exibe uma mensagem de confirmação: "Check-out realizado com sucesso!"
    E abre uma janela: "As portas do carro trancaram?"
    E clico em "SIM"
    Então exibe uma janela de "Feedback"

    Quando abre a tela de "Feedback" 
    E não seleciono "1" estrela no campo "Como foi sua experiência com o Pick'n'Go?"
    # colocar o preenchimento do feedback
    E seleciono "Limpo" no campo "Estado interno do carro:"
    E seleciono "Limpo" no campo "Estado externo do carro:"
    E seleciono "Sim" no campo "O carro apresenta algum odor?"
    E seleciono "Sim" no campo "O carro apresenta algum defeito?"
    E preencho com " " no campo "Outras informações"
    Então não habilita o botão "AVALIE A SUA EXPERIÊNCIA"

#-------------------------------------------------------------------------------------------------------

#Cenário: fazendo
#Obs.: esse cenário ainda não existe na aplicação uma vez que existe apenas um carro nos condomínios.

#Cenario: realiza o check-in, mas existe um check-out pendente.
#    E sou direcionado a tela "Dirija-se ao veículo:"
#    E exibe uma janela "Check-out pendente"
#    E uma mensagem "Você têm que finalizar o check-out antes de fazer um novo check-in."
#    E aperto "OK"
#    E exibe uma janela de processamento escrito "Aguarde"
#    Então sou redirecionado a tela de "Reservas"

#-------------------------------------------------------------------------------------------------------
# CASOS DE SUCESSO
#-------------------------------------------------------------------------------------------------------

#Cenário: Ok

Cenario: realiza o check-out de forma correta e o preenchimento das estrelas.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

Quando clico no botão "OK"
    E clico no ícone do carro na tela de "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro".
    # Erro de portugues na frase.
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 2/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 2/5".
    E exibe uma mensagem "Tire uma foto da Traseira do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 3/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 3/5".
    E exibe uma mensagem "Tire uma foto da Frente do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão "ENVIAR"
    Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 4/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 4/5".
    E exibe uma mensagem "Tire uma foto da Lado Direito do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão "ENVIAR"
    Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 5/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 5/5".
    E exibe uma mensagem "Tire uma foto da Lado Esquerdo do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
Quando clico em "ENVIAR"
    Então habilita o botão "Fazer Check-out"

Quando clico no botão "Fazer Check-out"
    Então exibe uma janela na tela com uma mensagem: "Você ainda está dentro do carro? Se estiver dentro do carro, saia e feche a porta para podermos realizar o travamento"

Quando clico no botão "TRANCAR O CARRO"
    E exibe uma mensagem de processamento "Aguarde, estamos processando os dados"
    E exibe uma mensagem de confirmação: "Check-out realizado com sucesso!"
    E abre uma janela: "As portas do carro trancaram?"
    E clico em "SIM"
        Então exibe uma janela de "Feedback"

Quando abre a tela de "Feedback" 
    E seleciono "1" estrela no campo "Como foi sua experiência com o Pick'n'Go?"
    # colocar o preenchimento do feedback
    E o botão "AVALIE A SUA EXPERIÊNCIA" muda para "ENVIAR FEEDBACK"
    Então habilita o botão "ENVIAR FEEDBACK"
    Quando clico em "ENVIAR FEEDBACK"
    Então sou redirecionado para a pagina de "Reserva(s) futura(s):"


#-------------------------------------------------------------------------------------------------------

#Cenário: Ok

Cenario: realiza o check-out de forma correta, o preenchimento das estrelas e do feedback.
    Então exibe uma janela na tela com uma mensagem: "A chave ainda está com você? Não se esqueça de deixá-la dentro do porta-luvas."

Quando clico no botão "OK"
    E clico no ícone do carro na tela de "Check-out Etapa 1/5"
    E exibe uma mensagem "Tire uma foto da Estepe do carro".
    # Erro de portugues na frase.
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 2/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 2/5".
    E exibe uma mensagem "Tire uma foto da Traseira do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 3/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 3/5".
    E exibe uma mensagem "Tire uma foto da Frente do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação
    E exibe um ícone de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão "ENVIAR"
    Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 4/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 4/5".
    E exibe uma mensagem "Tire uma foto da Lado Direito do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação em verde
    E dígito "  "  no campo "Observações:"
    Então habilita o botão "ENVIAR"
    Quando clico em "ENVIAR"
    Então sou redirecionado a próxima tela "Check-out Etapa 5/5".

Quando sou redirecionado para a próxima tela de "Check-out Etapa 5/5".
    E exibe uma mensagem "Tire uma foto da Lado Esquerdo do carro".
    E clico no "ícone de câmera"
    E abre a câmera do celular
    E tiro uma foto
    E clico no "v" de confirmação em verde
    E dígito "  "  no campo "Observações:"
        Então habilita o botão "ENVIAR"
Quando clico em "ENVIAR"
    Então habilita o botão "Fazer Check-out"

Quando clico no botão "Fazer Check-out"
    Então exibe uma janela na tela com uma mensagem: "Você ainda está dentro do carro? Se estiver dentro do carro, saia e feche a porta para podermos realizar o travamento"

Quando clico no botão "TRANCAR O CARRO"
    E exibe uma mensagem de processamento "Aguarde, estamos processando os dados"
    E exibe uma mensagem de confirmação: "Check-out realizado com sucesso!"
    E abre uma janela: "As portas do carro trancaram?"
    E clico em "NÃO"
    E é enviado um novo comando 
    E exibe uma mensagem em verde "Comando Enviado!"
    E exibe a mesma mensagem novamente "As portas do carro trancaram?"
    E clico em "SIM"
    Então exibe uma janela de "Feedback"

Quando abre a tela de "Feedback" 
    E seleciono "1" estrela no campo "Como foi sua experiência com o Pick'n'Go?"
    # colocar o preenchimento do feedback
    E seleciono "Limpo" no campo "Estado interno do carro:"
    E seleciono "Limpo" no campo "Estado externo do carro:"
    E seleciono "Sim" no campo "O carro apresenta algum odor?"
    E seleciono "Sim" no campo "O carro apresenta algum defeito?"
    E preencho com " " no campo "Outras informações"
    # coloco esse processo de preenchimento do feedback antes ou depois do botão habilitar?
    E o botão "AVALIE A SUA EXPERIÊNCIA" muda para "ENVIAR FEEDBACK"
    Então habilita o botão "ENVIAR FEEDBACK"

    Quando clico em "ENVIAR FEEDBACK"
    Então sou redirecionado para a pagina de "Reserva(s) futura(s):"

    
#-------------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------------
