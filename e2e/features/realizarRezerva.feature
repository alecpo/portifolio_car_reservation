#encoding: utf-8
#language: pt

Funcionalidade: Fazer a reserva de um veículo

O usuário poderá dentro da plataforma UseCar GO, realizar a reserva de um veículo no período 
(horário) e na data desejada.

Como usuário cadastrado
Eu quero realizar uma reserva
Para usufruir do serviço de carro compartilhado UseCar GO

Background: 
    Dado que esteja logado no sistema com a conta
    | E-mail                |   Senha    |
    | adm@novalima.com.br   |   dev      |

    Quando acesso a tela de "Solicitar Reserva"

#-------------------------------------------------------------------------------------------------------
# Casos de ERRO
#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: seleciona uma data para o check-in maior que a data do check-out
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "7" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "30"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

   Quando clico em "Próxima etapa" na tela "Solicitar Reserva"
        Então exibe uma mensagem em vermelho: "Data de início não pode ser menor que a data de fim!"
      

#Comentário
#Esta escrito errado a mensagem no ambiente de homologação
#"Data de início não pode ser menor que a data de fim!" - ERRADO
#"Data de início deve ser menor que a data fim!" - CERTO

#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: seleciona a mesma data para o check-in e check-out, e coloca o horário para o check-in maior que o horário para o check-out
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "10"
     E selecono os minutos "30"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

   Quando clico em "Próxima etapa" na tela "Solicitar Reserva"
        Então exibe uma mensagem em vermelho: "Data de início não pode ser menor que a data de fim!"

#Comentário
#A mensagem deve ser: "O horário do check-in deve ser menor que a do check-out"

#-------------------------------------------------------------------------------------------------------

#Cenário: ANALISADO
#Comentário - Cenário não existente na aplicação, ou seja, o sistema autoriza tal configuração

Cenario: seleciona a mesma data para o check-in e check-out, mas seleciona o horário para o check-in próximo ao horário de check-out
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

   Quando clico em "Próxima etapa" na tela "Solicitar Reserva"
        Então exibe uma mensagem em vermelho: "O horário do check-in e check-out estão muito próximos. O mesmo deve ser de no mínimo 30 minutos."

#Comentário - Cenário não existente na aplicação, ou seja, o sistema autoriza tal configuração

#-------------------------------------------------------------------------------------------------------
 
#Cenário: OK

Cenario: não existe nenhum carro disponível para realizar a reserva
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Solicitar Reserva"
    E abre uma nova janela
        Então apresenta uma mensagem: "Nenhum veículo disponível para o horario selecionado"


#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: não adiciona nenhum cupom de desconto
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E não adiciono nenhum cupom de desconto valido no campo "Digite o cupom"
        Então não habilita o botão "Fazer Reserva"

#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: adiciona um cupom invalido
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E adiciono um cupom de desconto no campo "Digite o cupom"
    E clico no botão "verde" para adicionar cupom
        Então exibe uma mensagem de erro: "Cupom inválido."

#-------------------------------------------------------------------------------------------------------

#Cenário: OK 

Cenario: não possuí cartão de crédito cadastrado
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E clico em "Cartão de Crédito" 
    E exibe uma mensagem "Nenhum cartão cadastrado"
        Então não habilita o botão "Fazer Reserva"

#-------------------------------------------------------------------------------------------------------

#Cenário: OK 

Cenario: cartão de credito invalido 
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E clico no botão "azul" ao lado do campo "Cartão de Crédito"
        Então exibe uma tela "Novo Cartão."

Quando abre a tela "Novo Cartão"
    E digito "55028874761764991" no campo "Número do cartão"
    E digito "Rodrigo C Nogueira" no campo "Nome (Como escrito no cartão)" 
    E digito "02" no campo "Validade (Mês)"
    E digito "27" no campo "Validade (Ano)" 
    E digito "123" no campo "CVV"
    E seleciono "Mastercard" no campo "Selecionar a bandeira do cartão"  
    E digito "55028874761764991" no campo "CEP"
    E digito "Castro Maia" no campo "Rua" 
    E digito "123" no campo "Número"
    E digito "Santa Lúcia" no campo "Bairro" 
    E digito "Belo Horizonte" no campo "Cidade"
    E seleciono "MG" no campo "UF"  
    E clico em "ADICIONAR CARTÃO"
        Então exibe uma mensagem de erro: "Falha ao cadastrar cartão, verifique os dados e tente novamente."

#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: adiciona o cupom, mas não aceita o termo 
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E digito "BEMVINDOGO" no campo "Digite o cupom"
    E clico no botão "verde"
    E exibe uma mesagem:"Cupom Válido"
    #analisar mensagem que apresenta 
        Então então habilita o botão "Fazer Reserva"

Quando aperto em "Fazer Reserva"
    E abre uma janela "Termos de Uso"
    E não marco o check-box "Eu li e concordo com os termos de uso."
    E clico em "FAZER RESERVA"
        Então exibe uma mensagem em vermelho "É necessário aceitar os termos de uso para a utilização do veículo. "

#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: seleciono o cartão, mas não aceita o termo 
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E seleciono cartão no campo "Cartão de Crédito"
    #analisar se coloco a informação do cartão
        Então então habilita o botão "Fazer Reserva"

Quando aperto em "Fazer Reserva"
    E abre uma janela "Termos de Uso"
    E não marco o check-box "Eu li e concordo com os termos de uso."
    E clico em "FAZER RESERVA"
        Então exibe uma mensagem em vermelho "É necessário aceitar os termos de uso para a utilização do veículo."

#-------------------------------------------------------------------------------------------------------

#Cenário: Dúvida se esse cenário entra dentro do fluxo
#Cenário: FAZENDO

Cenario: adiciona o cupom e realiza a reserva, mas logo após cacela 
     E clico no campo "Data e hora do check-in"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "14"
     E selecono os minutos "30"
     E clico em "Ok"
     E clico no campo "Data e hora do check-out"
     E abre uma janela 
     E seleciono a data/dia "8" que desejo realizar a reserva
     E clico em "Ok"
     E sou direcionado para uma outra janela
     E seleciono a hora "20"
     E selecono os minutos "40"
     E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E adiciono o cupom "BEMVINDOGO" no campo "Digite o cupom"
    E clico no botão "verde"
    E é feito a validação do cupom
    E exibe uma mensagem "Cumpom Válido"
        Então habilita o botão "Fazer Reserva"

Quando aperto em "Fazer Reserva" na tela "Detalhe da Reserva"
    E exibe o "Termo de Uso"
    E marco o check-box "Eu li e concordo com os termos de uso"
    E aperto em "FAZER RESERVA" 
        Então exibe uma telinha com uma mensagem: "Reserva realizada com Sucesso!"

Quando clico em "CENCELAR RESERVA" na tela de "Reserva(s) futura(s)"
    E exibe uma tela "Tem certeza que deseja cancelar a reserva?"
    E escreve "Teste" no campo "Motivo do cancelamento"
    E habilita o botão "SIM"
    E clico no botão "SIM"
        Então exibe uma mensagem: "Reserva cancelada com sucesso"



#Dúvida se coloco o processo quando clico em sair no temo de uso. Analisar.
#Colocar quando se cancela a reserva. Analisar.

#-------------------------------------------------------------------------------------------------------
# Casos de SUCESSO
#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: preenchimento de todos os campos, adiciona o cupom e confirma o Termo de Uso.
    E clico no campo "Data e hora do check-in"
    E abre uma janela 
    E seleciono a data/dia "8" que desejo realizar a reserva
    E clico em "Ok"
    E sou direcionado para uma outra janela
    E seleciono a hora "14"
    E selecono os minutos "30"
    E clico em "Ok"
    E clico no campo "Data e hora do check-out"
    E abre uma janela 
    E seleciono a data/dia "8" que desejo realizar a reserva
    E clico em "Ok"
    E sou direcionado para uma outra janela
    E seleciono a hora "20"
    E selecono os minutos "40"
    E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E adiciono o cupom "BEMVINDOGO" no campo "Digite o cupom"
    E clico no botão "verde"
    E é feito a validação do cupom
    E exibe uma mensagem "Cumpom Válido"
        Então habilita o botão "Fazer Reserva"

Quando aperto em "Fazer Reserva" na tela "Detalhe da Reserva"
    E exibe o "Termo de Uso"
    E marco o check-box "Eu li e concordo com os termos de uso"
    E aperto em "FAZER RESERVA" 
        Então exibe uma telinha com uma mensagem: "Reserva realizada com Sucesso!"


#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: preenchimento de todos os campos, cadastro um novo cartão e confirma o Termo de Uso.
    E clico no campo "Data e hora do check-in"
    E abre uma janela 
    E seleciono a data/dia "8" que desejo realizar a reserva
    E clico em "Ok"
    E sou direcionado para uma outra janela
    E seleciono a hora "14"
    E selecono os minutos "30"
    E clico em "Ok"
    E clico no campo "Data e hora do check-out"
    E abre uma janela 
    E seleciono a data/dia "8" que desejo realizar a reserva
    E clico em "Ok"
    E sou direcionado para uma outra janela
    E seleciono a hora "20"
    E selecono os minutos "40"
    E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E clico no botão "azul" ao lado do campo "Cartão de Crédito"
        Então exibe uma tela "Novo Cartão."

Quando abre a tela "Novo Cartão"
    E digito "55028874761764991" no campo "Número do cartão"
    E digito "Rodrigo C Nogueira" no campo "Nome (Como escrito no cartão)" 
    E digito "02" no campo "Validade (Mês)"
    E digito "27" no campo "Validade (Ano)" 
    E digito "123" no campo "CVV"
    E seleciono "Mastercard" no campo "Selecionar a bandeira do cartão"  
    E digito "55028874761764991" no campo "CEP"
    E digito "Castro Maia" no campo "Rua" 
    E digito "123" no campo "Número"
    E digito "Santa Lúcia" no campo "Bairro" 
    E digito "Belo Horizonte" no campo "Cidade"
    E seleciono "MG" no campo "UF"  
    E clico em "ADICIONAR CARTÃO"
    E exibe uma mensagem: "Cartão Cadastrado com Sucesso!"
    #Verificar a mesagem que aparece certinho.
        Então habilita o botão "Fazer Reserva"

Quando aperto em "Fazer Reserva" na tela "Detalhe da Reserva"
    E exibe o "Termo de Uso"
    E marco o check-box "Eu li e concordo com os termos de uso"
    E aperto em "FAZER RESERVA" 
        Então exibe uma telinha com uma mensagem: "Reserva realizada com Sucesso!"


#-------------------------------------------------------------------------------------------------------

#Cenário: OK

Cenario: preenchimento de todos os campos, seleciona o cartão e confirma o Termo de Uso.
    E clico no campo "Data e hora do check-in"
    E abre uma janela 
    E seleciono a data/dia "8" que desejo realizar a reserva
    E clico em "Ok"
    E sou direcionado para uma outra janela
    E seleciono a hora "14"
    E selecono os minutos "30"
    E clico em "Ok"
    E clico no campo "Data e hora do check-out"
    E abre uma janela 
    E seleciono a data/dia "8" que desejo realizar a reserva
    E clico em "Ok"
    E sou direcionado para uma outra janela
    E seleciono a hora "20"
    E selecono os minutos "40"
    E clico em "Ok"
        Então habilita o botão "Próxima etapa"

Quando clico em "Próxima etapa" na tela "Escolha um carro"
    E abre uma nova janela
    E aparece o veículo na tela "Escolha um carro"
    E seleciono o carro "VW-Virtus"
        Então habilita o botão "Próxima etapa"

Quando aperto em "Próxima etapa" na tela "Detalhe da Reserva"
    E abre uma nova janela
    E seleciono o cartão
    E clico no botão "azul"
    E é feito a conferência do cartão
    E exibe uma mensagem "Cartão Cadastrado!"
        Então habilita o botão "Fazer Reserva"

Quando aperto em "Fazer Reserva" na tela "Detalhe da Reserva"
    E exibe o "Termo de Uso"
    E marco o check-box "Eu li e concordo com os termos de uso"
    E aperto em "FAZER RESERVA" 
        Então exibe uma telinha com uma mensagem: "Reserva realizada com Sucesso!" 


#-------------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------------