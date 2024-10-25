import { Application } from "./application";
import { User } from "./user";

export class Incident {
    id!: number;
    title!: string;
    description!: string;
    status!: string;
    severity!: string;
    reportedAt!: Date ;
    resolvedAt!: Date;
    reportedBy!: User;
    resolvedBy!: User;
    solutionDescription!: string;
    application!: Application;
}
