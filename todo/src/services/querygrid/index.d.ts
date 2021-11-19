import { Project } from './interface/interface';
import { Auth } from './services/auth';
import { Service } from './services/service';
interface QueryGrid {
    auth: Auth;
    service: Service;
}
declare const QueryGrid: (project: Project) => QueryGrid;
export default QueryGrid;
