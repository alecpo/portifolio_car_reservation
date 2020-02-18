# Windows

## Troubleshootings

### Problemas ao rodar projeto pela primeira vez

É possível que após clonar o repositório do projeto e tentar rodar os comandos:

    yarn
    npx react-native run-android

você se depare com um problema comum de permissão de pastas.

#### Solução

1.  Nas propriedades da pasta do projeto, vá na aba "Segurança", e em seguida
    clique em "Editar";
2.  Na nova janela que irá se abrir, clique em "Adicionar";
3.  Digite o nome do seu usuário no campo de texto e clique em "Verificar
    nomes".
4.  Seu usuário será reconhecido no campo de texto, em seguida clique em:
    OK->Aplicar->OK->OK.

Após isso, se ainda se deparar com outro problema ao tentar executar o comando

    npx react-native run-android

tente executar sem o "npx".

Tente:

    react-native run-android

Com isso, você deve conseguir rodar o projeto.

### Problemas ao rodar os testes funcionais

#### Build do Detox

Ao tentar executar o comando:

    detox build -c android.emu.debug

você pode encontrar problemas relacionados à ausência do Detox:

![bash: detox not found](./src/assets/img/readme/detox_not_found.jpg)

#### Solução

Execute os comandos presentes no "package.json" para o build do detox em modo
debug separadamente:

1.          cd android/
2.          ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug
3.          cd ..

Isso deve garantir a correta execção do build do Detox.

#### Erro ao executar yarn test

Ao tentar executar o teste em si, rodando o comando:

    yarn test

você pode encontrar um erro no console referente a ausência do
arquivo/diretório: "device.registry.state.lock"

#### Solução

Crie o diretório Detox.

Na pasta do seu usuário, certifique-se de criar toda a hierarquia de de pastas
para o diretório Detox, que será utilizado pelo comando "yarn test" para criar o
arquivo: android-device.registry.state.lock

Exemplo da hierarquia de pastas:

C:/Users/PASTA_DO_SEU_USUARIO_AQUI/AppData/Local/data/Detox/

Após isso, será possível executar o comando novamente, desta vez, com sucesso.

Execute:

    yarn test
