import { producer } from "server/RootProducer";

export = (plr: Player) => producer.getState().Moveset[plr.Name];
