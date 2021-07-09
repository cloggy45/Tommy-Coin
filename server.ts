import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { TransactionService } from "./src/service/transactionService";
import { DefaultChain } from "./src/chain/defaultChain";
import { MiningService } from "./src/service/miningService";
import { BlockFactory } from "./src/block/blockFactory";
import { NodeService } from "./src/service/nodeService";
import { WalletService } from "./src/service/walletService";

const app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

const walletService = new WalletService(new Map<string, number>());
const transactionService = new TransactionService(walletService);
const blockFactory = new BlockFactory(transactionService);
const nodeService = new NodeService();
const tommyCoin = new DefaultChain(nodeService);

require("./src/route/wallet")(app, walletService);
require("./src/route/transaction")(app, transactionService);
require("./src/route/chain")(app, tommyCoin);
require("./src/route/mine")(
  app,
  tommyCoin,
  transactionService,
  blockFactory,
  walletService
);
require("./src/route/node")(app, nodeService);

(function generateGenesisBlock() {
  console.log("Creating genesis block.....");

  const proof = new MiningService(Date.now(), []).mine();
  const genesisBlock = blockFactory.createGenesisBlock(proof);

  console.log("Genesis block created!");
  tommyCoin.add(genesisBlock);
})();

const server = app.listen(0, () => {
  let address = server.address();
  console.log(image);
  console.log(`Tommy node started`);
  console.log(address);
});

const image = `MWWWWWWMMMWWMMMMMMMMWKl.                             .....     ..:oOXWMMMWWMWWWWWWWWWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMMMMMMMWO;.                     ..,;;;;;;;;::::;;,'.....':lxOXWWWMMMMWWWWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMMMMMMNd'.                     .co:;clll:;clodoloxlcc:;'.  ..,lkNWMMWWWWWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMMMMMXo.                      .lkccOkolld0Kol0N0KXo,lkxo:,.    .:kNMWWWWWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMMMMNo.                      .:kl.cOOxxddxkOkxxOXXkoOXOkkxo'     .lXWWWWWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMMMWd.                      .,xd:loooxOKKddX0xxxx0KxkKOk0kk:.     .lXWWWWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMMWk'                       'dd;dXklcxXXOxKXxkKklkX00N0O0kOl.      .lXMMWWWWWWWWWWWWWWWW
MMMMMMMMMMMMMWO,                       .ox:;lkkxxxddclkkooxkkkxokkx0KOOd.       .lXMMWWWWWWWWWWWWWWW
MMMMMMMMMMMMW0;                       .l0ocdxxddkkkxxxkkkkkxxdoooooxkdOd.        .lXMWWWWWWWWWWWWWWW
MMMMMMMMMMMW0;                        .;olcc::;;;::::::::::ccccloooxkk0d.         .oNWMWWWWWWWWWWWWW
MMMMMMMMMMM0;                            .                    .....,:cl,.          .xWMMWWWWWWWWWWWW
MMMMMMMMMMXc.                                                                       ,OWMMWWWWWWWWWWW
MMMMMMMMMWx.                                                                        .oNMWWWWWWWWWWWW
MMMMMMMMWO,      ...............................................                     :KMWWWWWWWWWWWW
MMMMMMWKo,........'''''''''''''''''''',,,,,,,,,,,,,,,,;,,,,,,,''''........           'OWWWWWWWWWWWWW
MMMMMWx' ...''''''''''',,,,,,,,,,,,,,;;;;;;;;;;;;;;,,,,,,,,,,,,,,,,,,,,,''......     ,0WWWWWWWWWWWWW
MMMMM0,     .........''''',',,,,,,,,,,,,,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,,,,'.....:KMMWWWWWWWWWWW
MMMMMk.           ...........''''''....''''''''''''''',,,,,,,,,,,,,;;;;;;;;;;;;;,,,,';ok0XNWWWWWWWWW
MMMMW0'           ........''''''''...''''''',,,,,,,,,,,,,,,''''.....''''''',,,,,;;;;;;;;:cldkOKNWWWW
MMWWNk'        ..........''...........'''''',,,,,,,,,,,,,,,'''''''''''................'',,,;;:cldk0K
WWWXk;        ....'....'''.............'',,,,,,,,,,,,,,,,,,,''''',,,,,'''.......      ........',,;;c
WWNd.        ..'''''...........    .....'',,,;;,,,,,,,,,,,,,,,,,;;;;;;,,'........   .:xkxdolc:;;;::c
WNk'         .''''''...........    ......'',;;;;;;;;;;;;;;;;;;;:;;;;,'...........   ;KMMMMWWWNNNXXXX
NO:..       ..'''''........',;;;::;,,,''',;:clooooooooollllllcc:;;,,'.............  ;0MMMWWWWWWWWWWW
NKx;'..     .',,,,''.',;:coodxxxkkkxxdolc:ccodxkkOOOOOOOkkkkxdoc:;,''''',;;;::;'..  ;0MMMWWWWWWWWWWW
NXOc,;,.    .,;::;,,;:clodddoooooddxxkkkdollldxkkOOOO00OOOOkkxdlccllooddddoooolc;...cXMMMWWWWWWWWWWW
NKxl;,'.   ..;:cc;;:ccllolc:::;,;;;:clodxdolclodxkkOOOOOOOkkxddodxkkkxxxdoooodddl'.,OWMWWWWWWWWWWWWW
0koll;..   .';ccc::lollcc;,'''....',:c:clodolcclodxkkO0OOkxxddxxxxoc:;;;:ccllodxo'.xNMWWMWWWWWWWWWWW
kl:coc;..  .';:ccclodol:,..,:cc:cloooollllodollcloodkO0OOkxxxxdllc:,''',;,',:ldxd;;0WMWWWWWWWWWWWWWW
o:';loc,.  .':cclloodxoc::cloddxxxkxxxdddddxxoooccloxO00OkxkOkdooooodddddoc;,:dkx:;0WWMMWWWWWWWWWWWW
:'.'lxd:'...,:cllodddxddooooddxxxkkkkxxxxxxxxddoccloxOOOOkxkOOkxxxxxxkkkkkxdddkOx:;OWWWMMMMWWWWWWWWW
'...oOko:'..';cloddddddxxxxddxxxkkkkkkkkxxxxddolclooxkkkkkxkOOOOkkkkkkkkkkkkOOOOxcc0WWWMMMMMMWWWWWWW
....lxxdc,'.';cloddxxxxxxxxkkOOOOOOOOkkkkxxxddollloodxkkkkxkOO0000OOOOOOOOOOOOkkkdkXWWWWMMMMMMWWWWWW
....cdddo:''',:lodxxxxxxxkkOOO000OOOOOOkkkxxdolllllodxkkkkxxOO0000000000000000OOOkKNWWWWMMMMMMWWWWWW
'...:odxko;'',;lodxxxxxxkkkOOO000OOOOOOOOOkxdolccllodxkkkxxxkOO000000000000000O0OOKWWWWMMMMMMMMWWWWW
.. .;dxkko,''';codxxxxxxxxkkOOOOOOOOO00OOOkxolcccclldxkOkkxxxkO00000000000000000OOXWWWWWMMMMMMMMWWWW
'.  .cdxxl,''',:loddxxxxxxkkOOOOOOOOOOOOOkxolc:::clldxkOOkkxxkOOOOOOOO00000000OOOOXWWWWWWWWWMMMMMWWW
'.   .,:l:''''';:loddxxxxxkkkkkOOOOOOOOkkxdl:;;::clldxkOOOkxxxkOOOOOOOOOO0000OOOkOXWWWWWWWWMMMMMMMMW
'.      . ..'..,;clodddxxxkkkkkkkkkkkkkkxdlc::::cllodxkOOOkxdxkkOOOOOOOOOO00OOOkxOKXNNWWWWWWMMMMMMMM
'.         .''.',:clodddxxxxxxkkkkxxxxkkkdc::ccccllodxk0K0OkxxxOOOOOOkkOOOOOOOOd;.',;:cloodxk0XNWWMM
'.         ....',;cloodddxxxxxxxxxdxxxxxxdl:::,,,;:loxOO00OkxdxO0OOkkxxxxxkkkkxc.           ...,:cod
..          ....',:clloddddddddoooodoollllllcc:,''',:odxxxxxxxxkkxxxxdxxxddxkko'                   .
            ....',;cclodddddoc::;;;;;;,,,,,;;:ccccc::cllodddolc::::::::coooxxxo:.                   
             ....',:::coddddl;............''',;:clooodoooolc;,'''',''''',ldxdoxkxc.                 
             .....';:::codddl,...............',,,;;;clc::;;;,'..''',,;::ldxdoldkO0kc.               
             ..'...,;:;:coddoc:cc;,'..'..'''..''',,,,;;;,,,,,'',,;:lodxkkxdooodxkOxxx,              
              .','..';;;;codxxddolcc;,,',,;:;;;;;;;;:cccc:;;:::clodxxxkkxdolloxO0Odxx'              
               .,,'..',;,;codddddolccc:;;:::ccccccccccllloollllloxxxxxxxddoclddkO0Ox,.              
                .,,,''',;,;:loooooolc:::::ccccccccc:;,;:lolllloodxxxddddxdccoddkOK0:                
                 .',,,,,;;,,;cllooollc::::ccllllllllc:clloooooddxdddddxxxl;coxkO0XXo.               
                 ..',,,,,;;;,,:ccllllllc:;::clodxxxxdddddddoodxdoooodxxdl::oxkOO0XWk'             ..
                 ,c,',,;;;::;'',;::ccclllccc::cllllollooooodxkxdllldxddxxoodkO00KXNx.     ..     ...
                .;kkl;,,;;;::;'',;;:::cloddoollllcccllloodxkxxdolcloodk0OxxO000KKXKl.     ..    ....
                .c0XKkl;,,;;;;,'',;;::cclloddxdddoooodddxxkxxdooccooox000xkXXKKXKKd.           .....
                .oKXNNKkc,,,;;;,'',;;:cccloddddxxxxxdxxxxxxddool:cccxKXXKkOXXXNXXKl.   ....  .......
                'xKNNNNXkc:;,,,,,'',;::::cloddxxxxxxxxxxxxxdool:;;lxKNNNXOOKXNNXX0c.       .........
                'xKXNNNX0xool:;,,''',;;::cloddddddddddddxxddolc:;oOKXNNWXOOKXXXXOl..  ...     .. ...
                'xKKXNNNXOxxxxdlc;,'''',;:cclooddoooooooooollolcoOKXNNWWKOOKXXXO:.         .........
                'xKKXXNNX0xxxkkkxdl:,'.',;;::llolllllllclcloxxlckKXNNWWNKO0KKKKo.           ....  ..`;
