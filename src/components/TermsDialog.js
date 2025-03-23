import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/material';

export default function TermsDialog(props) {

    const { open, body } = props;

    const handleClose = () => {
        body.onClose();
    };

    const language = body.language;

    //{language == 0 ? `` :  ``}<br />

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Box className="flex_row align_center">
                    <CheckCircleOutlineIcon sx={{ marginRight: '15px' }} color="success" />
                    {language == 0 ? "Termos de serviço" : "Terms of Service"}
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {language == 0 ? "Revise as regras e condições detalhadas abaixo." : "Please review the detailed rules and conditions below."}<br />
                    {language == 0 ? `
                    1. Aceitação dos Termos de Serviço
                    Toda vez que você usa ou acessa este site ou serviços, você concorda em com estes Termos de Serviço e conforme alterado de tempos em tempos, com ou sem aviso prévio. Se você estiver usando um serviço específico, ou por meio deste site, estará sujeito as regras e diretrizes aplicáveis a esses serviços  incorporados por referência a estes Termos de Serviço.
                    Cabal Liberty (https://libertygames.online/) reserva-se o direito de modificar estes Termos de Serviço a qualquer momento, sem aviso prévio.
                    ` :
                        `1. Acceptance of Terms of Service
                    Every time you use or access this website or services, you agree to these Terms of Service as amended from time to time, with or without notice. If you are using a particular service on or through this website, you are subject to the rules and guidelines applicable to those services incorporated by reference into these Terms of Service.
                    Cabal Liberty (https://libertygames.online/) reserves the right to modify these Terms of Service at any time without notice.`}
                    <br />{language == 0 ? `
                    2. Nosso serviço
                    Nossos sites e serviços disponivel a você. Você concorda que os proprietários deste site se reservam exclusivamente o direito e podem, a qualquer momento e sem aviso prévio e qualquer responsabilidade, modificar ou descontinuar este site e seus serviços, ou excluir os dados, temporária ou permanentemente. Não teremos nenhuma responsabilidade ou responsabilidade pela pontualidade, exclusão, falha no armazenamento, ou entrega inadequada de quaisquer dados ou informações. 
                    Cabal Liberty (https://libertygames.online/) reserva-se o direito de interromper o Serviço de tempos em tempos regularmente ou de outra forma com ou sem aviso prévio para realizar a manutenção.
                    Você reconhece que o Serviço pode ser interrompido por motivos fora do controle Cabal Liberty (https:/libertygames.online/), e  Cabal Liberty (https://libertygames.online/) não pode garantir que você conseguirá acessar o Atendimento sempre que desejar. Cabal Liberty (https://libertygames.online/), não será responsável por qualquer interrupção do Serviço, atraso ou falha no desempenho resultante de quaisquer causas além de seu controle razoável.
                    ` : `2. Our Service
                    Our sites and services available to you. You agree that the owners of this website exclusively reserve the right and may, at any time and without prior notice and any liability, modify or discontinue this website and its services, or delete data, temporarily or permanently. We shall have no responsibility or liability for the timeliness, deletion, failure to store, or improper delivery of any data or information..
                    Cabal Liberty (https://libertygames.online/) reserves the right to interrupt the Service from time to time on a regular basis or otherwise with or without notice to perform maintenance.
                    You acknowledge that the Service may be interrupted for reasons beyond Cabal Liberty (https://libertygames.online/) control, and Cabal Liberty (https://libertygames.online/) cannot guarantee that you will be able to access the Service whenever to wish. Cabal Liberty (https://libertygames.online/), shall not be liable for any Service interruption, delay or failure to perform resulting from any causes beyond its reasonable control.
                    `}<br />
                    {language == 0 ? `3. Suas responsabilidades e obrigações de registro
                    Para usar nossos sites e serviços, você deve se registrar primeiro.`
                        : `3. Your responsibilities and registration obligations
                    In order to use our websites and services, you must register first.`}<br />
                    {language == 0 ? `4. Conta
                    Durante o registro, você deverá selecionar um nome de usuário e uma senha específicos para a Conta. Sua senha deve ser mantida em sigilo em todos os momentos e você é o único responsável pela segurança de sua senha. Você não pode divulgar sua senha a ninguém ou permitir que sua senha seja usada. Cabal Liberty (https://libertygames.online/) não é responsável por qualquer dano que possa resultar na Conta (incluindo, sem limitação, a exclusão ou modificação de personagens na Conta) como resultado de uma senha perdida ou compartilhada. O.A Cabal Liberty (https://libertygames.online/) não é responsável no caso de a Conta ser "hackeada" ou se a Conta ou o seu computador for danificado por um vírus ou por quaisquer outros problemas com o seu computador ou a Conta . 
                    Recargas NÃO são necessárias para usar nosso Serviço.
                    Você concorda em Doar, embora a Cabal Liberty (https://libertygames.online/), a seu exclusivo e absoluto critério, possa suspender ou encerrar seu acesso ao Serviço e desabilitar ou excluir a Conta se você violar quaisquer termos de nosso Contrato .
                    Cabal Liberty (https://libertygames.online/) não reconhece a transferência de Contas. 
                    Não há reembolso por doações.`
                        : `4. Account
                    During registration, you will be asked to select a specific Account username and password. Your password must be kept confidential at all times and you are solely responsible for the security of your password. You may not disclose your password to anyone or allow your password to be used. Cabal Liberty (https://libertygames.online/) is not responsible for any damage that may result to the Account (including, without limitation, the deletion or modification of characters in the Account) as a result of a lost or shared password. O.A Cabal Liberty (https://libertygames.online/) is not responsible in the event that the Account is "hacked" or if the Account or your computer is damaged by a virus or any other problems with your computer or the Account .
                    Donations are NOT required to use our Service.
                    You agree to Donate, although Cabal Liberty (https://libertygames.online/), in its sole and absolute discretion, may suspend or terminate your access to the Service and disable or delete your Account if you violate any terms of our Agreement.
                    Cabal Liberty (https://libertygames.online/) does not recognize the transfer of Accounts.
                    There are no refunds for donations.`}<br />
                    {language == 0 ? `5. Sua Conduta
                    Não seremos responsáveis de forma alguma pelo Conteúdo que aparece neste site nem por qualquer erro ou omissão. Você concorda, ao usar este site ou qualquer serviço fornecido, que não deve:
                    Fornecer qualquer Conteúdo ou realizar qualquer conduta que possa ser ameaçadora, prejudicial, abusiva, assediante, perseguidora, tortuosa, difamatória, caluniosa, vulgar, obscena, ofensiva, censurável, pornográfica, projetada para interferir ou interromper este site ou qualquer serviço prestado , infectado com um vírus ou outra rotina de programação destrutiva ou deletéria, dê origem a responsabilidade civil ou criminal, ou que possa violar uma lei local, nacional ou internacional aplicável;
                    Personificar ou deturpar sua associação com qualquer pessoa ou entidade, ou falsificar ou tentar ocultar ou deturpar a origem de qualquer Conteúdo fornecido por você;
                    Colete ou colete quaisquer dados sobre outros usuários;
                    Fornecer ou usar este site e qualquer conteúdo ou serviço de qualquer maneira comercial ou de qualquer maneira que envolva lixo eletrônico, spam, correntes, esquemas de pirâmide ou qualquer outra forma de publicidade não autorizada sem nosso consentimento prévio por escrito.
                    Em particular, você não pode usar nenhum nome:
                    Pertencer a outra pessoa com a intenção de se passar por essa pessoa, incluindo, sem limitação, alguem da  Cabal Liberty (https://libertygames.online/)
                    Pertencer a qualquer figura religiosa ou divindade;
                    Sujeito aos direitos de qualquer outra pessoa ou entidade sem autorização por escrito dessa pessoa ou entidade;
                    Isso pertence a uma figura da cultura popular, celebridade ou personalidade da mídia;
                    Ou seja, contém ou é substancialmente semelhante a uma marca comercial ou marca de jogo, registrada ou não;
                    Relacionado a drogas, sexo, álcool ou atividade criminosa;
                    Que incorpore 'palavrões' ou que sejam ofensivos, difamatórios, vulgares, obscenos, odiosos ou censuráveis racial, etnicamente ou de outra forma;
                    Composto por sentença parcial ou completa;
                    Composto por rabiscos.
                    Cabal Liberty (https://libertygames.online/) pode, a seu exclusivo e absoluto critério, tomar qualquer ação que considere necessária para preservar a integridade dos Serviços. A violação de qualquer um dos termos e condições estabelecidos acima pode resultar em ações tomadas pela  Cabal Liberty (https://libertygames.online/) com efeito imediato ou em um momento determinado pela  Cabal Liberty (https://libertygames.online/), que pode incluir, sem limitação: suspender temporariamente seu acesso ao nosso Serviço ou encerrar permanentemente seu acesso ao nosso Serviço.  Cabal Liberty (https://libertygames.online/) retém o direito de recusar os Serviços a qualquer usuário que viole o Contrato.` :
                        `5. Your Conduct
                    We will not be responsible in any way for the Content that appears on this website or for any errors or omissions. You agree, when using this website or any service provided, that you must not:
                    Providing any Content or engaging in any conduct that may be threatening, harmful, abusive, harassing, stalking, tortuous, defamatory, libelous, vulgar, obscene, offensive, objectionable, pornographic, designed to interfere with or disrupt this website or any service provided, infected with a virus or other programming routine that is destructive or deleterious, gives rise to civil or criminal liability, or that may violate applicable local, national or international law;
                    Impersonate or misrepresent your association with any person or entity, or falsify or attempt to conceal or misrepresent the origin of any Content provided by you;
                    Collect or collect any data about other users;
                    Providing or using this website and any content or service in any commercial manner or in any manner involving junk email, spam, chain letters, pyramid schemes or any other form of unauthorized advertising without our prior written consent.
                    In particular, you cannot use any names:
                    Belonging to another person with intent to impersonate that person, including, without limitation, someone from Cabal Liberty (https://libertygames.online/)
                    Belonging to any religious figure or deity;
                    Subject to the rights of any other person or entity without written authorization from that person or entity;
                    This belongs to a popular culture figure, celebrity, or media personality;
                    That is, contains or is substantially similar to a trademark or game mark, whether registered or unregistered;
                    Related to drugs, sex, alcohol or criminal activity;
                    Incorporates 'profanity' or is offensive, defamatory, vulgar, obscene, hateful or racially, ethnically or otherwise objectionable;
                    Consists of partial or complete sentence;
                    Composed of scribbles.
                      Cabal Liberty (https://libertygames.online/) may, in its sole and absolute discretion, take any action it deems necessary to preserve the integrity of the Services. Violation of any of the terms and conditions set forth above may result in action taken by Cabal Liberty (https://libertygames.online/) with immediate effect or at a time determined by Cabal Liberty (https://libertygames.online/) , which may include, without limitation: temporarily suspending your access to our Service or permanently terminating your access to our Service. Cabal Liberty (https://libertygames.online/) retains the right to refuse Services to any user who violates the Agreement.`}<br />
                    {language == 0 ? `6. Envio de conteúdo neste site
Ao fornecer qualquer Conteúdo para o nosso site:
Você concorda em nos conceder um direito e licença mundial, livre de royalties, perpétuo e não exclusivo (incluindo quaisquer direitos morais ou outros direitos necessários) para usar, exibir, reproduzir, modificar, adaptar, publicar, distribuir, executar, promover, arquivar, traduzir e criar trabalhos derivados e compilações, no todo ou em parte. Tal licença se aplicará a qualquer forma, mídia, tecnologia conhecida ou desenvolvida posteriormente;
Você garante e declara que possui todos os direitos legais, morais e outros que possam ser necessários para nos conceder a licença estabelecida neste segmento;
Você reconhece e concorda que teremos o direito (mas não a obrigação), a nosso exclusivo critério, de recusar a publicação ou remover ou bloquear o acesso a qualquer Conteúdo que você fornecer a qualquer momento e por qualquer motivo, com ou sem aviso prévio.`
                        : `6. Submitting content on this site
                        By providing any Content to our website:
                        You agree to grant us a worldwide, royalty-free, perpetual, non-exclusive right and license (including any moral or other necessary rights) to use, display, reproduce, modify, adapt, publish, distribute, perform, promote, archive, translate and create derivative works and compilations, in whole or in part. Such license will apply to any form, media, technology known or later developed;
                        You warrant and represent that you have all legal, moral and other rights that may be necessary to grant us the license set forth in this segment;
                        You acknowledge and agree that we will have the right (but not the obligation), in our sole discretion, to refuse to post or remove or block access to any Content you provide at any time and for any reason, with or without notice.`}<br />

                    {language == 0 ? `7. Serviços terceirizados
Bens e serviços de terceiros podem ser anunciados , disponibilizados neste site ou por meio dele. Não seremos responsáveis ou responsáveis de qualquer maneira por qualquer uma de suas transações ou interação com terceiros.` :
                        `7. Third party services
                      Third party goods and services may be advertised, made available on or through this website. We will not be responsible or liable in any way for any of your transactions or interactions with third parties.`}<br />
                    {language == 0 ? `8. Indenização
Você concorda em indenizar e isentar-nos, partes relacionadas, diretores, funcionários, agentes, contratados independentes, anunciantes, parceiros de qualquer reclamação ou demanda, incluindo honorários advocatícios razoáveis, que podem ser feito por terceiros, devido ou decorrente de sua conduta ou conexão com este site ou serviço, seu fornecimento de Conteúdo, sua violação destes Termos de Serviço ou qualquer outra violação dos direitos de outra pessoa ou parte.` :
                        ``}<br />
                    {language == 0 ? `8. Indemnity
You agree to indemnify and hold us, related parties, directors, employees, agents, independent contractors, advertisers, partners harmless from any claim or demand, including reasonable attorneys' fees, that may be made by any third party, due to or arising out of your conduct or connection with this website or service, your provision of Content, your violation of these Terms of Service or any other violation of the rights of another person or party.` :
                        ``}<br />
                    {language == 0 ? `9. ISENÇÃO DE GARANTIAS
VOCÊ ENTENDE E CONCORDA QUE SEU USO DESTE WEBSITE E QUAISQUER SERVIÇOS OU CONTEÚDO FORNECIDOS (O SERVIÇO) É DISPONIBILIZADO E FORNECIDO A VOCÊ POR SUA CONTA E RISCO. NÃO DAMOS NENHUMA GARANTIA, IMPLÍCITA OU EXPRESSA, DE QUE QUALQUER PARTE DO SERVIÇO SERÁ ININTERRUPTO, SEM ERROS, SEM VÍRUS, OPORTUNO, SEGURO, PRECISO, CONFIÁVEL, DE QUALQUER QUALIDADE, NEM QUE QUALQUER CONTEÚDO É SEGURO DE QUALQUER FORMA PARA DOWNLOAD . Algumas jurisdições podem não permitir isenções de garantias implícitas e a isenção de responsabilidade acima, pode não se aplicar a você apenas no que se refere a garantias implícitas.` :
                        ``}<br />
                    {language == 0 ? `9. DISCLAIMER OF WARRANTIES
YOU UNDERSTAND AND AGREE THAT YOUR USE OF THIS WEBSITE AND ANY SERVICES OR CONTENT PROVIDED (THE SERVICE) IS MADE AVAILABLE AND PROVIDED TO YOU AT YOUR SOLE RISK. WE MAKE NO WARRANTY, IMPLIED OR EXPRESS, THAT ANY PORTION OF THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, VIRUS-FREE, TIMELY, SECURE, ACCURATE, RELIABLE, OF ANY QUALITY, NOR THAT ANY CONTENT IS SAFE IN ANY WAY TO DOWNLOAD. Some jurisdictions may not allow disclaimers of implied warranties, and the above disclaimer may not apply to you only with respect to implied warranties.` :
                        ``}<br />
                    {language == 0 ? `10. LIMITAÇÃO DE RESPONSABILIDADE
VOCÊ ENTENDE E CONCORDA EXPRESSAMENTE QUE NÃO SEREMOS RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, ESPECIAIS, INCIDENTAIS, CONSEQUENCIAIS OU EXEMPLARES, INCLUINDO, SEM LIMITAÇÃO, DANOS POR PERDA DE LUCROS, FUNDO DE COMÉRCIO, USO, DADOS OU OUTRAS PERDAS INTANGÍVEIS (MESMO SE FOMOS AVISADOS DA POSSIBILIDADE DE TAIS DANOS), RESULTANTES OU DECORRENTES DE:
O USO OU A INCAPACIDADE DE USAR O SERVIÇO;
O CUSTO PARA OBTER BENS E/OU SERVIÇOS DE SUBSTITUIÇÃO RESULTANTE DE QUALQUER TRANSAÇÃO REALIZADA ATRAVÉS DO SERVIÇO;
ACESSO NÃO AUTORIZADO OU ALTERAÇÃO DE SUAS TRANSMISSÕES DE DADOS;
QUALQUER OUTRO ASSUNTO RELACIONADO AO SERVIÇO.
Lembre-se de que não somos responsáveis por quaisquer mensagens postadas. Não garantimos nem garantimos a precisão, integridade ou utilidade de qualquer mensagem e não somos responsáveis pelo conteúdo de qualquer mensagem.` : `10. LIMITATION OF LIABILITY
YOU EXPRESSLY UNDERSTAND AND AGREE THAT WE WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOST PROFITS, GOODWILL, USAGE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF WE ARE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, ARISING OUT OF OR ARISING OUT OF:
THE USE OF OR INABILITY TO USE THE SERVICE;
THE COST OF OBTAINING REPLACEMENT GOODS AND/OR SERVICES RESULTING FROM ANY TRANSACTION ENTERED INTO THROUGH THE SERVICE;
UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA TRANSMISSIONS;
ANY OTHER MATTER RELATED TO THE SERVICE.
Please remember that we are not responsible for any messages posted. We do not warrant or guarantee the accuracy, completeness or usefulness of any message and are not responsible for the content of any message.`}<br />


                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>

    );
}